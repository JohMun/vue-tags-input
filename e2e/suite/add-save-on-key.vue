<template lang="html">
  <div class="e2e-suite add-save-on">
    add save
    <vue-tags-input
      v-model="tag"
      :tags="tags"
      :add-on-key="[',', 32]"
      :save-on-key="[188, 32]"
      :allow-edit-tags="true"
      :autocomplete-items="autocompleteItems"
      @tags-changed="newTags => tags = newTags"
    />
  </div>
</template>

<script>
import VueTagsInput from '@johmun/vue-tags-input';

export default {
  name: 'AddSaveOnKey',
  components: {
    VueTagsInput,
  },
  data() {
    return {
      tag: '',
      tags: [],
      autocompleteItems: [{
        text: 'france',
      }, {
        text: 'china',
      }, {
        text: 'spain',
      }, {
        text: 'germany',
      }],
    };
  },
};
</script>
