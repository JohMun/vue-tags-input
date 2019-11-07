// The file contains the main application logic
// data, computed properties, methods, watchers and the component lifecycle

import equal from 'fast-deep-equal';

import { createTags, createTag, createClasses, clone } from './create-tags';
import TagInput from './tag-input.vue';
import props from './vue-tags-input.props';

export default {
  name: 'VueTagsInput',
  components: { TagInput },
  props,
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
    // Property which calculates if the autocomplete should be opened or not
    autocompleteOpen() {
      if (this.autocompleteAlwaysOpen) return true;
      return this.newTag !== null
        && this.newTag.length >= this.autocompleteMinLength
        && this.filteredAutocompleteItems.length > 0
        && this.focused;
    },
    // Returns validated autocomplete items. Maybe duplicates are filtered out
    filteredAutocompleteItems() {
      const is = this.autocompleteItems.map(i => {
        return createTag(i, this.tags, this.validation, this.isDuplicate);
      });

      if (!this.autocompleteFilterDuplicates) return is;
      return is.filter(this.duplicateFilter);
    },
  },
  methods: {
    createClasses,
    // Returns the index which item should be selected, based on the parameter 'method'
    getSelectedIndex(method) {
      const items = this.filteredAutocompleteItems;
      const selectedItem = this.selectedItem;
      const lastItem = items.length - 1;
      if (items.length === 0) return;
      if (selectedItem === null) return 0;
      if (method === 'before' && selectedItem === 0) return lastItem;
      else if (method === 'after' && selectedItem === lastItem) return 0;
      else return method === 'after' ? selectedItem + 1 : selectedItem - 1;
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
    // Method which is called when the user presses backspace → remove the last tag
    invokeDelete() {
      // If we shouldn't delete tags on backspace or we have some characters in the input → stop
      if (!this.deleteOnBackspace || this.newTag.length > 0) return;
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
    // Method to call if a tag should switch to it's edit mode
    performEditTag(index) {
      if (!this.allowEditTags) return;
      if (!this._events['before-editing-tag']) this.editTag(index);
      /**
       * @description Emits before a tag toggles to it's edit mode
       * @name before-editing-tag
       * @property {events} hook
       * @returns {Object} Contains the to editing tag: 'tag'.
         The tag's index: 'index'. And a function: 'editTag'.
         If the function is invoked, the tag toggles to it's edit mode.
       */
      this.$emit('before-editing-tag', {
        index,
        tag: this.tagsCopy[index],
        editTag: () => this.editTag(index),
      });
    },
    // Opens the edit mode for a tag and focuses it
    editTag(index) {
      if (!this.allowEditTags) return;
      this.toggleEditMode(index);
      this.focus(index);
    },
    // Toggles the edit mode for a tag
    toggleEditMode(index) {
      if (!this.allowEditTags || this.disabled) return;
      this.$set(this.tagsEditStatus, index, !this.tagsEditStatus[index]);
    },
    // only called by the @input event from TagInput.
    // Creates a new tag model and applys it to this.tagsCopy[index]
    createChangedTag(index, event) {
      // If the text of a tag changes → we create a new one with a new validation.
      // we take the value from the event if possible, because on google android phones
      // this.tagsCopy[index].text is incorrect, when typing a space on the virtual keyboard.
      // yes, this sucks ...
      const tag = this.tagsCopy[index];
      tag.text = event ? event.target.value : this.tagsCopy[index].text;
      this.$set(this.tagsCopy, index,
        createTag(tag, this.tagsCopy, this.validation, this.isDuplicate)
      );
    },
    // Focuses the input of a tag
    focus(index) {
      this.$nextTick(() => {
        const el = this.$refs.tagCenter[index].querySelector('input.ti-tag-input');
        if (el) el.focus();
      });
    },
    quote(regex) {
      return regex.replace(/([()[{*+.$^\\|?])/g, '\\$1');
    },
    // Cancels the edit mode for a tag → resets the tag to it's original model!
    cancelEdit(index) {
      if (!this.tags[index]) return;
      this.tagsCopy[index] = clone(
        createTag(this.tags[index], this.tags, this.validation, this.isDuplicate)
      );
      this.$set(this.tagsEditStatus, index, false);
    },
    hasForbiddingAddRule(tiClasses) {
      // Does the tag has a rule, defined by the user, which prohibits adding?
      return tiClasses.some(type => {
        const rule = this.validation.find(rule => type === rule.classes);
        return rule ? rule.disableAdd : false;
      });
    },
    // Creates multiple tags out of a string, based on the prop separators
    createTagTexts(string) {
      const regex = new RegExp(this.separators.map(s => this.quote(s)).join('|'));
      return string.split(regex).map(text => ({ text }));
    },
    // Method to call to delete a tag
    performDeleteTag(index) {
      if (!this._events['before-deleting-tag']) this.deleteTag(index);
      /**
       * @description Emits before a tag is deleted
       * @name before-deleting-tag
       * @property {events} hook
       * @returns {Object} Contains the to editing tag: 'tag'. The tag's index: 'index'
         And a function: 'deleteTag'. If the function is invoked, the tag is deleted.
       */
      this.$emit('before-deleting-tag', {
        index,
        tag: this.tagsCopy[index],
        deleteTag: () => this.deleteTag(index),
      });
    },
    deleteTag(index) {
      if (this.disabled) return;
      this.deletionMark = null;

      // Clears the debounce for the deletion mark and removes the tag
      clearTimeout(this.deletionMarkTime);
      this.tagsCopy.splice(index, 1);

      // Special update for the parent if .sync is on
      if (this._events['update:tags']) this.$emit('update:tags', this.tagsCopy);

      /**
       * @description Emits if the tags array changes
       * @name tags-changed
       * @property {events}
       * @returns {Array} The modified tags array
       */
      this.$emit('tags-changed', this.tagsCopy);
    },
    // Decides wether the input keyCode is one, which is allowed to modify/add tags
    noTriggerKey(event, category) {
      const triggerKey = this[category].indexOf(event.keyCode) !== -1
        || this[category].indexOf(event.key) !== -1;
      if (triggerKey) event.preventDefault();
      return !triggerKey;
    },
    // Method to call to add a tag
    performAddTags(tag, event, source) {
      // If the input is disabled or the function was invoked by no trigger key → stop
      if (this.disabled || event && this.noTriggerKey(event, 'addOnKey')) return;

      // Convert the string or object into a tags array
      let tags = [];
      if (typeof tag === 'object') tags = [tag];
      if (typeof tag === 'string') tags = this.createTagTexts(tag);

      // Filter out the tags with no content
      tags = tags.filter(tag => tag.text.trim().length > 0);

      // The basic checks are done → try to add all tags
      tags.forEach(tag => {
        tag = createTag(tag, this.tags, this.validation, this.isDuplicate);
        if (!this._events['before-adding-tag']) this.addTag(tag, source);
        /**
         * @description Emits before a tag is added
         * @name before-adding-tag
         * @property {events} hook
         * @returns {Object} Contains the to editing tag: 'tag'. And a function: 'addTag'.
           If the function is invoked, the tag is added.
         */
        this.$emit('before-adding-tag', {
          tag,
          addTag: () => this.addTag(tag, source),
        });
      });
    },
    duplicateFilter(tag) {
      return this.isDuplicate
        ? !this.isDuplicate(this.tagsCopy, tag)
        : !this.tagsCopy.find(t => t.text === tag.text);
    },
    addTag(tag, source = 'new-tag-input') {
      // Check if we should only add items from autocomplete and if so,
      // does the tag exists as an option
      const options = this.filteredAutocompleteItems.map(i => i.text);
      if (this.addOnlyFromAutocomplete && options.indexOf(tag.text) === -1) return;

      // We use $nextTick here, because this.tagsCopy.length would be wrong if tags are added fast
      // like in a loop. With $nextTick we get the correct length value
      this.$nextTick(() => {
        // Maybe we should not add a tag because the maximum has reached already
        const maximumReached = this.maxTags && this.maxTags <= this.tagsCopy.length;

        /**
         * @description Emits if the maximum, the tags array is allowed to hold, is reached.
           The maximum can be defined by the prop 'max-tags'.
         * @name max-tags-reached
         * @property {events}
         * @returns {Object} The 'tag' which could not be added because of the length limitation.
         */
        if (maximumReached) return this.$emit('max-tags-reached', tag);

        // If we shouldn't add duplicates and that is one → stop
        const dup = this.avoidAddingDuplicates && !this.duplicateFilter(tag);
        /**
         * @description Emits if the user tries to add a duplicate to the tag's array
           and adding duplicates is prevented by the prop 'avoid-adding-duplicates'
         * @name adding-duplicate
         * @property {events}
         */
        if (dup) return this.$emit('adding-duplicate', tag);

        // If we find a rule which avoids that the tag is added → stop
        if (this.hasForbiddingAddRule(tag.tiClasses)) return;

        // Everything is okay → add the tag
        this.$emit('input', '');
        this.tagsCopy.push(tag);

        // Special update for the parent if .sync is on
        if (this._events['update:tags']) this.$emit('update:tags', this.tagsCopy);

        // if the tag was added by autocomplete, focus the input
        if (source === 'autocomplete') this.$refs.newTagInput.focus();

        this.$emit('tags-changed', this.tagsCopy);
      });
    },
    // Method to call to save a tag
    performSaveTag(index, event) {
      const tag = this.tagsCopy[index];

      // If the input is disabled or the function was invoked by no trigger key → stop
      if (this.disabled || event && this.noTriggerKey(event, 'addOnKey')) return;

      // If the tag has no content → stop
      if (tag.text.trim().length === 0) return;

      // The basic checks are done → try to save the tag
      if (!this._events['before-saving-tag']) this.saveTag(index, tag);
      /**
       * @description Emits before a tag is saved
       * @name before-saving-tag
       * @property {events} hook
       * @returns {Object} Contains the to editing tag: 'tag'.
         The tag's index: 'index'. And a function: 'saveTag'.
         If the function is invoked, the tag is saved.
       */
      this.$emit('before-saving-tag', {
        index,
        tag,
        saveTag: () => this.saveTag(index, tag),
      });
    },
    saveTag(index, tag) {
      // If we shouldn't save duplicates → stop
      if (this.avoidAddingDuplicates) {
        const tagsDiff = clone(this.tagsCopy);
        const inputTag = tagsDiff.splice(index, 1)[0];
        const dup = this.isDuplicate ?
          this.isDuplicate(tagsDiff, inputTag) :
          tagsDiff.map(t => t.text).indexOf(inputTag.text) !== -1;

        /**
         * @description Emits if the user tries to save a duplicate in the tag's array
           and saving duplicates is prevented by the prop 'avoid-adding-duplicates'
         * @name saving-duplicate
         * @property {events}
         */
        if (dup) return this.$emit('saving-duplicate', tag);
      }

      // If we find a rule which avoids that the tag is added → stop
      if (this.hasForbiddingAddRule(tag.tiClasses)) return;

      // Everything is okay → save the tag
      this.$set(this.tagsCopy, index, tag);
      this.toggleEditMode(index);

      // Special update for the parent if .sync is on
      if (this._events['update:tags']) this.$emit('update:tags', this.tagsCopy);

      this.$emit('tags-changed', this.tagsCopy);
    },
    tagsEqual() {
      return !this.tagsCopy.some((t, i) => !equal(t, this.tags[i]));
    },
    updateNewTag(ievent) {
      const value = ievent.target.value;
      this.newTag = value;
      this.$emit('input', value);
    },
    initTags() {
      // We always work with a copy of the "real" tags, to easier edit them
      this.tagsCopy = createTags(this.tags, this.validation, this.isDuplicate);

      // Let's create an array which defines whether a tag is in edit mode or not
      this.tagsEditStatus = clone(this.tags).map(() => false);

      // We check if the original and the copied and validated tags are equal →
      // Update the parent if not and sync is on.
      if (this._events['update:tags'] && !this.tagsEqual()) {
        this.$emit('update:tags', this.tagsCopy);
      }
    },
    blurredOnClick(e) {
      // if the click occurs on tagsinput → don't hide
      if (this.$el.contains(e.target) || this.$el.contains(document.activeElement)) return;
      this.performBlur(e);
    },
    performBlur() {
      // If we should add tags before blurring → add tag
      if (this.addOnBlur && this.focused) this.performAddTags(this.newTag);

      // Hide autocomplete layer
      this.focused = false;
    },
  },
  watch: {
    value(newValue){
      // If v-model change outside, update the newTag model
      if (!this.addOnlyFromAutocomplete) this.selectedItem = null;
      this.newTag = newValue;
    },
    tags: {
      handler() {
        // If the tags change outside, update the tagsCopy model
        this.initTags();
      },
      deep: true,
    },
    autocompleteOpen: 'selectDefaultItem',
  },
  created() {
    this.newTag = this.value;
    this.initTags();
  },
  mounted() {
    // We select a default item based on props in the autocomplete
    this.selectDefaultItem();

    // We add a event listener to hide autocomplete on blur
    document.addEventListener('click', this.blurredOnClick);
  },
  destroyed() {
    document.removeEventListener('click', this.blurredOnClick);
  },
};
