/* Other stuff before, like template, import tagsinput ... */

data() {
  return {
    tag: 'Also valid8ed',
    tags: [{
      text: 'custom class',
      classes: 'custom-class',
    }, {
      text: 'valid tag',
    }, {
      text: 'toShort',
    }, {
      text: '8 is invalid',
    }, {
      text: 'duplicate',
    }, {
      text: 'duplicate',
    }, {
      text: 'Inline style',
      style: 'color: #000; background-color: transparent; border: 1px solid #ccc',
    }],
    autocompleteItems: [{
      text: 'invalid',
    }, {
      text: 'Invalid cause of "1"',
    }, {
      text: 'valid item',
    }],
    validation: [{
      classes: 'min-length',
      rule: '^.{8,}$',
    }, {
      classes: 'no-numbers',
      rule: '^([^0-9]*)$',
    }],
  };
},

/* Computed properties, methods and more ... */
