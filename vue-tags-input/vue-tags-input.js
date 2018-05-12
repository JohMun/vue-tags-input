import { createTags, createTag, createClasses } from './create-tags';
import TagInput from './tag-input';
import props from './vue-tags-input.props';

export default {
  name: 'VueTagsInput',
  components: {
    TagInput,
  },
  props,
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
      return this.newTag !== null &&
        this.newTag.length >= this.autocompleteMinLength &&
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
    selectDefaultItem() {
      if (this.addOnlyFromAutocomplete && this.filteredAutocompleteItems.length > 0) {
        this.selectedItem = 0;
      } else this.selectedItem = null;
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
        editTag: () => this.editTag(index),
      });
    },
    editTag(index) {
      if (!this.allowEditTags) return;
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
      if (!this.tags[index]) return;
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
        deleteTag: () => this.deleteTag(index),
      });
    },
    deleteTag(index) {
      if (this.disabled) return;
      this.deletionMark = null;
      clearTimeout(this.deletionMarkTime);
      this.tagsCopy.splice(index, 1);
      this.$emit('tags-changed', this.tagsCopy);
    },
    noTriggerKey(event, category) {
      const triggerKey = this[category].indexOf(event.keyCode) !== -1;
      if (triggerKey) event.preventDefault();
      return !triggerKey;
    },
    performAddTags(tag, event) {
      if (this.disabled || event && this.noTriggerKey(event, 'addOnKey')) return;
      if (typeof tag === 'string' && tag.trim().length === 0) return;
      let tags = [];
      if (typeof tag === 'object') tags = [tag];
      if (typeof tag === 'string') tags = this.createTagTexts(tag);
      tags.forEach(tag => {
        tag = createTag(tag, this.tags, this.validation, false);
        if (!this._events['before-adding-tag']) this.addTag(tag);
        this.$emit('before-adding-tag', {
          tag,
          addTag: () => this.addTag(tag),
        });
      });
    },
    addTag(tag) {
      const options = this.filteredAutocompleteItems.map(i => i.text);
      if (this.addOnlyFromAutocomplete && options.indexOf(tag.text) === -1) return;
      const maximumReached = this.maxTags && this.maxTags === this.tagsCopy.length;
      if (maximumReached) return this.$emit('max-tags-reached');
      const dup = this.avoidAddingDuplicates &&
        this.tagsCopy.map(t => t.text).indexOf(tag.text) !== -1;
      if (dup) return this.$emit('adding-duplicate', tag);
      if (!tag.valid && this.hasForbiddingAddRule(tag.tiClasses)) return;
      this.$nextTick(() => {
        this.newTag = '';
        this.$emit('input', '');
        this.tagsCopy.push(tag);
        this.$emit('tags-changed', this.tagsCopy);
      });
    },
    performSaveTag(index, event) {
      if (event && this.noTriggerKey(event, 'saveOnKey')) return;
      const tag = this.tagsCopy[index];
      if (this.disabled) return;
      if (tag.text.trim().length === 0) return;
      if (!this._events['before-saving-tag']) this.saveTag(index, tag);
      this.$emit('before-saving-tag', {
        index,
        tag,
        saveTag: () => this.saveTag(index, tag),
      });
    },
    saveTag(index, tag) {
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
    blurred(e) {
      // if the click occur on tagsinput -> dont hide
      if (this.$el.contains(e.target)) return;

      // if we should add tags before blur -> add tag
      if (this.addOnBlur && this.focused) this.performAddTags(this.newTag);

      // hide tagsinput
      this.focused = false;
    },
  },
  watch: {
    value(newValue){
      // if v-model change outside, update newTag here
      if (!this.addOnlyFromAutocomplete) this.selectedItem = null;
      this.newTag = newValue;
    },
    tags: {
      handler() {
        this.initTags();
      },
      deep: true,
    },
    autocompleteOpen() {
      this.selectDefaultItem();
    },
  },
  created() {
    this.newTag = this.value;
    this.initTags();
  },
  mounted() {
    this.selectDefaultItem();
    document.addEventListener('click', this.blurred);
  },
  destroyed() {
    document.removeEventListener('click', this.blurred);
  },
};
