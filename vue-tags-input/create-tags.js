// helper functions

const validateUserRules = (tag, validation) => {
  return validation.filter(val => {
    const { text } = tag;
    // if the rule is a string, we convert it to RegExp
    if (typeof val.rule === 'string') return !new RegExp(val.rule).test(text);

    if (val.rule instanceof RegExp) return !val.rule.test(text);

    // if we deal with a function, invoke it
    const isFunction = {}.toString.call(val.rule) === '[object Function]';
    if (isFunction) return val.rule(tag);

  }).map(val => val.classes);
};

const clone = node => JSON.parse(JSON.stringify(node));

const findIndex = (arr, callback) => {
  let index = 0;
  while (index < arr.length) {
    if (callback(arr[index], index, arr)) return index;
    index++;
  }
  return -1;
};

const createClasses = (tag, tags, validation = [], customDuplicateFn) => {
  if (tag.text === undefined) tag = { text: tag };

  // create css classes from the user validation array
  const classes = validateUserRules(tag, validation);

  // if we find the tag, it's an exsting one which is edited.
  // in this case we must splice it out
  const index = findIndex(tags, t => t === tag);
  const tagsDiff = clone(tags);
  const inputTag = index !== -1 ? tagsDiff.splice(index, 1)[0] : clone(tag);

  // check whether the tag is a duplicate or not
  const duplicate = customDuplicateFn ? customDuplicateFn(tagsDiff, inputTag) :
    tagsDiff.map(t => t.text).indexOf(inputTag.text) !== -1;

  // if it's a duplicate, push the class duplicate to the array
  if (duplicate) classes.push('ti-duplicate');

  // if we find no classes, the tag is valid → push the class valid
  classes.length === 0 ? classes.push('ti-valid') : classes.push('ti-invalid');
  return classes;
};

/**
 * @description Create one tag out of a String or validate an existing one
 * @property {helpers}
 * @param {Object|String} tag A tag which should be validated | A String to create a tag
 * @param {Array} tagsarray The tags array
 * @param {Array} [validation=[]] The validation Array is optional (pass it if you use one)
 * @returns {Object} The created (validated) tag
 */
const createTag = (tag, ...rest) => {
  // if text is undefined, a string is passed. let's make a tag out of it
  if (tag.text === undefined) tag = { text: tag };

  // we better make a clone to not getting reference trouble
  const t = clone(tag);

  // create the validation classes
  t.tiClasses = createClasses(tag, ...rest);
  return t;
};

/**
 * @description Create multiple tags out of Strings or validate existing tags
 * @property {helpers}
 * @param {Array} tagsarray An Array containing tags or strings. See example below.
 * @param {Array} [validation=[]] The validation Array is optional (pass it if you use one)
 * @returns {Array} An array containing (validated) tags
 * @example  &#47;* Example to call the function *&#47;
   const validatedTags = createTags(['tag1Text', 'tag2Text'], [{ type: 'length', rule: /[0-9]/ }])
 */
const createTags = (tags, ...rest) => tags.map(t => createTag(t, tags, ...rest));

export { createClasses, createTag, createTags, clone };
