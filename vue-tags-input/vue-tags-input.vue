<!--
  Entry Point for the component.
  The file contains the template and includes the script and style files.
-->

<template>
  <div
    class="vue-tags-input"
    :class="[{ 'ti-disabled': disabled }, { 'ti-focus': focused }]"
  >
    <div class="ti-input">
      <ul v-if="tagsCopy" class="ti-tags">
        <li
          v-for="(tag, index) in tagsCopy"
          :key="index"
          :style="tag.style"
          :class="[
            { 'ti-editing': tagsEditStatus[index] },
            tag.tiClasses,
            tag.classes,
            { 'ti-deletion-mark': isMarked(index) }
          ]"
          tabindex="0"
          class="ti-tag"
          @click="$emit('tag-clicked', { tag, index })"
        >
          <div class="ti-content">
            <div
              v-if="$scopedSlots['tag-left']"
              class="ti-tag-left"
            >
              <slot
                name="tag-left"
                :tag="tag"
                :index="index"
                :edit="tagsEditStatus[index]"
                :perform-save-edit="performSaveTag"
                :perform-delete="performDeleteTag"
                :perform-cancel-edit="cancelEdit"
                :perform-open-edit="performEditTag"
                :deletion-mark="isMarked(index)"
              />
            </div>
            <div ref="tagCenter" class="ti-tag-center">
              <span
                v-if="!$scopedSlots['tag-center']"
                :class="{ 'ti-hidden': tagsEditStatus[index] }"
                @click="performEditTag(index)"
              >{{ tag.text }}</span>
              <tag-input
                v-if="!$scopedSlots['tag-center']"
                :scope="{
                  edit: tagsEditStatus[index],
                  maxlength,
                  tag,
                  index,
                  validateTag: createChangedTag,
                  performCancelEdit: cancelEdit,
                  performSaveEdit: performSaveTag,
                }"
              />
              <slot
                name="tag-center"
                :tag="tag"
                :index="index"
                :maxlength="maxlength"
                :edit="tagsEditStatus[index]"
                :perform-save-edit="performSaveTag"
                :perform-delete="performDeleteTag"
                :perform-cancel-edit="cancelEdit"
                :validate-tag="createChangedTag"
                :perform-open-edit="performEditTag"
                :deletion-mark="isMarked(index)"
              />
            </div>
            <div
              v-if="$scopedSlots['tag-right']"
              class="ti-tag-right"
            >
              <slot
                name="tag-right"
                :tag="tag"
                :index="index"
                :edit="tagsEditStatus[index]"
                :perform-save-edit="performSaveTag"
                :perform-delete="performDeleteTag"
                :perform-cancel-edit="cancelEdit"
                :perform-open-edit="performEditTag"
                :deletion-mark="isMarked(index)"
              />
            </div>
          </div>
          <div class="ti-actions">
            <!-- dont use v-if and v-else here -> different event calling on click?! -->
            <i
              v-if="!$scopedSlots['tag-actions']"
              v-show="tagsEditStatus[index]"
              class="ti-icon-undo"
              @click="cancelEdit(index)"
            />
            <i
              v-if="!$scopedSlots['tag-actions']"
              v-show="!tagsEditStatus[index]"
              class="ti-icon-close"
              @click="performDeleteTag(index)"
            />
            <slot
              v-if="$scopedSlots['tag-actions']"
              name="tag-actions"
              :tag="tag"
              :index="index"
              :edit="tagsEditStatus[index]"
              :perform-save-edit="performSaveTag"
              :perform-delete="performDeleteTag"
              :perform-cancel-edit="cancelEdit"
              :perform-open-edit="performEditTag"
              :deletion-mark="isMarked(index)"
            />
          </div>
        </li>
        <li class="ti-new-tag-input-wrapper">
          <input
            ref="newTagInput"
            v-bind="$attrs"
            :class="[createClasses(newTag, tags, validation, isDuplicate)]"
            :placeholder="placeholder"
            :value="newTag"
            :maxlength="maxlength"
            :disabled="disabled"
            type="text"
            size="1"
            class="ti-new-tag-input"
            @keydown="performAddTags(
              filteredAutocompleteItems[selectedItem] || newTag, $event
            )"
            @paste="addTagsFromPaste"
            @keydown.8="invokeDelete"
            @keydown.9="performBlur"
            @keydown.38="selectItem($event, 'before')"
            @keydown.40="selectItem($event, 'after')"
            @input="updateNewTag"
            @blur="$emit('blur', $event)"
            @focus="focused = true; $emit('focus', $event)"
            @click="addOnlyFromAutocomplete ? false : selectedItem = null"
          >
        </li>
      </ul>
    </div>
    <slot name="between-elements" />
    <div
      v-if="autocompleteOpen"
      class="ti-autocomplete"
      @mouseout="selectedItem = null"
    >
      <slot name="autocomplete-header" />
      <ul>
        <li
          v-for="(item, index) in filteredAutocompleteItems"
          :key="index"
          :style="item.style"
          :class="[
            item.tiClasses,
            item.classes,
            { 'ti-selected-item': isSelected(index) }
          ]"
          class="ti-item"
          @mouseover="disabled ? false : selectedItem = index"
        >
          <div
            v-if="!$scopedSlots['autocomplete-item']"
            @click="performAddTags(item, undefined, 'autocomplete')"
          >
            {{ item.text }}
          </div>
          <slot
            v-else
            name="autocomplete-item"
            :item="item"
            :index="index"
            :perform-add="item => performAddTags(item, undefined, 'autocomplete')"
            :selected="isSelected(index)"
          />
        </li>
      </ul>
      <slot name="autocomplete-footer" />
    </div>
  </div>
</template>

<!-- js and scss resources → I separated it into different files, because they became huge -->
<script src="./vue-tags-input.js"></script>
<style lang="scss" src="./vue-tags-input.scss" scoped></style>
