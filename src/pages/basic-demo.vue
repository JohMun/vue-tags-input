<template lang="html">
  <div class="basic-demo">
    <vue-tags-input
      class="tags-input"
      v-model="tag"
      :validation="validation"
      :tags="tags"
      :max-tags="4"
      :seperators="['.', 'i']"
      @before-adding-tag="decideAdding"
      @before-deleting-tag="decideDeleting"
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
        classes: 'test1 test2',
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
    decideDeleting(obj) {
      obj.deleteTag(true);
    },
    decideAdding(obj) {
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

.tag.invalid.min-length {
  background-color: $error;
}

.tag.invalid.only-numbers {
  background-color: $warn;
}

.new-tag-input.invalid.min-length {
  color: $error;
}

.new-tag-input.invalid.only-numbers {
  color: $warn;
}
</style>
