<template lang="html">
  <div class="vue-tags-input">
    <div class="input">
      <ul class="tags" v-if="tagsCopy">
        <li
          v-for="(tag, index) in tagsCopy"
          :key="index"
          class="tag"
          :class="[tag.tiClasses, tag.classes]">
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
              @input="createdChangedTag(index, tag)"
              @blur="cancelChanging(index)"
              @keydown.enter="performSaveTag(index, tag)"
            />
          </div>
          <div class="actions">
            <svg @click="cancelChanging(index)" v-if="tagsEditStatus[index]" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
              version="1.1" x="0px" y="0px" viewBox="0 0 436.48 436.48" xml:space="preserve">
              <path d="M224,143.573c-56.427,0-107.84,21.013-147.2,55.467L0,122.24v192h192l-77.12-77.12 c29.547-24.853,67.413-40.213,109.12-40.213c75.627,0,139.627,49.173,162.027,117.333l50.453-16.64 C407.147,208.213,323.2,143.573,224,143.573z" />
            </svg>
            <svg @click="performDeleteTag(index, tag)" v-else class="delete" xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" viewBox="0 0 357 357" xml:space="preserve">
              <polygon points="357,35.7 321.3,0 178.5,142.8 35.7,0 0,35.7 142.8,178.5 0,321.3 35.7,357 178.5,214.2 321.3,357 357,321.3 214.2,178.5" />
            </svg>
          </div>
        </li>
      </ul>
      <input
        class="new-tag-input"
        :class="[createTiClasses(newTag)]"
        v-bind="$attrs"
        type="text"
        size="1"
        ref="newTagInput"
        @paste="addFromPaste"
        :placeholder="placeholder"
        v-model="newTag"
        :maxlength="maxlength"
        @keydown.enter="performAddTags(newTag, 'input')"
        @input="updateNewTag"
      />
    </div>
    <div class="autocomplete">
      <ul>
        <li
          v-for="(item, index) in filteredAutocompleteItems"
          :key="index"
          class="item"
          :class="[item.tiClasses, item.classes]"
          @click="performAddTags(item, 'autocomplete')">
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
    seperators: {
      type: Array,
      default: () => [';'],
    },
    tagsFilterDuplicates: {
      type: Boolean,
      default: true,
    },
    addTagsFromPaste: {
      type: Boolean,
      default: true,
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
      return items.filter(i => !this.tagsCopy.find(t => t.text === i.text));
    },
  },
  methods: {
    addFromPaste() {
      if (!this.addTagsFromPaste) return;
      setTimeout(() => this.performAddTags(this.newTag), 10);
    },
    toggleEdit(index) {
      if (!this.allowEditTags) return;
      this.$set(this.tagsEditStatus, index, !this.tagsEditStatus[index]);
    },
    clone(items) {
      return JSON.parse(JSON.stringify(items));
    },
    validateUserRuls(text) {
      return this.validation
        .filter(val => !new RegExp(val.rule).test(text))
        .map(val => val.type);
    },
    createdChangedTag(index, tag) {
      this.$set(this.tagsCopy, index, this.createTag(tag, true));
    },
    createTiClasses(text, checkDuplicatesFromInside) {
      const validation = this.validateUserRuls(text);
      let d = '';
      if (checkDuplicatesFromInside) {
        if (this.tags.filter(t => t.text === text).length > 1) d = 'duplicate ';
      } else {
        if (this.tags.map(t => t.text).includes(text)) d = 'duplicate ';
      }
      const valid = validation.length === 0;
      return `${d}${validation.join(' ')}${valid ? 'valid' : ' invalid'}`;
    },
    createTag(tag, checkDuplicatesFromTags) {
      const t = this.clone(tag);
      t.tiClasses = this.createTiClasses(t.text, checkDuplicatesFromTags);
      t.valid = this.validateUserRuls(t.text).length === 0;
      return t;
    },
    focus() {
      this.$nextTick(() => this.$refs.tagInput[0].focus());
    },
    quote(regex) {
      return regex.replace(/([()[{*+.$^\\|?])/g, '\\$1');
    },
    cancelChanging(index) {
      this.tagsCopy[index] = Object.assign({}, this.createTag(this.tags[index], true));
      this.$set(this.tagsEditStatus, index, false);
    },
    hasForbiddingAddRule(tiClasses) {
      const validation = tiClasses.split(' ');
      return validation.some(type => {
        const rule = this.validation.find(rule => type === rule.type);
        return rule ? rule.disableAdd : false;
      });
    },
    createTagTexts(string) {
      const regex = new RegExp(this.seperators.map(s => this.quote(s)).join('|'));
      return string.split(regex).map(text => {
        return { text };
      });
    },
    performDeleteTag(index, tag) {
      if (!this._events['before-deleting-tag']) this.deleteTag(index);
      this.$emit('before-deleting-tag', {
        index,
        tag,
        deleteTag: (goOn) => this.deleteTag(index, goOn),
      });
    },
    deleteTag(index, goOn) {
      if (goOn === false) return;
      this.tagsCopy.splice(index, 1);
      this.$emit('tags-changed', this.tagsCopy);
    },
    performAddTags(tag) {
      let tags = [];
      if (typeof tag === 'object') tags = [tag];
      if (typeof tag === 'string') tags = this.createTagTexts(tag);
      tags.forEach(tag => {
        tag = this.createTag(tag);
        if (!this._events['before-adding-tag']) this.addTag(tag);
        this.$emit('before-adding-tag', {
          tag,
          addTag: (goOn) => this.addTag(tag, goOn),
        });
      });
    },
    addTag(tag, goOn) {
      if (tag.text.length === 0) return;
      if (goOn === false) return;
      const maximumReached = this.maxTags && this.maxTags === this.tagsCopy.length;
      if (maximumReached) return this.$emit('max-tags-reached', tag);
      const dup = this.tagsFilterDuplicates && this.tagsCopy.map(t => t.text).includes(tag.text);
      if (dup) return this.$emit('duplicate', tag);
      if (!tag.valid && this.hasForbiddingAddRule(tag.tiClasses)) return;
      this.$emit('input', '');
      this.tagsCopy.push(tag);
      this.$emit('tags-changed', this.tagsCopy);
    },
    performSaveTag(index, tag) {
      if (!this._events['before-saving-tag']) this.saveTag(index, tag);
      this.$emit('before-saving-tag', {
        index,
        tag,
        saveTag: (goOn) => this.saveTag(index, tag, goOn),
      });
    },
    saveTag(index, tag, goOn) {
      if (tag.text.length === 0) return;
      if (goOn === false) return;
      const dup = this.tagsFilterDuplicates && this.tagsCopy.map(t => t.text).includes(tag.text);
      if (dup) return this.$emit('duplicate', tag);
      if (!tag.valid && this.hasForbiddingAddRule(tag.tiClasses)) return;
      this.$set(this.tagsCopy, index, tag);
      this.toggleEdit(index);
      this.$emit('tags-changed', this.tagsCopy);
    },
    updateNewTag(ievent) {
      const value = ievent.target.value;
      this.newTag = value;
      this.$emit('input', value);
    },
    initTags() {
      this.tagsCopy = this.clone(this.tags.map(t => this.createTag(t, true)));
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

  span {
    white-space: pre;
  }

  span.hidden {
    padding-left: 14px;
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
