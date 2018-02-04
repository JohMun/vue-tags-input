<template>
  <div class="validation">
    <vue-tags-input
      class="tags-input-1"
      v-model="tag"
      :tags="tags"
      :allow-edit-tags="true"
      :avoid-adding-duplicates="false"
      :validation="validation"
      :autocomplete-items="filteredItems"
      @tags-changed="newTags => tags = newTags">
    </vue-tags-input>
  </div>
</template>

<script>
import VueTagsInput from '../../components/vue-tags-input';

export default {
  name: 'e2eValidation',
  components: {
    VueTagsInput,
  },
  data() {
    return {
      tag: '',
      tags: [],
      autocompleteItems: [{
        text: 'Invalid because of "8"',
      }, {
        text: 'toShort',
      }, {
        text: 'I am valid',
      }, {
        text: 'Cannot be added',
      }, {
        text: 'Invalid because of {',
      }],
      validation: [{
        type: 'min-length',
        rule: /^.{8,}$/,
      }, {
        type: 'no-numbers',
        rule: /^([^0-9]*)$/,
      }, {
        type: 'avoid-item',
        rule: /^(?!Cannot).*$/,
        disableAdd: true,
      }, {
        type: 'no-braces',
        rule(text) {
          return text.indexOf('{') !== -1 || text.indexOf('}') !== -1;
        },
      }],
    };
  },
  computed: {
    filteredItems() {
      return this.autocompleteItems.filter(i => new RegExp(this.tag, 'i').test(i.text));
    },
  },
};
</script>

<style scoped lang="scss">

</style>
