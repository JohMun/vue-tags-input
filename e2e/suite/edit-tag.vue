<template lang="html">
  <div class="e2e-suite edit-tag">
    <vue-tags-input
      v-model="tag"
      :tags="tags"
      :allow-edit-tags="true"
    />
  </div>
</template>

<script>
import VueTagsInput from '@johmun/vue-tags-input';

export default {
  name: 'EditTag',
  components: {
    VueTagsInput,
  },
  data() {
    return {
      tag: '',
      tags: [{ text: 'a tag' }],
    };
  },
};
</script>
