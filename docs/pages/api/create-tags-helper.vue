<template lang="html">
  <div class="create-tags-helper page">
    <div class="content">
      <h1>
        Create tags helper
      </h1>
      <p>
        In some cases it can be useful to build tag objects manually.
        For example, if you use the validation feature and pass unvalidated tags
        to vue-tags-input. It validates the passed tags when mounting
        and emits <span class="code">@tags-changed</span>, with the new validated
        tags as parameter, because they have changed.
      </p>
      <p>
        But if you do an API call in your registered callback function,
        You maybe consider this API call as unnecessary.
        In this case it's better to pass already validated tags to the component.
      </p>
      <p>
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
