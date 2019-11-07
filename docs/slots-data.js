const deletionMark = {
  name: 'deletionMark',
  description: `If the user wants to delete the tag and presses backspace,
    the property is true for 1 second, because the tag is marked to delete. `,
  type: 'Boolean',
};

const tag = {
  name: 'tag',
  type: 'Object',
};

const index = {
  name: 'index',
  description: 'The tags index',
  type: 'Number',
};

const edit = {
  name: 'edit',
  description: 'It is true, if the tag is in edit mode',
  type: 'Boolean',
};

const performDelete = {
  name: 'performDelete',
  description: `Call this function and pass an index as parameter
    to start the deletion process for a tag`,
  type: 'Function',
  expectedParams: 'index|Number',
};

const performOpenEdit = {
  name: 'performOpenEdit',
  description: `Call this function and pass an index as parameter
    to open the edit mode for a tag`,
  type: 'Function',
  expectedParams: 'index|Number',
};

const performCancelEdit = {
  name: 'performCancelEdit',
  description: `Call this function and pass an index as parameter
    to cancel the edit mode for a tag`,
  type: 'Function',
  expectedParams: 'index|Number',
};

const performSaveEdit = {
  name: 'performSaveEdit',
  description: `Call this function and pass an index as parameter
    to save a modified tag`,
  type: 'Function',
  expectedParams: 'index|Number',
};

export default [
  {
    slot: 'tag-left',
    description: 'The slot is positioned on the left of the text value',
    props: [
      tag,
      index,
      edit,
      deletionMark,
      performDelete,
      performOpenEdit,
      performCancelEdit,
      performSaveEdit,
    ],
  },
  {
    slot: 'tag-right',
    description: 'The slot is positioned between the text value and the actions',
    props: [
      tag,
      index,
      edit,
      deletionMark,
      performDelete,
      performOpenEdit,
      performCancelEdit,
      performSaveEdit,
    ],
  },
  {
    slot: 'tag-actions',
    description: `The slot is positioned on the right side.
      At default, it holds the 'check', 'undo' and 'close' icons`,
    props: [
      tag,
      index,
      edit,
      deletionMark,
      performDelete,
      performOpenEdit,
      performCancelEdit,
      performSaveEdit,
    ],
  },
  {
    slot: 'tag-center',
    description: 'At default, it holds the tags text value and an input to edit the text',
    props: [
      tag,
      index,
      edit,
      {
        name: 'maxlength',
        type: 'Number',
        description: 'The maximum amount of characters the input is allowed to hold',
      },
      deletionMark,
      performDelete,
      performOpenEdit,
      performCancelEdit,
      performSaveEdit,
      {
        name: 'validateTag',
        description: `Call this function if the input of a tag changes
          to validate the new value e.g. the function could be binded to @input`,
        type: 'Function',
        expectedParams: 'index|Number, inputEvent',
        example: '@input="props.validateTag(props.index, $event)',
      },
    ],
  },
  {
    slot: 'autocomplete-item',
    description: 'Slot to create a autocomplete item in the autocomplete layer',
    props: [
      {
        name: 'item',
        description: 'A autocomplete item, which has the same properties like a tag object',
        type: 'Object',
      },
      {
        name: 'index',
        description: 'The items index',
        type: 'Number',
      },
      {
        name: 'selected',
        description: 'It is true, if the autocomplete item is selected',
        type: 'Boolean',
      },
      {
        name: 'performAdd',
        description: `Call this function and pass an autocomplete item as parameter
          to add it to the tags array`,
        type: 'Function',
        expectedParams: 'item|Object',
      },
    ],
  },
  {
    slot: 'autocomplete-header',
    description: 'The slot is at the top of the autocomplete layer.',
  },
  {
    slot: 'autocomplete-footer',
    description: 'The slot is at the bottom of the autocomplete layer.',
  },
  {
    slot: 'between-elements',
    description: `The slot is positioned between the tags and the autocomplete layer.
      Maybe someone needs it.`,
  },
];
