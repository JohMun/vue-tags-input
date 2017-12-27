<template lang="html">
  <div class="getting-started">
    <h1>Getting Started</h1>
    <vue-tags-input
      v-model="tag"
      :tags="tags"
      @tags-changed="newTags => tags = newTags">
    </vue-tags-input>
  </div>
</template>

<script>
import VueTagsInput from '../components/vue-tags-input';

export default {
  name: 'GettingStarted',
  components: {
    VueTagsInput,
  },
  data() {
    return {
      tag: '',
      tags: [{ text: 'new Tag' }],
    };
  },
};
</script>
