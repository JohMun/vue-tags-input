<template lang="html">
  <div class="vue-tags-input" :class="{ disabled }">
    <div class="input">
      <ul class="tags" v-if="tagsCopy">
        <li
          :tabindex="index + 1"
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
            <div class="tag-center" ref="tagCenter">
              <span
                @click="performEditTag(index)"
                v-if="!$scopedSlots.tagCenter"
                :class="{ hidden: tagsEditStatus[index] }">{{ tag.text }}</span>
              <tag-input
                v-if="!$scopedSlots.tagCenter"
                :scope="{
                  edit: tagsEditStatus[index],
                  maxlength,
                  tag,
                  index,
                  validateTag: createChangedTag,
                  cancelEdit,
                  performSaveTag,
                }">
              </tag-input>
              <slot
                class="tag-center-slot"
                name="tagCenter"
                :tag="tag"
                :index="index"
                :maxlength="maxlength"
                :edit="tagsEditStatus[index]"
                :perform-save-edit="performSaveTag"
                :perform-delete="performDeleteTag"
                :perform-cancel-edit="cancelEdit"
                :validate-tag="createChangedTag"
                :cancel-edit="cancelEdit"
                :perform-save-tag="performSaveTag"
                :perform-open-edit="performEditTag"
                :deletion-mark="isMarked(index)">
              </slot>
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
            <!-- dont use v-if and v-else here -> different event calling when click -->
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
            :class="[createClasses(newTag, tags, validation, false)]"
            v-bind="$attrs"
            type="text"
            size="1"
            ref="newTagInput"
            @paste="addTagsFromPaste"
            :placeholder="placeholder"
            v-model="newTag"
            :maxlength="maxlength"
            @keydown.enter.prevent="performAddTags(
              filteredAutocompleteItems[selectedItem] || newTag
            )"
            @keydown.8="invokeDelete"
            @keydown.38="selectItem($event, 'before')"
            @keydown.40="selectItem($event, 'after')"
            @input="updateNewTag"
            @blur="$emit('blur', $event)"
            @focus="focused = true; $emit('focus', $event)"
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
import TagInput from './tag-input';

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
  components: {
    TagInput,
  },
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

          const validRule = v.rule && (
            typeof v.rule === 'string' ||
            v.rule instanceof RegExp ||
            {}.toString.call(v.rule) === '[object Function]'
          );

          if (!validRule) {
            console.warn(
              'A rule must be type of string, RegExp or function. Found:',
              JSON.stringify(v.rule)
            );
          }

          const missingType = !v.type;
          if (missingType) console.warn('Property "type" is missing', v);

          const invalidType = v.type && typeof v.type !== 'string';
          if (invalidType) console.warn('Property "type" must be type of string. Found:', v);

          return !validRule || missingRule || missingType || invalidType;
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
    addOnBlur: {
      type: Boolean,
      default: true,
    },
    addFromPaste: {
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
      const items = this.autocompleteItems.map(i => {
        return createTag(i, this.tags, this.validation, false);
      });
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
    addTagsFromPaste() {
      if (!this.addFromPaste) return;
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
      this.focus(index);
    },
    toggleEdit(index) {
      if (!this.allowEditTags || this.disabled) return;
      this.$set(this.tagsEditStatus, index, !this.tagsEditStatus[index]);
    },
    clone(items) {
      return JSON.parse(JSON.stringify(items));
    },
    createChangedTag(index) {
      const tags = this.tagsCopy;
      this.$set(this.tagsCopy, index, createTag(tags[index], tags, this.validation));
    },
    focus(index) {
      this.$nextTick(() => {
        const el = this.$refs.tagCenter[index].querySelector('input.tag-input');
        if (el) el.focus();
      });
    },
    quote(regex) {
      return regex.replace(/([()[{*+.$^\\|?])/g, '\\$1');
    },
    cancelEdit(index) {
      this.tagsCopy[index] = Object.assign({},
        createTag(this.tags[index], this.tags, this.validation)
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
      if (this.disabled) return;
      if (typeof tag === 'string' && tag.trim().length === 0) return;
      let tags = [];
      if (typeof tag === 'object') tags = [tag];
      if (typeof tag === 'string') tags = this.createTagTexts(tag);
      tags.forEach(tag => {
        tag = createTag(tag, this.tags, this.validation, false);
        if (!this._events['before-adding-tag']) this.addTag(tag);
        this.$emit('before-adding-tag', {
          tag,
          addTag: (goOn) => this.addTag(tag, goOn),
        });
      });
    },
    addTag(tag, goOn) {
      if (goOn === false) return;
      const options = this.filteredAutocompleteItems.map(i => i.text);
      if (this.addOnlyFromAutocomplete && options.indexOf(tag.text) === -1) return;
      const maximumReached = this.maxTags && this.maxTags === this.tagsCopy.length;
      if (maximumReached) return this.$emit('max-tags-reached');
      const dup = this.avoidAddingDuplicates &&
        this.tagsCopy.map(t => t.text).indexOf(tag.text) !== -1;
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
      const tag = this.tagsCopy[index];
      if (this.disabled) return;
      if (tag.text.trim().length === 0) return;
      if (!this._events['before-saving-tag']) this.saveTag(index, tag);
      this.$emit('before-saving-tag', {
        index,
        tag,
        saveTag: (goOn) => this.saveTag(index, tag, goOn),
      });
    },
    saveTag(index, tag, goOn) {
      if (goOn === false) return;
      const dup = this.avoidAddingDuplicates &&
        this.tagsCopy.filter(t => t.text === tag.text).length > 1;
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
      this.tagsCopy = createTags(this.tags, this.validation);
      this.tagsEditStatus = this.clone(this.tags).map(() => false);
    },
    blurred() {
      if (this.addOnBlur && this.focused) this.performAddTags(this.newTag);
      this.focused = false;
    },
    stopPropagation(event) {
      event.stopPropagation();
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
    document.addEventListener('click', this.blurred);
    this.$el.addEventListener('click', this.stopPropagation);
  },
  destroyed() {
    document.removeEventListener('click', this.blurred);
    this.$el.removeEventListener('click', this.stopPropagation);
  },
};
</script>

<style scoped lang="scss">
@import '~colors';

@font-face {
  font-family: 'icomoon';
  src:  url('./assets/fonts/icomoon.eot?7grlse');
  src:  url('./assets/fonts/icomoon.eot?7grlse#iefix') format('embedded-opentype'),
    url('./assets/fonts/icomoon.ttf?7grlse') format('truetype'),
    url('./assets/fonts/icomoon.woff?7grlse') format('woff');
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
  background-color: #fff;
}

.vue-tags-input.vue-tags-input.disabled {
  opacity: 0.5;

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

  &:focus {
    outline: none;
  }

  .content {
    display: flex;
    align-items: center;
  }

  .tag-center {
    position: relative;
  }

  span.hidden {
    padding-left: 16px;
    visibility: hidden;
    height: 0px;
  }

  .actions {
    margin-left: 2px;
    display: flex;
    align-items: center;
    font-size: 1.15em;

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
  }
}

.autocomplete {
  border: 1px solid #ccc;
  border-top: none;
  position: absolute;
  width: 100%;
  background-color: #fff;
  z-index: 20;
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

<style lang="scss">
.vue-tags-input .tag-center {
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

  input:focus {
    outline: none;
  }

  input[disabled] {
    background-color: transparent;
  }
}

</style>
