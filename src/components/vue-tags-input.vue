<template lang="html">
  <div class="vue-tags-input">
    <div class="input">
      <ul class="tags">
        <li v-for="(tag, index) in tags" :key="index" :class="[tag.classes]">
          {{ tag.text }}
        </li>
      </ul>
      <input
        class="new-tag"
        v-bind="$attrs"
        type="text"
        :placeholder="placeholder"
        v-model="newTag"
        :maxlength="maxlength"
        @keydown.enter="addTag(newTag, 'input')"
        @input="updateNewTag"
      />
    </div>
    <div class="autocomplete">
      <ul>
        <li
          v-for="(item, index) in filteredAutocompleteItems"
          :key="index"
          @click="addTag(item, 'autocomplete')">
          {{ item.text }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'VueTagsInput',
  props: {
    value: {
      type: String,
      default: '',
    },
    tags: {
      type: Array,
      default: [],
    },
    autocompleteItems: {
      type: Array,
      default: () => [],
    },
    autocompleteFilterDuplicates: {
      default: true,
      type: Boolean,
    },
    placeholder: {
      type: String,
      default: 'Add Tag',
    },
    maxTags: {
      type: Number,
    },
    maxlength: {
      type: Number,
    },
    validation: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      newTag: null,
    };
  },
  computed: {
    filteredAutocompleteItems() {
      if (!this.autocompleteFilterDuplicates) return this.autocompleteItems;
      return this.autocompleteItems.filter(i => !this.tags.find(t => t.text === i.text));
    },
  },
  methods: {
    clone(items) {
      return JSON.parse(JSON.stringify(items));
    },
    validate(text) {
      return this.validation
        .filter(val => !new RegExp(val.rule).test(text))
        .map(val => val.type);
    },
    addTag(newTag) {
      if (this.maxTags && this.maxTags === this.tags.length) return;
      let tag = this.clone(newTag);
      if (typeof newTag === 'string') tag = { text: newTag };
      const tags = this.clone(this.tags);
      const validation = this.validate(tag.text);
      const valid = validation.length === 0;
      const classes = `${validation.join(' ')} ${valid ? 'valid' : 'invalid'}`;
      tag.classes = classes;
      tag.valid = valid;

      tags.push(tag);
      this.$emit('tags-changed', tags);
    },
    updateNewTag(ievent) {
      const value = ievent.target.value;
      this.newTag = value;
      this.$emit('input', value);
    },
  },
  watch:{
    value(newValue){
      this.newTag = newValue;
    },
  },
  mounted() {
    this.newTag = this.value;
  },
};
</script>

<style scoped lang="scss">
@import '~colors';

</style>
