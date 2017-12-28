<template lang="html">
  <div class="basic-demo">
    <vue-tags-input
      class="tags-input"
      v-model="tag"
      :validation="validation"
      :tags="tags"
      @duplicate="foundDuplicate"
      @before-adding-tag="decideAdding"
      @before-deleting-tag="decideDeleting"
      @before-saving-tag="decideSaving"
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
      }, {
        type: 'only-numbers',
        rule: '[0-9]',
      }],
      countries: [
        'Germany', 'Holland', 'France', '09879', 't1',
      ],
      autocompleteItems: [],
    };
  },
  methods: {
    foundDuplicate(tag) {
      console.log(tag);
    },
    decideDeleting(obj) {
      obj.deleteTag(true);
    },
    decideAdding(obj) {
      obj.addTag(true);
    },
    decideSaving(obj) {
      obj.saveTag(true);
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

.basic-demo .tag.duplicate {
  background-color: #141f2d;
}

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
