<template lang="html">
  <div class="basic-demo">
    <h1>All Demo</h1>
    <button type="button" name="button" @click="tags.push({ text: 'buh' })">add tag</button>
    <button type="button" name="button" @click="tags.splice(1, 1)">delete tag</button>
      <vue-tags-input
        class="tags-input"
        v-model="tag"
        :tags.sync="tags"
        :add-on-key="[188, 186, 13]"
        :save-on-key="[188, 38, 13]"
        :allow-edit-tags="true"
        :separators="[',']"
        :validation="validation"
        :is-duplicate="isDuplicate"
        :avoid-adding-duplicates="false"
        :autocomplete-items="autocompleteItems"
        @tags-changed="tagsChanged">
      </vue-tags-input>
  </div>
</template>

<script>
import VueTagsInput from '../../vue-tags-input/vue-tags-input.vue';
import TagInput from '../../vue-tags-input/tag-input.vue';

export default {
  name: 'ToDevelop',
  components: {
    VueTagsInput,
    TagInput,
  },
  data() {
    return {
      tag: '',
      tags: [{
        classes: 'test',
        text: 'uh',
      }, {
        text: 't5',
      }],
      validation: [{
        type: 'min-length',
        rule: '[0-9]',
      }, {
        type: 'only-numbers',
        rule: '[0-9]',
      }],
      countries: [
        'Germany', 'Holland', 'France', '09879', 't1', 't1',
      ],
      autocompleteItems: [],
    };
  },
  methods: {
    isDuplicate(tags, tag) {
      return tags.map(t => t.text).indexOf(tag.text) !== -1;
    },
    tagsChanged() {
      // console.log('changed', tags);
    },
    tagClicked(obj) {
      console.log(obj);
    },
    foundDuplicate(tag) {
      console.log(tag);
    },
    decideDeleting(obj) {
      obj.deleteTag(true);
    },
    decideEdit(obj) {
      obj.editTag(true);
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
      // if (this.tag.length === 0) return this.autocompleteItems = [];
      this.autocompleteItems = this.countries
        .filter(c => c.toLowerCase().indexOf(this.tag.toLowerCase()) !== -1)
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

.basic-demo .duplicate {
  color: blue !important;
}

.basic-demo .tag.invalid.only-numbers {
  background-color: $warn;
}

.basic-demo .new-tag-input.invalid.min-length {
  color: $error;
}

.basic-demo .new-tag-input.invalid.only-numbers {
  color: $warn;
}

.basic-demo .autocomplete.autocomplete {
  bottom: 33px;
  border-top: 1px solid #ccc;
}

</style>
