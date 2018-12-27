/* Other stuff like import tagsinput ... */

data() {
  return {
    tag: '',
    tags: [],
    autocompleteItems: [{
      text: 'Invalid because of "8"',
    }, {
      text: 'toShort',
    }, {
      text: 'I am valid',
    }, {
      text: 'Cannot be added',
    }, {
      text: 'Invalid cause of "{"',
    }],
    validation: [{
      classes: 'min-length',
      rule: tag => tag.text.length < 8,
    }, {
      classes: 'no-numbers',
      rule: /^([^0-9]*)$/,
    }, {
      classes: 'avoid-item',
      rule: /^(?!Cannot).*$/,
      disableAdd: true,
    }, {
      classes: 'no-braces',
      rule: ({ text }) => text.indexOf('{') !== -1 || text.indexOf('}') !== -1,
    }],
  };
},

/* Computed properties, methods and more ... */
