<template lang="html">
  <div class="create-tags-helper page">
    <div class="content">
      <h1>
        Create tags helper
      </h1>
      <p>
        In some cases it can be useful to build tag objects manually.
        For example, if you use the validation feature and pass unvalidated tags
        to vue-tags-input. It validates the passed tags
        and emits <span class="code">@tags-changed</span>, if the user does a action.
      </p>
      <p>
        But for the time between the mounted hook and the user action, the model holds
        unvalidated tags.
      </p>
      <p>
        To solve this problem, you can create validated tags
        by yourself and pass them to vue-tags-input.
        To achieve that, we can import some helper functions from vue-tags-input.
      </p>
      <el-code
        code="import { VueTagsInput, createTag, createTags } from '@johmun/vue-tags-input';"
      />
      <ul>
        <li v-for="(p, index) in helpers" :key="index" class="docs-item">
          <auto-docs-item :item="p" :kebab-name="false" />
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import ElCode from '@components/el-code';
import AutoDocsItem from '@components/auto-docs-item';
import sortBy from 'lodash/sortBy';

export default {
  name: 'CreateTagsHelper',
  components: {
    ElCode,
    AutoDocsItem,
  },
  data() {
    return {
      helpers: sortBy(window.docs.helpers, 'name'),
    };
  },
};
</script>

<style lang="scss" scoped>
</style>
