<template lang="html">
  <div class="basic-demo">
    <h1>All Demo</h1>
    <button type="button" name="button" @click="tags.push({ text: 'buh' })">add tag</button>
    <button type="button" name="button" @click="tags.splice(1, 1)">delete tag</button>
    <vue-tags-input
      v-model="tag"
      class="tags-input"
      :tags.sync="tags"
      :allow-edit-tags="true"
      :separators="[',', ',']"
      :delete-on-backspace="true"
      :validation="validation"
      :is-duplicate="isDuplicate"
      :autocomplete-filter-duplicates="false"
      :avoid-adding-duplicates="false"
      :autocomplete-items="autocompleteItems"
      @tags-changed="tagsChanged"
    />
    <input type="text" />
    {{ tags }}
  </div>
</template>

<script>
import VueTagsInput from '@johmun/vue-tags-input';
import TagInput from '@tag-input';

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
        classes: 'min-length',
        rule: '[0-9]',
      }, {
        classes: 'only-numbers',
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

.basic-demo .ti-duplicate {
  color: blue !important;
}

.basic-demo .ti-tag.ti-invalid.only-numbers {
  background-color: $warn;
}

.basic-demo .ti-new-tag-input.ti-invalid.min-length {
  color: $error;
}

.basic-demo .ti-new-tag-input.ti-invalid.only-numbers {
  color: $warn;
}

.basic-demo .ti-autocomplete.ti-autocomplete {
  bottom: 33px;
  border-top: 1px solid #ccc;
}

.basic-demo .ti-focus .ti-input {
  border: 1px solid blue;
}

</style>
