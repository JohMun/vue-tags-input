<template lang="html">
  <div class="vue-tags-input">
    <div class="input">
      <ul class="tags" v-if="tagsCopy">
        <li
          v-for="(tag, index) in tagsCopy"
          :key="index"
          class="tag"
          :class="[tag.classes]">
          <div class="content">
            <span
              @click="toggleEdit(index); focus()"
              :class="{ hidden: tagsEditStatus[index] }">{{ tag.text }}</span>
            <input
              type="text"
              class="tag-input"
              v-if="tagsEditStatus[index]"
              :maxlength="maxlength"
              size="1"
              ref="tagInput"
              v-model="tag.text"
              @input="validateChangedTag(index, tag)"
              @blur="cancelChanging(index)"
              @keydown.enter="saveTag(index, tag)"
            />
          </div>
          <div class="actions">
            <svg @click="cancelChanging(index)" v-if="tagsEditStatus[index]" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
              version="1.1" x="0px" y="0px" viewBox="0 0 436.48 436.48" xml:space="preserve">
              <path d="M224,143.573c-56.427,0-107.84,21.013-147.2,55.467L0,122.24v192h192l-77.12-77.12 c29.547-24.853,67.413-40.213,109.12-40.213c75.627,0,139.627,49.173,162.027,117.333l50.453-16.64 C407.147,208.213,323.2,143.573,224,143.573z" />
            </svg>
            <svg @click="performDeleteTag(index)" v-else class="delete" xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" viewBox="0 0 357 357" xml:space="preserve">
              <polygon points="357,35.7 321.3,0 178.5,142.8 35.7,0 0,35.7 142.8,178.5 0,321.3 35.7,357 178.5,214.2 321.3,357 357,321.3 214.2,178.5" />
            </svg>
          </div>
        </li>
      </ul>
      <input
        class="new-tag-input"
        v-bind="$attrs"
        type="text"
        size="1"
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
    performDeleteTag() {
      // check if hook is registered and do stuff
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
      this.$emit('input', '');
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

ul {
  margin: 0px;
  padding: 0px;
  list-style-type: none;
}

*, *:before, *:after {
  box-sizing: border-box;
}

input:focus {
  outline: none;
}

.input {
  border: 1px solid #ccc;
  display: flex;
  padding: 4px;
  flex-wrap: wrap;
}

.tags {
  display: flex;
  flex-wrap: wrap;
}

.tag {
  display: flex;
  align-items: center;
  border-radius: 2px;
  padding: 3px 4px;
  background-color: $primary;
  color: #fff;
  margin: 2px;

  .content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    font-size: 12px;
  }

  span.hidden {
    padding-right: 15px;
    visibility: hidden;
    height: 0px;
  }

  .actions{
    margin-left: 5px;
    display: flex;
    align-items: center;
  }

  &:last-child {
    margin-right: 4px;
  }

  svg {
    display: flex;
    fill: #fff;
    height: 14px;
    width: 14px;
  }

  .delete {
    width: 10px;
  }
}

.tag-input {
  background-color: transparent;
  border: none;
  color: #fff;
  padding: 0px;
  margin: 0px;
  display: flex;
}

.tag-input::-ms-clear {
  display: none;
}

.new-tag-input {
  flex: 1 0 auto;
  min-width: 100px;
  border: none;
  margin: 0 2px;
}
</style>
