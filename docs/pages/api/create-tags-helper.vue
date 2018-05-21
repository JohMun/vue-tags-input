<template lang="html">
  <div class="create-tags-helper">
    import helper functions and VueTagsInput
    <el-code class="javascript">
      <code>
import { VueTagsInput, createTag, createTags } from '@johmun/vue-tags-input';
      </code>
    </el-code>
    <!-- auf $ref und performAddTag hinweisen -->
  </div>
</template>

<script>
import ElCode from '../../components/el-code';

export default {
  name: 'CreateTagsHelper',
  components: {
    ElCode,
  },
};
</script>

<style lang="scss" scoped>
</style>
