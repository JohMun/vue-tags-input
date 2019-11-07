data() {
  return {
    animals: [
      'Lion', 'Turtle', 'Rabbit', 'Frog', 'Squirrel', 'Owl', 'Bee',
    ],
    tag: '',
    tags: [],
  };
},
computed: {
  items() {
    return this.animals.filter(a => {
      return a.toLowerCase().indexOf(this.tag.toLowerCase()) !== -1;
    }).map(a => ({ text: a }));
  },
},
