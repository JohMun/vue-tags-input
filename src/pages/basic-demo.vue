<template lang="html">
  <div class="basic-demo">
    <vue-tags-input
      class="tags-input"
      v-model="tag"
      :validation="validation"
      :tags="tags"
      @before-adding-tag="test"
      :autocomplete-items="autocompleteItems"
      @tags-changed="newTags => tags = newTags">
    </vue-tags-input>
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
    test(obj) {
      obj.addTag(true);
    },
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
@import '~colors';

.tags-input .invalid.min-length {
  background-color: $error;
}

.tags-input .invalid.only-numbers {
  background-color: $warn;
}
</style>
