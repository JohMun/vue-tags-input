<template>
  <div class="e2e-suite autocomplete">
    <vue-tags-input
      class="input-0"
      v-model="tag"
      :tags="tags"
      :autocomplete-items="autocompleteItems"
      @tags-changed="newTags => tags = newTags">
    </vue-tags-input>
    <vue-tags-input
      class="input-1"
      v-model="tag"
      :tags="tags"
      :add-only-from-autocomplete="true"
      :autocomplete-min-length="0"
      :autocomplete-items="autocompleteItems"
      @tags-changed="newTags => tags = newTags">
    </vue-tags-input>
    <vue-tags-input
      class="input-2"
      v-model="tag"
      :tags="tags"
      :avoid-adding-duplicates="false"
      :autocomplete-filter-duplicates="false"
      :autocomplete-always-open="true"
      :autocomplete-items="autocompleteItems"
      @tags-changed="newTags => tags = newTags">
    </vue-tags-input>
  </div>
</template>

<script>
import VueTagsInput from '../../vue-tags-input/vue-tags-input';

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
