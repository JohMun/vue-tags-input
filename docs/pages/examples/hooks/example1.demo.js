/* Other stuff before like import tagsinput ... */
data() {
  return {
    tag: '',
    tags: [],
    handler: null,
  };
},
methods: {
  cancel() {
    // for some reason we need nextTick here
    this.$nextTick(() => this.handler = null);
    this.tag = '';
  },
  add() {
    this.handler();
    this.$nextTick(() => this.handler = null);
  },
},
