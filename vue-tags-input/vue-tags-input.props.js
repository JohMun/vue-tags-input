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
   * @description Property to bind a model to the input.
     If the user changes the input value, the model updates, too.
     If the user presses enter with an valid input,
     a new tag is created with the value of this model.
     After creating the new tag, the model is cleared.
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
   * @description Pass an array containing objects like in the example below.
     The properties 'style' and 'class' are optional. Of course it is possible to add custom
     properties to a tag object. vue-tags-input won't change the key and value.
   * @property {props}
   * @type {Array}
   * @default []
   * @example
    {
    &ensp;text: 'My tag value', &#47;* The visible text on display *&#47;
    &ensp;style: 'background-color: #ccc', &#47;* Adding inline styles is possible *&#47;
    &ensp;classes: 'custom-class another', &#47;* The value will be added as css classes *&#47;
    }
   */
  tags: {
    type: Array,
    default: () => [],
    validator: propValidatorTag,
  },
  /**
   * @description Expects an array containing objects inside. The objects
    can have the same properties as a tag object, explained above.
   * @property {props}
   * @type {Array}
   * @default []
   */
  autocompleteItems: {
    type: Array,
    default: () => [],
    validator: propValidatorTag,
  },
  /**
   * @description Defines whether a tag is editable after creation or not.
   * @property {props}
   * @type {Boolean}
   * @default false
   */
  allowEditTags: {
    type: Boolean,
    default: false,
  },
  /**
   * @description Defines if duplicate autocomplete items are filtered out from the view or not.
   * @property {props}
   * @type {Boolean}
   * @default true
   */
  autocompleteFilterDuplicates: {
    default: true,
    type: Boolean,
  },
  /**
   * @description If it's true, the users can add tags only with the autocomplete layer.
   * @property {props}
   * @type {Boolean}
   * @default false
   */
  addOnlyFromAutocomplete: {
    type: Boolean,
    default: false,
  },
  /**
   * @description The minimum character length which is required
     until the autocomplete layer is shown.
   * @property {props}
   * @type {Number}
   * @default 1
   */
  autocompleteMinLength: {
    type: Number,
    default: 1,
  },
  /**
   * @description If it's true, the autocomplete layer is always shown, regardless if
     an input or an autocomplete items exists.
   * @property {props}
   * @type {Boolean}
   * @default false
   */
  autocompleteAlwaysOpen: {
    type: Boolean,
    default: false,
  },
  /**
   * @description Property to disable the tags input component.
   * @property {props}
   * @type {Boolean}
   * @default false
   */
  disabled: {
    type: Boolean,
    default: false,
  },
  /**
   * @description The placeholder text which is shown in the input, when it's empty.
   * @property {props}
   * @type {String}
   * @default Add Tag
   */
  placeholder: {
    type: String,
    default: 'Add Tag',
  },
  /**
   * @description Custom trigger key codes can be registrated. If the user presses one of these,
     a tag will be generated out of the input value.
   * @property {props}
   * @type {Array}
   * @default [13]
   */
  addOnKey: {
    type: Array,
    default: () => [13],
    validator: propValidatorNumeric,
  },
  /**
   * @description Custom trigger key codes can be registrated. If the user edits a tag
     and presses one of these, the edited tag will be saved.
   * @property {props}
   * @type {Array}
   * @default [13]
   */
  saveOnKey: {
    type: Array,
    default: () => [13],
    validator: propValidatorNumeric,
  },
  /**
   * @description The maximum amount the tags array is allowed to hold.
   * @property {props}
   * @type {Number}
   */
  maxTags: {
    type: Number,
  },
  /**
   * @description The maximum amount of characters the input is allowed to hold.
   * @property {props}
   * @type {Number}
   */
  maxlength: {
    type: Number,
  },
  /**
   * @description Pass an array containing objects like in the example below.
     The property 'type' will be added as css classes, if the property 'rule' matches the text
     of a tag, an autocomplete item or the input. The property 'rule' can be type of
     RegExp or function.
   * @property {props}
   * @type {Array}
   * @default []
   * @example
    {
    &ensp;type: 'class', &#47;* css class *&#47;
    &ensp;rule: /^([^0-9]*)$/, &#47;* RegExp *&#47;
    }, {
    &ensp;type: 'no-braces', &#47;* css class *&#47;
    &ensp;rule(text) { &#47;* function with text as param *&#47;
    &ensp;&ensp;return text.indexOf('{') !== -1 || text.indexOf('}') !== -1;
    },
   */
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
  /**
   * @description Defines the characters which splits a text into different pieces,
     to generate tags out of this pieces.
   * @property {props}
   * @type {Array}
   * @default [';']
   * @example
     separators: [';', ',']
     input: some; user input, has random; commas, an,d semicolons
     is split into: some - user input - has random - commas - an - d semicolons
   */
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
  /**
   * @description If it's true, the user can't add or save a tag,
     if another exists, with the same text value.
   * @property {props}
   * @type {Boolean}
   * @default true
   */
  avoidAddingDuplicates: {
    type: Boolean,
    default: true,
  },
  /**
   * @description If the input holds a value and loses the focus,
     a tag will be generated out of this value, if possible.
   * @property {props}
   * @type {Boolean}
   * @default true
   */
  addOnBlur: {
    type: Boolean,
    default: true,
  },
  /**
   * @description If it's true, the user can paste into the input element and
     vue-tags-input will create tags out of the incoming text.
   * @property {props}
   * @type {Boolean}
   * @default true
   */
  addFromPaste: {
    type: Boolean,
    default: true,
  },
  /**
   * @description Defines if it's possible to delete tags when pressing backslash.
     If so and the user wants to delete a tag,
     the tag gets the css class 'deletion-mark' for 1 second.
     If the user presses backslash again in that time period,
     the tag is removed from the tags array and the view.
   * @property {props}
   * @type {Boolean}
   * @default true
   */
  deleteOnBackslash: {
    default: true,
    type: Boolean,
  },
};
