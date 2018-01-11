<template lang="html">
  <div class="vue-tags-input" :class="{ disabled }">
    <div class="input">
      <ul class="tags" v-if="tagsCopy">
        <li
          v-for="(tag, index) in tagsCopy"
          :key="index"
          class="tag"
          @click="$emit('tag-clicked', { tag, index })"
          :style="tag.style"
          :class="[tag.tiClasses, tag.classes, { 'deletion-mark': isMarked(index) }]">
          <div class="content">
            <div
              class="tag-left"
              v-if="$scopedSlots.tagLeft">
              <slot
                name="tagLeft"
                :tag="tag"
                :index="index"
                :edit="tagsEditStatus[index]"
                :perform-save-edit="performSaveTag"
                :perform-delete="performDeleteTag"
                :perform-cancel-edit="cancelEdit"
                :perform-open-edit="performEditTag"
                :deletion-mark="isMarked(index)">
              </slot>
            </div>
            <div class="tag-center">
              <span
                @click="performEditTag(index)"
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
                @blur="cancelEdit(index)"
                @keydown.enter="performSaveTag(index)"
              />
            </div>
            <div
              v-if="$scopedSlots.tagRight"
              class="tag-right">
              <slot
                name="tagRight"
                :tag="tag"
                :index="index"
                :edit="tagsEditStatus[index]"
                :perform-save-edit="performSaveTag"
                :perform-delete="performDeleteTag"
                :perform-cancel-edit="cancelEdit"
                :perform-open-edit="performEditTag"
                :deletion-mark="isMarked(index)">
              </slot>
            </div>
          </div>
          <div class="actions">
            <!-- down use v-if and v-else here -> different event calling when click -->
            <i
              @click="cancelEdit(index)"
              v-if="!$scopedSlots.tagActions"
              v-show="tagsEditStatus[index]"
              class="icon-undo">
            </i>
            <i
              @click="performDeleteTag(index)"
              v-if="!$scopedSlots.tagActions"
              v-show="!tagsEditStatus[index]"
              class="icon-close">
            </i>
            <slot
              v-if="$scopedSlots.tagActions"
              :tag="tag"
              :index="index"
              :edit="tagsEditStatus[index]"
              :perform-save-edit="performSaveTag"
              :perform-delete="performDeleteTag"
              :perform-cancel-edit="cancelEdit"
              :perform-open-edit="performEditTag"
              :deletion-mark="isMarked(index)"
              name="tagActions">
            </slot>
          </div>
        </li>
        <li class="new-tag-input-wrapper">
          <input
            class="new-tag-input"
            :class="[createClasses(newTag, tags, validation)]"
            v-bind="$attrs"
            type="text"
            size="1"
            ref="newTagInput"
            @paste="addFromPaste"
            :placeholder="placeholder"
            v-model="newTag"
            :maxlength="maxlength"
            @keydown.enter="performAddTags(newTag)"
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
    <slot name="between-elements"></slot>
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
          :style="item.style"
          :class="[
            item.tiClasses,
            item.classes,
            { 'selected-item': isSelected(index) }
          ]">
          <div
            @click="performAddTags(item)"
            v-if="!$scopedSlots.autocompleteItem">{{ item.text }}
          </div>
          <slot
            v-else
            :item="item"
            :index="index"
            :perform-add="performAddTags"
            :selected="isSelected(index)"
            name="autocompleteItem">
          </slot>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { createTags, createTag, createClasses } from './create-tags';

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
      default: () => [],
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
    avoidAddingDuplicates: {
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
      createClasses,
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
      const items = this.autocompleteItems.map(i => createTag(i, this.tags, this.validation));
      if (!this.autocompleteFilterDuplicates) return items;
      return items.filter(i => !this.tagsCopy.find(t => t.text === i.text));
    },
  },
  methods: {
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
    performEditTag(index) {
      if (!this.allowEditTags) return;
      if (!this._events['before-editing-tag']) this.editTag(index);
      this.$emit('before-editing-tag', {
        index,
        tag: this.tagsCopy[index],
        editTag: (goOn) => this.editTag(index, goOn),
      });
    },
    editTag(index, goOn) {
      if (!this.allowEditTags || goOn === false) return;
      this.toggleEdit(index);
      this.focus();
    },
    toggleEdit(index) {
      if (!this.allowEditTags || this.disabled) return;
      this.$set(this.tagsEditStatus, index, !this.tagsEditStatus[index]);
    },
    clone(items) {
      return JSON.parse(JSON.stringify(items));
    },
    createdChangedTag(index, tag) {
      this.$set(this.tagsCopy, index, createTag(tag, this.tags, this.validation, true));
    },
    focus() {
      this.$nextTick(() => this.$refs.tagInput[0].focus());
    },
    quote(regex) {
      return regex.replace(/([()[{*+.$^\\|?])/g, '\\$1');
    },
    cancelEdit(index) {
      this.tagsCopy[index] = Object.assign({},
        createTag(this.tags[index], this.tags, this.validation, true)
      );
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
    performDeleteTag(index) {
      if (!this._events['before-deleting-tag']) this.deleteTag(index);
      this.$emit('before-deleting-tag', {
        index,
        tag: this.tagsCopy[index],
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
        tag = createTag(tag, this.tags, this.validation);
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
      const dup = this.avoidAddingDuplicates && this.tagsCopy.map(t => t.text).includes(tag.text);
      if (dup) return this.$emit('adding-duplicate', tag);
      if (!tag.valid && this.hasForbiddingAddRule(tag.tiClasses)) return;
      if (this.addOnlyFromAutocomplete && this.filteredAutocompleteItems.length > 0) {
        this.selectedItem = 0;
      } else this.selectedItem = null;
      this.$emit('input', '');
      this.tagsCopy.push(tag);
      this.$emit('tags-changed', this.tagsCopy);
    },
    performSaveTag(index) {
      if (!this._events['before-saving-tag']) this.saveTag(index, this.tagsCopy[index]);
      this.$emit('before-saving-tag', {
        index,
        tag: this.tagsCopy[index],
        saveTag: (goOn) => this.saveTag(index, this.tagsCopy[index], goOn),
      });
    },
    saveTag(index, tag, goOn) {
      if (tag.text.length === 0) return;
      if (goOn === false) return;
      const dup = this.avoidAddingDuplicates && this.tags.map(t => t.text).includes(tag.text);
      if (dup) return this.$emit('saving-duplicate', tag);
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
      this.tagsCopy = createTags(this.tags, this.validation, true);
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

@font-face {
  font-family: 'icomoon';
  src:  url('../assets/fonts/custom/icomoon.eot?7grlse');
  src:  url('../assets/fonts/custom/icomoon.eot?7grlse#iefix') format('embedded-opentype'),
    url('../assets/fonts/custom/icomoon.ttf?7grlse') format('truetype'),
    url('../assets/fonts/custom/icomoon.woff?7grlse') format('woff');
  font-weight: normal;
  font-style: normal;
}

[class^="icon-"], [class*=" icon-"] {
  font-family: 'icomoon' !important;
  speak: none;
  font-style: normal;
  font-weight: normal;
  font-variant: normal;
  text-transform: none;
  line-height: 1;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.icon-check:before {
  content: "\e902";
}
.icon-close:before {
  content: "\e901";
}
.icon-undo:before {
  content: "\e900";
}

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
  background-color: $primary;
  color: #fff;
  border-radius: 2px;
  display: flex;
  padding: 3px 5px;
  margin: 2px;
  font-size: .85em;

  .content {
    display: flex;
    align-items: center;
  }

  .tag-center {
    position: relative;
  }

  span.hidden {
    padding-left: 15px;
    visibility: hidden;
    height: 0px;
  }

  .actions{
    margin-left: 2px;
    display: flex;
    align-items: center;
    font-size: 1.2em;

    i {
      cursor: pointer;
    }
  }

  &:last-child {
    margin-right: 4px;
  }

  &.invalid, &.tag.deletion-mark {
    background-color: $error;
  }
}

.tag-input {
  background-color: transparent;
  color: inherit;
  border: none;
  padding: 0px;
  margin: 0px;
  display: flex;
  top: 0px;
  position: absolute;
  width: 100%;
}

.tag-input::-ms-clear {
  display: none;
}

.new-tag-input-wrapper {
  display: flex;
  flex: 1 0 auto;
  padding: 3px 5px;
  margin: 2px;
  font-size: .85em;

  input {
    flex: 1 0 auto;
    min-width: 100px;
    border: none;
    padding: 0px;
    margin: 0px;
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
  > div {
    cursor: pointer;
    padding: 3px 6px;
    width: 100%;
  }
}

.selected-item {
  background-color: $primary;
  color: #fff;
}
</style>
