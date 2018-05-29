<template lang="html">
  <div class="auto-docs-item">
    <span class="name">{{ model ? 'v-model' : item.name }}</span>
    <span class="description" v-if="description">{{ description }}</span>
    <el-code v-if="example">
      <code class="js" v-html="example"></code>
    </el-code>
  </div>
</template>

<script>
import ElCode from './el-code';

export default {
  name: 'AutoDocsItem',
  components: {
    ElCode,
  },
  props: ['item'],
  computed: {
    model() {
      return this.item.tags.find(t => t.title === 'model');
    },
    description() {
      const item = this.item.tags.find(t => t.title === 'description');
      return item && item.description;
    },
    example() {
      const item = this.item.tags.find(t => t.title === 'example');
      return item && item.description;
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
