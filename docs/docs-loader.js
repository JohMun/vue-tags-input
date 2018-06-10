const documentation = require('documentation');
const path = require('path');

module.exports = function() {
  const callback = this.async();
  const filepath = path.relative(process.cwd(), this.resourcePath);

  documentation.build(['./' + filepath], {
    extension: ['js', 'vue'],
  }).then(documentation.formats.json)
    .then(res => callback(null, 'module.exports = ' + res + ';'));
};
