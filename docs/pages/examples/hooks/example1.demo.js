/* Other stuff before like import tagsinput ... */
data() {
  return {
    tag: '',
    tags: [],
    handlers: [],
  };
},
methods: {
  cancel() {
    // for some reason we need nextTick here
    this.$nextTick(() => this.handlers = []);
    this.tag = '';
  },
  add() {
    this.handlers.forEach(h => h());
    this.$nextTick(() => this.handlers = []);
  },
},
