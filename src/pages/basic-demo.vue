<template lang="html">
  <div class="basic-demo">
    <vue-tags-input
      v-model="tag"
      :validation="validation"
      :tags="tags"
      :autocomplete-items="autocompleteItems"
      @tags-changed="newTags => tags = newTags">
    </vue-tags-input>
    {{ tags }}
    <button type="button" @click="addTag">add</button>
  </div>
</template>

<script>
import VueTagsInput from '../components/vue-tags-input';

export default {
  name: 'BasicDemo',
  components: {
    VueTagsInput,
  },
  data() {
    return {
      tag: '',
      tags: [{
        text: 't1',
      }, {
        text: 'tag2',
      }],
      validation: [{
        type: 'min-length',
        rule: '^.{4,}$',
        disableAdd: true,
      }, {
        type: 'only-numbers',
        rule: '[0-9]',
      }],
      countries: [
        'Germany', 'Holland', 'France', '09879',
      ],
      autocompleteItems: [],
    };
  },
  methods: {
    addInvalidOnPurpose(tag) {
      this.tags.push(tag);
    },
    setAutocompleteItems() {
      this.autocompleteItems = this.countries
        .filter(c => new RegExp(this.tag, 'i').test(c))
        .map(text => {
          return { text, test: 'nlub' };
        });
    },
    addTag() {
      this.tags.push({ text: ('hu') });
    },
  },
  watch: {
    tag: 'setAutocompleteItems',
  },
  mounted() {
    this.setAutocompleteItems();
  },
};
</script>

<style lang="scss">
.invalid.min-length {
  color: red;
}

.invalid.only-numbers {
  color: yellow;
}
</style>
