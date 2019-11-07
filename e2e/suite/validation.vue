<template>
  <div class="validation">
    <vue-tags-input
      v-model="tag"
      class="tags-input-1"
      :tags="tags"
      :allow-edit-tags="true"
      :avoid-adding-duplicates="false"
      :validation="validation"
      :autocomplete-items="filteredItems"
      @tags-changed="newTags => tags = newTags"
    />
  </div>
</template>

<script>
import VueTagsInput from '@johmun/vue-tags-input';

export default {
  name: 'Validation',
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
        classes: 'min-length',
        rule: /^.{8,}$/,
      }, {
        classes: 'no-numbers',
        rule: /^([^0-9]*)$/,
      }, {
        classes: 'avoid-item',
        rule: /^(?!Cannot).*$/,
        disableAdd: true,
      }, {
        classes: 'no-braces',
        rule({ text }) {
          return text.indexOf('{') !== -1 || text.indexOf('}') !== -1;
        },
      }],
    };
  },
  computed: {
    filteredItems() {
      return this.autocompleteItems.filter(i => {
        return i.text.toLowerCase().indexOf(this.tag.toLowerCase()) !== -1;
      });
    },
  },
};
</script>
