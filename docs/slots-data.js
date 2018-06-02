const deletionMark = {
  name: 'deletionMark',
  description: `If the tag should be deleted with backslash and is marked,
    the property is true for 1 second`,
  type: Boolean,
};

const tag = {
  name: 'tag',
  type: Object,
  description: 'a tag',
  example: '',
};

const index = {
  name: 'index',
  description: 'The tags index',
  type: Number,
};

const edit = {
  name: 'edit',
  description: 'True if the tag is in edit mode',
  type: Boolean,
};

const performDelete = {
  name: 'performDelete',
  description: '',
  type: Function,
  expectedParams: 'index|Number',
};

const performOpenEdit = {
  name: 'performOpenEdit',
  description: '',
  type: Function,
  expectedParams: 'index|Number',
};

const performCancelEdit = {
  name: 'performCancelEdit',
  description: '',
  type: Function,
  expectedParams: 'index|Number',
};

const performSaveTag = {
  name: 'performSaveTag',
  description: '',
  type: Function,
  expectedParams: 'index|Number',
};

export default [
  {
    slot: 'tagLeft',
    description: 'The slot is positioned on the left of the text value',
    props: [
      tag,
      index,
      edit,
      deletionMark,
      performDelete,
      performOpenEdit,
      performCancelEdit,
      performSaveTag,
    ],
  },
  {
    slot: 'tagRight',
    description: 'The slot is positioned between the text value and the actions',
    props: [
      tag,
      index,
      edit,
      deletionMark,
      performDelete,
      performOpenEdit,
      performCancelEdit,
      performSaveTag,
    ],
  },
  {
    slot: 'tagActions',
    description: `The slot is positioned on the right side.
      Holds the 'check', 'undo' and 'close' icons`,
    props: [
      tag,
      index,
      edit,
      deletionMark,
      performDelete,
      performOpenEdit,
      performCancelEdit,
      performSaveTag,
    ],
  },
  {
    slot: 'tagCenter',
    description: 'Write something ...',
  },
  {
    slot: 'autocompleteItem',
    description: 'Slot to create a autocomplete item in the auutocomplete layer',
  },
  {
    slot: 'between-elements',
    description: `The slot is positioned between the tags and the autocomplete layer.
      Maybe someone needs it.`,
  },
];
