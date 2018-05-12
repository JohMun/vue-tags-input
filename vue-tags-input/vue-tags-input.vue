<template>
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
            @keydown="performAddTags(
              filteredAutocompleteItems[selectedItem] || newTag, $event
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

<!-- js and scss resources → I separated it into different files, because they became huge -->
<script src="./vue-tags-input.js"></script>
<style lang="scss" src="./vue-tags-input.scoped.scss" scoped></style>
<style lang="scss" src="./vue-tags-input.unscoped.scss"></style>
