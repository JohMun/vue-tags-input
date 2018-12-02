<template lang="html">
  <div class="basic-demo">
    <h1>All Demo</h1>
    <button type="button" name="button" @click="tags.push({ text: 'buh' })">add tag</button>
    <button type="button" name="button" @click="tags.splice(1, 1)">delete tag</button>
      <vue-tags-input
        class="tags-input"
        v-model="tag"
        :tags.sync="tags"
        :add-on-key="[',', '#', 13]"
        :save-on-key="[',', '#', 13]"
        :allow-edit-tags="true"
        :separators="[',']"
        :validation="validation"
        :is-duplicate="isDuplicate"
        :autocomplete-filter-duplicates="false"
        :avoid-adding-duplicates="false"
        :autocomplete-items="autocompleteItems"
        @tags-changed="tagsChanged">
      </vue-tags-input>
      {{ tags }}
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
      autocompleteItems: [{
        text: 'ben',
        from: 'Stuttgart',
      }, {
        text: 'ben',
        from: 'Munich',
      }, {
        text: 'ben',
        from: 'Munich',
      }, {
        text: 'Bibu',
        from: 'Stuttgart',
      }],
    };
  },
  methods: {
    isDuplicate(tags, tag) {
      const categoryTags = tags.filter(({ from }) => from === tag.from);
      return categoryTags.map(({ text }) => text).indexOf(tag.text) !== -1;
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
    addTag() {
      this.tags.push({ text: ('hu') });
    },
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
