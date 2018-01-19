export default {
  name: 'TagInput',
  props: ['scope'],
  template: `<input type="text"
    class="tag-input"
    v-model="scope.tag.text"
    v-if="scope.edit"
    :maxlength="scope.maxlength"
    size="1"
    @input="scope.validateTag(scope.index)"
    @blur="scope.cancelEdit(scope.index)"
    @keydown.enter="scope.performSaveTag(scope.index)"
  />`,
};
