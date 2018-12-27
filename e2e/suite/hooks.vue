<template lang="html">
  <div class="e2e-suite hooks">
    <div v-if="handler" class="actions">
      <button class="cancel" @click="cancel">
        Cancel
      </button>
      <button class="perform" @click="action">
        Perform
      </button>
    </div>
    <vue-tags-input
      v-model="tag"
      :tags="tags"
      :allow-edit-tags="true"
      @tags-changed="newTags => tags = newTags"
      @before-adding-tag="obj => handler = obj.addTag"
      @before-editing-tag="obj => handler = obj.editTag"
      @before-deleting-tag="obj => handler = obj.deleteTag"
      @before-saving-tag="obj => handler = obj.saveTag"
    />
  </div>
</template>

<script>
import VueTagsInput from '@johmun/vue-tags-input';

export default {
  name: 'Hooks',
  components: {
    VueTagsInput,
  },
  data() {
    return {
      tag: '',
      tags: [],
      handler: null,
    };
  },
  methods: {
    cancel() {
      this.$nextTick(() => this.handler = null);
      this.tag = '';
    },
    action() {
      this.handler();
      this.$nextTick(() => this.handler = null);
    },
  },
};
</script>
