<template lang="html">
  <div class="create-tags-helper page">
    <div class="content">
      <h1>
        Further helper functions
      </h1>
      <p>
        In some cases it can be useful to build tag objects manually.
        For example, if you need those tag objects before vue-tags-input has mounted.
        To achieve that, we can import some helper functions from vue-tags-input.
      </p>
      <el-code class="javascript">
        <code>
import { VueTagsInput, createTag, createTags } from '@johmun/vue-tags-input';
        </code>
      </el-code>
      <ul>
        <li class="docs-item" v-for="(p, index) in helpers" :key="index">
          <auto-docs-item :item="p" :kebab-name="false" />
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import ElCode from '../../components/el-code';
import AutoDocsItem from '../../components/auto-docs-item';

export default {
  name: 'CreateTagsHelper',
  components: {
    ElCode,
    AutoDocsItem,
  },
  data() {
    return {
      helpers: window.docs.helpers,
    };
  },
};
</script>

<style lang="scss" scoped>
</style>
