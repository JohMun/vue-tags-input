<template lang="html">
  <div class="vue-tags-input" :class="{ disabled }">
    <div class="input">
      <ul class="tags" v-if="tagsCopy">
        <li
          v-for="(tag, index) in tagsCopy"
          :key="index"
          class="tag"
          :class="[tag.tiClasses, tag.classes, { 'deletion-mark': isMarked(index) }]">
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
            <svg @click="cancelChanging(index)" v-if="tagsEditStatus[index]"
              xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
              version="1.1" x="0px" y="0px" viewBox="0 0 436.48 436.48" xml:space="preserve">
              <path d="M224,143.573c-56.427,0-107.84,21.013-147.2,55.467L0,
                122.24v192h192l-77.12-77.12c29.547-24.853,67.413-40.213,109.12-40.213c75.627,0,
                139.627,49.173,162.027,117.333l50.453-16.64
                C407.147,208.213,323.2,143.573,224,143.573z" />
            </svg>
            <svg @click="performDeleteTag(index, tag)" v-else class="delete"
              xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
              version="1.1" x="0px" y="0px" viewBox="0 0 357 357" xml:space="preserve">
              <polygon points="357,35.7 321.3,0 178.5,142.8 35.7,0 0,35.7
                142.8,178.5 0,321.3 35.7,357 178.5,214.2 321.3,357 357,321.3 214.2,178.5" />
            </svg>
          </div>
        </li>
        <li class="new-tag-input">
          <input
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
            @keydown.8="invokeDelete"
            @keydown.38="selectItem($event, 'before')"
            @keydown.40="selectItem($event, 'after')"
            @input="updateNewTag"
            @focus="focused = true"
            @click="addOnlyFromAutocomplete ? false: selectedItem = null"
            :disabled="disabled"
          />
        </li>
      </ul>
    </div>
    <div
      class="autocomplete"
      @mouseout="selectedItem = null"
      v-if="autocompleteOpen">
      <ul>
        <li
          v-for="(item, index) in filteredAutocompleteItems"
          :key="index"
          class="item"
          @mouseover="disabled ? false : selectedItem = index"
          :class="[
            item.tiClasses,
            item.classes,
            { 'selected-item': isSelected(index) }
          ]"
          @click="performAddTags(item, 'autocomplete')">
          {{ item.text }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
const propValidatorTag = value => {
  return !value.some(t => {
    const invalidText = !t.text;
    if (invalidText) console.warn('Missing property "text"', t);

    let invalidClasses = false;
    if (t.classes) invalidClasses = typeof t.classes !== 'string';
    if (invalidClasses) console.warn('Property "classes" must be type of string', t);

    return invalidText || invalidClasses;
  });
};

export default {
  name: 'VueTagsInput',
  props: {
    value: {
      type: String,
      default: '',
      required: true,
    },
    tags: {
      type: Array,
      default: () => [],
      validator(value) {
        return propValidatorTag(value);
      },
    },
    autocompleteItems: {
      type: Array,
      default: () => [],
      validator(value) {
        return propValidatorTag(value);
      },
    },
    allowEditTags: {
      type: Boolean,
      default: false,
    },
    autocompleteFilterDuplicates: {
      default: true,
      type: Boolean,
    },
    addOnlyFromAutocomplete: {
      type: Boolean,
      default: false,
    },
    autocompleteMinLength: {
      type: Number,
      default: 1,
    },
    autocompleteAlwaysOpen: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
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
      validator(value) {
        return !value.some(v => {
          const missingRule = !v.rule;
          if (missingRule) console.warn('Property "rule" is missing', v);

          const invalidRule = v.rule && typeof v.rule !== 'string';
          if (invalidRule) console.warn('A rule must be type of string. Found:', v);

          const missingType = !v.type;
          if (missingType) console.warn('Property "type" is missing', v);

          const invalidType = v.type && typeof v.type !== 'string';
          if (invalidType) console.warn('Property "type" must be type of string. Found:', v);

          return invalidRule || missingRule || missingType || invalidType;
        });
      },
    },
    separators: {
      type: Array,
      default: () => [';'],
      validator(value) {
        return !value.some(s => {
          const invalidType = typeof s !== 'string';
          if (invalidType) console.warn('Separators must be type of string. Found:', s);
          return invalidType;
        });
      },
    },
    tagsFilterDuplicates: {
      type: Boolean,
      default: true,
    },
    addTagsFromPaste: {
      type: Boolean,
      default: true,
    },
    deleteOnBackslash: {
      default: true,
      type: Boolean,
    },
  },
  data() {
    return {
      newTag: null,
      tagsCopy: null,
      tagsEditStatus: null,
      deletionMark: null,
      deletionMarkTime: null,
      selectedItem: null,
      focused: null,
    };
  },
  computed: {
    autocompleteOpen() {
      if (this.autocompleteAlwaysOpen) return true;
      return this.newTag.length >= this.autocompleteMinLength &&
        this.filteredAutocompleteItems.length > 0 &&
        this.focused;
    },
    filteredAutocompleteItems() {
      const items = this.autocompleteItems.map(i => this.createTag(i));
      if (!this.autocompleteFilterDuplicates) return items;
      return items.filter(i => !this.tagsCopy.find(t => t.text === i.text));
    },
  },
  methods: {
    test() {
      console.log('test');
    },
    findIndex(array, predicate) {
      let index = -1;
      while (++index < array.length) {
        if (predicate(array[index], index, array)) return index;
      }
      return -1;
    },
    getSelectedIndex(methods) {
      const items = this.filteredAutocompleteItems;
      if (items.length === 0) return;
      if (this.selectedItem === null) return 0;
      let index = 0;
      if (methods === 'before' && this.selectedItem === 0) index = items.length - 1;
      else if (methods === 'after' && this.selectedItem === items.length - 1) index = 0;
      else methods === 'after' ? index = this.selectedItem + 1 : index = this.selectedItem - 1;
      return index;
    },
    selectItem(e, method) {
      e.preventDefault();
      this.selectedItem = this.getSelectedIndex(method);
    },
    isSelected(index) {
      return this.selectedItem === index;
    },
    isMarked(index) {
      return this.deletionMark === index;
    },
    invokeDelete() {
      if (!this.deleteOnBackslash || this.newTag.length > 0) return;
      const lastIndex = this.tagsCopy.length - 1;
      if (this.deletionMark === null) {
        this.deletionMarkTime = setTimeout(() => this.deletionMark = null, 1000);
        this.deletionMark = lastIndex;
      } else this.performDeleteTag(lastIndex);
    },
    addFromPaste() {
      if (!this.addTagsFromPaste) return;
      setTimeout(() => this.performAddTags(this.newTag), 10);
    },
    toggleEdit(index) {
      if (!this.allowEditTags || this.disabled) return;
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
      this.$set(this.tagsCopy, index, this.createTag(tag));
    },
    createTiClasses(text, checkDuplicatesFromInside) {
      const validation = this.validateUserRuls(text);
      if (checkDuplicatesFromInside) {
        if (this.tags.filter(t => t.text === text).length > 1) validation.push('duplicate');
      } else {
        if (this.tags.map(t => t.text).includes(text)) validation.push('duplicate');
      }
      validation.length === 0 ? validation.push('valid') : validation.push('invalid');
      return validation;
    },
    createTag(tag, checkDuplicatesFromTags) {
      const t = this.clone(tag);
      t.tiClasses = this.createTiClasses(t.text, checkDuplicatesFromTags);
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
      return tiClasses.some(type => {
        const rule = this.validation.find(rule => type === rule.type);
        return rule ? rule.disableAdd : false;
      });
    },
    createTagTexts(string) {
      const regex = new RegExp(this.separators.map(s => this.quote(s)).join('|'));
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
      if (this.disabled) return;
      this.deletionMark = null;
      clearTimeout(this.deletionMarkTime);
      this.tagsCopy.splice(index, 1);
      this.$emit('tags-changed', this.tagsCopy);
    },
    performAddTags(tag) {
      let tags = [];
      if (typeof tag === 'object') tags = [tag];
      if (typeof tag === 'string') tags = this.createTagTexts(tag);
      if (this.selectedItem !== null) tags = [this.filteredAutocompleteItems[this.selectedItem]];
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
      if (this.disabled) return;
      const options = this.filteredAutocompleteItems.map(i => i.text);
      if (this.addOnlyFromAutocomplete && !options.includes(tag.text)) return;
      const maximumReached = this.maxTags && this.maxTags === this.tagsCopy.length;
      if (maximumReached) return this.$emit('max-tags-reached', tag);
      const dup = this.tagsFilterDuplicates && this.tagsCopy.map(t => t.text).includes(tag.text);
      if (dup) return this.$emit('duplicate', tag);
      if (!tag.valid && this.hasForbiddingAddRule(tag.tiClasses)) return;
      if (this.addOnlyFromAutocomplete && this.filteredAutocompleteItems.length > 0) {
        this.selectedItem = 0;
      } else this.selectedItem = null;
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
      const dup = this.tagsFilterDuplicates && this.tags.map(t => t.text).includes(tag.text);
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
  watch: {
    value(newValue){
      if (!this.addOnlyFromAutocomplete) this.selectedItem = null;
      this.newTag = newValue;
    },
    tags: {
      handler() {
        this.initTags();
      },
      deep: true,
    },
    autocompleteItems() {
      if (this.filteredAutocompleteItems.length > 0) {
        if (this.addOnlyFromAutocomplete) this.selectedItem = 0;
      } else this.selectedItem = null;
    },
  },
  created() {
    this.newTag = this.value;
    this.initTags();
  },
  mounted() {
    document.addEventListener('click', () => this.focused = false);
    this.$el.addEventListener('click', event => event.stopPropagation());
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

input[disabled] {
  background-color: transparent;
}

.vue-tags-input {
  max-width: 450px;
  position: relative;
}

.vue-tags-input.vue-tags-input.disabled {
  opacity: 0.6;

  * {
    cursor: default;
  }
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
  width: 100%;
}

.tag {
  display: flex;
  align-items: center;
  border-radius: 2px;
  padding: 4px;
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

    svg {
      cursor: pointer;
    }
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

  &.invalid, &.tag.deletion-mark {
    background-color: $error;
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
  display: flex;
  flex: 1 0 auto;

  input {
    flex: 1 0 auto;
    min-width: 100px;
    border: none;
    margin: 2px;
    background-color: #fff;
  }
}

.autocomplete {
  border: 1px solid #ccc;
  border-top: none;
  position: absolute;
  width: 100%;
  background-color: #fff;
}

.item {
  padding: 3px 6px;
  cursor: pointer;
}

.selected-item {
  background-color: $primary;
  color: #fff;
}
</style>
