// The file contains all props and validators which are provided by the component

const propValidatorTag = value => {
  return !value.some(t => {
    const invalidText = !t.text;
    if (invalidText) console.warn('Missing property "text"', t);

    let invalidClasses = false;
    if (t.classes) invalidClasses = typeof t.classes !== 'string';
    if (invalidClasses) console.warn('Property "classes" must be type of string', t);

    return invalidText || invalidClasses;
  });
};

const propValidatorNumeric = value => {
  return !value.some(v => {
    const numeric = typeof v === 'number' && isFinite(v) && Math.floor(v) === v;
    if (!numeric) console.warn('Only numerics are allowed for this prop. Found:', v);
    return !numeric;
  });
};

export default {
  /**
   * @description The model which is binded to the input.
     If the user press enter with an valid input,
     a new tag is created with the value of this model. After creating the tag,
     the model is cleared.
   * @property {props}
   * @required
   * @type {String}
   * @model
   * @default ''
   */
  value: {
    type: String,
    default: '',
    required: true,
  },
  /**
   * @description A tag is an Object with ...
   * @property {props}
   * @required
   * @type {Array}
   * @default []
   * @example
    {
    &ensp;text: 'My tag value', &#47;* the visible value *&#47;*
    &ensp;style: 'background-color: #ccc',
    &ensp;classes: 'custom-css-classes',
    }
   */
  tags: {
    type: Array,
    default: () => [],
    validator(value) {
      return propValidatorTag(value);
    },
  },
  autocompleteItems: {
    type: Array,
    default: () => [],
    validator(value) {
      return propValidatorTag(value);
    },
  },
  allowEditTags: {
    type: Boolean,
    default: false,
  },
  autocompleteFilterDuplicates: {
    default: true,
    type: Boolean,
  },
  addOnlyFromAutocomplete: {
    type: Boolean,
    default: false,
  },
  autocompleteMinLength: {
    type: Number,
    default: 1,
  },
  autocompleteAlwaysOpen: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  placeholder: {
    type: String,
    default: 'Add Tag',
  },
  addOnKey: {
    type: Array,
    default: () => [13],
    validator: propValidatorNumeric,
  },
  saveOnKey: {
    type: Array,
    default: () => [13],
    validator: propValidatorNumeric,
  },
  maxTags: {
    type: Number,
  },
  maxlength: {
    type: Number,
  },
  validation: {
    type: Array,
    default: () => [],
    validator(value) {
      return !value.some(v => {
        const missingRule = !v.rule;
        if (missingRule) console.warn('Property "rule" is missing', v);

        const validRule = v.rule && (
          typeof v.rule === 'string' ||
          v.rule instanceof RegExp ||
          {}.toString.call(v.rule) === '[object Function]'
        );

        if (!validRule) {
          console.warn(
            'A rule must be type of string, RegExp or function. Found:',
            JSON.stringify(v.rule)
          );
        }

        const missingType = !v.type;
        if (missingType) console.warn('Property "type" is missing', v);

        const invalidType = v.type && typeof v.type !== 'string';
        if (invalidType) console.warn('Property "type" must be type of string. Found:', v);

        return !validRule || missingRule || missingType || invalidType;
      });
    },
  },
  separators: {
    type: Array,
    default: () => [';'],
    validator(value) {
      return !value.some(s => {
        const invalidType = typeof s !== 'string';
        if (invalidType) console.warn('Separators must be type of string. Found:', s);
        return invalidType;
      });
    },
  },
  avoidAddingDuplicates: {
    type: Boolean,
    default: true,
  },
  addOnBlur: {
    type: Boolean,
    default: true,
  },
  addFromPaste: {
    type: Boolean,
    default: true,
  },
  deleteOnBackslash: {
    default: true,
    type: Boolean,
  },
};
