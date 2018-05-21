<!-- A helper component used by VueTagsInput and can be put into the tagCenter slot -->

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

<style lang="css" scoped>
.tag-input {
  background-color: transparent;
  color: inherit;
  border: none;
  padding: 0px;
  margin: 0px;
  display: flex;
  top: 0px;
  position: absolute;
  width: 100%;
}

.tag-input::-ms-clear {
  display: none;
}

input:focus {
  outline: none;
}

input[disabled] {
  background-color: transparent;
}
</style>
