const clone = items => {
  return JSON.parse(JSON.stringify(items));
};

const validateUserRules = (text, validation) => {
  return validation
    .filter(val => {
      if (typeof val.rule === 'string') return !new RegExp(val.rule).test(text);
      if (val.rule instanceof RegExp) return !val.rule.test(text);
      const isFunction = {}.toString.call(val.rule) === '[object Function]';
      if (isFunction) return val.rule(text);
    })
    .map(val => val.type);
};

const createClasses = (text, tags, validation, checkFromInside) => {
  if (!validation) validation = [];
  if (checkFromInside === undefined) checkFromInside = true;
  const classes = validateUserRules(text, validation);
  if (checkFromInside) {
    if (tags.filter(t => t.text === text).length > 1) classes.push('duplicate');
  } else {
    if (tags.map(t => t.text).includes(text)) classes.push('duplicate');
  }
  classes.length === 0 ? classes.push('valid') : classes.push('invalid');
  return classes;
};

const createTag = (tag, tags, validation, checkFromInside) => {
  if (tag.text === undefined) tag = { text: tag };
  const t = clone(tag);
  t.tiClasses = createClasses(t.text, tags, validation, checkFromInside);
  return t;
};

const createTags = (tags, validation, checkFromInside) => {
  return tags.map(t => createTag(t, tags, validation, checkFromInside));
};

export {
  createClasses,
  createTag,
  createTags,
};
