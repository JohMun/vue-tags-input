/* Other stuff before, like template, import tagsinput ... */

data() {
  return {
    tag: '',
    tags: [],
    icons: [{
      text: 'done',
      iconColor: '#086A87',
    }, {
      text: 'fingerprint',
      iconColor: '#8A0886',
    }, {
      text: 'label',
      iconColor: '#B43104',
    }, {
      text: 'pregnant_woman',
    }, {
      text: 'touch_app',
      iconColor: '#AC58FA',
    }, {
      text: 'group_work',
    }, {
      text: 'pets',
      iconColor: '#8A4B08',
    }],
  };
},
computed: {
  items() {
    return this.icons.filter(i => {
      return i.text.toLowerCase().indexOf(this.tag.toLowerCase()) !== -1;
    });
  },
},
