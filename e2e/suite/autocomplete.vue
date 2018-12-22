<template>
  <div class="e2e-suite autocomplete">
    <vue-tags-input
      v-model="tag"
      class="input-0"
      :tags="tags"
      :autocomplete-items="autocompleteItems"
      @tags-changed="newTags => tags = newTags"
    />
    <vue-tags-input
      v-model="tag"
      class="input-1"
      :tags="tags"
      :add-only-from-autocomplete="true"
      :autocomplete-min-length="0"
      :autocomplete-items="autocompleteItems"
      @tags-changed="newTags => tags = newTags"
    />
    <vue-tags-input
      v-model="tag"
      class="input-2"
      :tags="tags"
      :avoid-adding-duplicates="false"
      :autocomplete-filter-duplicates="false"
      :autocomplete-always-open="true"
      :autocomplete-items="autocompleteItems"
      @tags-changed="newTags => tags = newTags"
    />
  </div>
</template>

<script>
import VueTagsInput from '@johmun/vue-tags-input';

export default {
  name: 'Autocomplete',
  components: {
    VueTagsInput,
  },
  data() {
    return {
      tag: '',
      tags: [],
      autocompleteItems: [{
        text: 'item-1',
      }, {
        text: 'item-1',
      }, {
        text: 'item-2',
      }, {
        text: 'item-3',
      }],
    };
  },
};
</script>

<style lang="scss" scoped>
.e2e-suite.autocomplete {
  display: flex;
  flex-direction: column;

  > div {
    min-height: 150px;
  }
}
</style>
