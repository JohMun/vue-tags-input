<!--
  Entry Point for the component.
  The file contains the template and includes the script and style files.
-->

<template>
  <div class="vue-tags-input" :class="[{ 'ti-disabled': disabled }, { 'ti-focus': focused }]">
    <div class="ti-input">
      <ul class="ti-tags" v-if="tagsCopy">
        <li
          :tabindex="index + 1"
          v-for="(tag, index) in tagsCopy"
          :key="index"
          class="ti-tag"
          @click="$emit('tag-clicked', { tag, index })"
          :style="tag.style"
          :class="[
            { 'ti-editing': tagsEditStatus[index] },
            tag.tiClasses,
            tag.classes,
            { 'ti-deletion-mark': isMarked(index) }
          ]">
          <div class="ti-content">
            <div
              class="ti-tag-left"
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
            <div class="ti-tag-center" ref="tagCenter">
              <span
                @click="performEditTag(index)"
                v-if="!$scopedSlots.tagCenter"
                :class="{ 'ti-hidden': tagsEditStatus[index] }">{{ tag.text }}</span>
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
                name="tagCenter"
                :tag="tag"
                :index="index"
                :maxlength="maxlength"
                :edit="tagsEditStatus[index]"
                :perform-save-edit="performSaveTag"
                :perform-delete="performDeleteTag"
                :perform-cancel-edit="cancelEdit"
                :validate-tag="createChangedTag"
                :perform-save-tag="performSaveTag"
                :perform-open-edit="performEditTag"
                :deletion-mark="isMarked(index)">
              </slot>
            </div>
            <div
              v-if="$scopedSlots.tagRight"
              class="ti-tag-right">
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
          <div class="ti-actions">
            <!-- dont use v-if and v-else here -> different event calling on click?! -->
            <i
              @click="cancelEdit(index)"
              v-if="!$scopedSlots.tagActions"
              v-show="tagsEditStatus[index]"
              class="ti-icon-undo">
            </i>
            <i
              @click="performDeleteTag(index)"
              v-if="!$scopedSlots.tagActions"
              v-show="!tagsEditStatus[index]"
              class="ti-icon-close">
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
        <li class="ti-new-tag-input-wrapper">
          <input
            class="ti-new-tag-input"
            :class="[createClasses(newTag, tags, validation, isDuplicate)]"
            v-bind="$attrs"
            type="text"
            size="1"
            ref="newTagInput"
            @paste="addTagsFromPaste"
            :placeholder="placeholder"
            :value="newTag"
            :maxlength="maxlength"
            @keydown="performAddTags(
              filteredAutocompleteItems[selectedItem] || newTag, $event
            )"
            @keydown.8="invokeDelete"
            @keydown.38="selectItem($event, 'before')"
            @keydown.40="selectItem($event, 'after')"
            @input="updateNewTag"
            @blur="$emit('blur', $event)"
            @focus="focused = true; $emit('focus', $event)"
            @click="addOnlyFromAutocomplete ? false : selectedItem = null"
            :disabled="disabled"
          />
        </li>
      </ul>
    </div>
    <slot name="between-elements" />
    <div
      class="ti-autocomplete"
      @mouseout="selectedItem = null"
      v-if="autocompleteOpen">
      <slot name="autocompleteHeader" />
      <ul>
        <li
          v-for="(item, index) in filteredAutocompleteItems"
          :key="index"
          class="ti-item"
          @mouseover="disabled ? false : selectedItem = index"
          :style="item.style"
          :class="[
            item.tiClasses,
            item.classes,
            { 'ti-selected-item': isSelected(index) }
          ]">
          <div
            @click="performAddTags(item, undefined, 'autocomplete')"
            v-if="!$scopedSlots.autocompleteItem">{{ item.text }}
          </div>
          <slot
            v-else
            :item="item"
            :index="index"
            :perform-add="item => performAddTags(item, undefined, 'autocomplete')"
            :selected="isSelected(index)"
            name="autocompleteItem">
          </slot>
        </li>
      </ul>
      <slot name="autocompleteFooter" />
    </div>
  </div>
</template>

<!-- js and scss resources → I separated it into different files, because they became huge -->
<script src="./vue-tags-input.js"></script>
<style lang="scss" src="./vue-tags-input.scss" scoped></style>
