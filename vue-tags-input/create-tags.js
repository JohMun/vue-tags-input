const validateUserRules = (text, validation) => {
  return validation.filter(val => {
    // if the rule is a string, we convert it to RegExp
    if (typeof val.rule === 'string') return !new RegExp(val.rule).test(text);

    if (val.rule instanceof RegExp) return !val.rule.test(text);

    // if we deal with a function, invoke it
    const isFunction = {}.toString.call(val.rule) === '[object Function]';
    if (isFunction) return val.rule(text);

  }).map(val => val.type);
};

const createClasses = (text, tags, validation = [], checkFromInside = true) => {
  // create css classes from the user validation array
  const classes = validateUserRules(text, validation);

  // check wheter the tag is a duplicate or not
  const duplicate = checkFromInside ? tags.filter(t => t.text === text).length > 1 :
    tags.map(t => t.text).indexOf(text) !== -1;

  // if it's a duplicate, push the class duplicate to the array
  if (duplicate) classes.push('duplicate');

  // if we find no classes, the tag is valid → push the class valid
  classes.length === 0 ? classes.push('valid') : classes.push('invalid');
  return classes;
};

/*
 * @params: tag|object, tags|array, validation|array|optional, checkFromInside|boolean|optional
 */
const createTag = (tag, ...rest) => {
  // we better make a clone to not getting reference trouble
  let t = Object.assign({}, tag);
  if (t.text === undefined) t = { text: t };

  // create the validation classes
  t.tiClasses = createClasses(t.text, ...rest);
  return t;
};

/*
 * @params: tags|array, validation|array|optional, checkFromInside|boolean|optional
 */
const createTags = (tags, ...rest) => tags.map(t => createTag(t, tags, ...rest));

export { createClasses, createTag, createTags };
