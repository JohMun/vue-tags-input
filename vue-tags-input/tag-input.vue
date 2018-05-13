<template>
  <input type="text"
    class="tag-input"
    v-model="scope.tag.text"
    v-if="scope.edit"
    :maxlength="scope.maxlength"
    size="1"
    @input="scope.validateTag(scope.index, $event)"
    @blur="scope.cancelEdit(scope.index)"
    @keydown="scope.performSaveTag(scope.index, $event)"
  />
</template>

<script>

export default {
  name: 'TagInput',
  props: ['scope'],
};

</script>
