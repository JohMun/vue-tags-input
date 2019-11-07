/* Other stuff before like template, data, import tagsinput ... */

methods: {
  checkTag(obj) {
   if (obj.tag.text.includes('e')) alert('Letter "e" is forbidden');
   else obj.addTag();
  },
},
