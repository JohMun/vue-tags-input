import VueTagsInput from './vue-tags-input/vue-tags-input.vue';
import { createClasses, createTag, createTags } from './vue-tags-input/create-tags';
import TagInput from './vue-tags-input/tag-input.vue';

VueTagsInput.install = function install(Vue) {
  var component = Vue.component(VueTagsInput.name, VueTagsInput)
  return component
}

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(VueTagsInput)
}

export {
  VueTagsInput,
  createClasses,
  createTag,
  createTags,
  TagInput,
};

export default VueTagsInput;
