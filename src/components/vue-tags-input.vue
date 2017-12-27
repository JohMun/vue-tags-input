<template lang="html">
  <div class="vue-tags-input">
    <div class="input">
      <ul class="tags" v-if="tagsCopy">
        <li
          v-for="(tag, index) in tagsCopy"
          :key="index"
          class="tag"
          :class="[tag.classes]">
          <span
            @click="toggleEdit(index); focus()"
            v-if="!tagsEditStatus[index]">
            {{ tag.text }}
          </span>
          <input
            type="text"
            v-else
            :maxlength="maxlength"
            ref="tagInput"
            v-model="tag.text"
            @input="validateChangedTag(index, tag)"
            @blur="cancelChanging(index)"
            @keydown.enter="saveTag(index, tag)"
          />
        </li>
      </ul>
      <input
        class="new-tag"
        v-bind="$attrs"
        type="text"
        :placeholder="placeholder"
        v-model="newTag"
        :maxlength="maxlength"
        @keydown.enter="performAddTag(newTag, 'input')"
        @input="updateNewTag"
      />
    </div>
    <div class="autocomplete">
      <ul>
        <li
          v-for="(item, index) in filteredAutocompleteItems"
          :key="index"
          class="item"
          :class="item.classes"
          @click="performAddTag(item, 'autocomplete')">
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
    allowEditTags: {
      type: Boolean,
      default: true,
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
      tagsCopy: null,
      tagsEditStatus: null,
    };
  },
  computed: {
    filteredAutocompleteItems() {
      const items = this.autocompleteItems.map(i => this.createTag(i));
      if (!this.autocompleteFilterDuplicates) return items;
      return items.filter(i => !this.tags.find(t => t.text === i.text));
    },
  },
  methods: {
    toggleEdit(index) {
      if (!this.allowEditTags) return;
      this.$set(this.tagsEditStatus, index, !this.tagsEditStatus[index]);
    },
    clone(items) {
      return JSON.parse(JSON.stringify(items));
    },
    validate(text) {
      return this.validation
        .filter(val => !new RegExp(val.rule).test(text))
        .map(val => val.type);
    },
    validateChangedTag(index, tag) {
      this.$set(this.tagsCopy, index, this.createTag(tag));
    },
    createTag(tag) {
      const t = this.clone(tag);
      const validation = this.validate(t.text);
      const valid = validation.length === 0;
      const classes = `${validation.join(' ')} ${valid ? 'valid' : 'invalid'}`;
      t.classes = classes;
      t.valid = valid;
      return t;
    },
    focus() {
      this.$nextTick(() => this.$refs.tagInput[0].focus());
    },
    cancelChanging(index) {
      this.tagsCopy[index] = Object.assign({}, this.createTag(this.tags[index]));
      this.$set(this.tagsEditStatus, index, false);
    },
    saveTag(index, tag) {
      tag = this.createTag(tag);
      if (!tag.valid) this.$emit('adding-invalid-tag', tag);
      if (!tag.valid && this.hasForbiddingAddRule(tag.classes)) return;
      this.$set(this.tagsCopy, index, tag);
      this.toggleEdit(index);
      this.$emit('tags-changed', this.tagsCopy);
    },
    hasForbiddingAddRule(classes) {
      const validation = classes.split(' ');
      return validation.some(type => {
        const rule = this.validation.find(rule => type === rule.type);
        return rule ? rule.disableAdd : false;
      });
    },
    performAddTag(newTag) {
      if (!this._events['before-adding-tag']) this.addTag(newTag);
      this.$emit('before-adding-tag', {
        tag: newTag,
        addTag: (goOn) => this.addTag(newTag, goOn),
      });
    },
    addTag(newTag, goOn) {
      if (goOn === false) return;
      if (this.maxTags && this.maxTags === this.tags.length) return;
      let tag = this.clone(newTag);
      if (typeof newTag === 'string') tag = { text: newTag };
      const tags = this.clone(this.tags);
      tag = this.createTag(tag);
      if (!tag.valid) this.$emit('adding-invalid-tag', tag);
      if (!tag.valid && this.hasForbiddingAddRule(tag.classes)) return;
      tags.push(tag);
      this.$emit('tags-changed', tags);
    },
    updateNewTag(ievent) {
      const value = ievent.target.value;
      this.newTag = value;
      this.$emit('input', value);
    },
    initTags() {
      this.tagsCopy = this.clone(this.tags.map(t => this.createTag(t)));
      this.tagsEditStatus = this.clone(this.tags).map(() => false);
    },
  },
  watch:{
    value(newValue){
      this.newTag = newValue;
    },
    tags: {
      handler() {
        this.initTags();
      },
      deep: true,
    },
  },
  mounted() {
    this.newTag = this.value;
    this.initTags();
  },
};
</script>

<style scoped lang="scss">
@import '~colors';

</style>
