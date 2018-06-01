import 'normalize-css';
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import docsFormatter from './docs-formatter';

// require the docs file which conains all informmation
const docs = require('!!./docs-loader!../vue-tags-input/vue-tags-input.js');
window.docs = docsFormatter(docs);

new Vue({
  el: '#app',
  render: h => h(App),
  router,
});
