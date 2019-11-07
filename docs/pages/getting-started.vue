<template lang="html">
  <div class="getting-started page">
    <div class="content">
      <h1>Getting Started</h1>
      <h2>Demo</h2>
      <vue-tags-input
        v-model="tag"
        :tags="tags"
        :tags-filte-duplicates="false"
        @tags-changed="newTags => tags = newTags"
      />
      <div class="data">
        <span class="label">tag</span>
        <el-code :code="tagString" />
        <span class="label">tags</span>
        <el-code :code="tagsString" />
      </div>
      <h2>Install</h2>
      <span>Install vue-tags-input with npm</span>
      <el-code>
        <code>npm install @johmun/vue-tags-input</code>
      </el-code>
      <h2>Usage</h2>
      <el-code lang="html" :code="require('./getting-started.demo.html')" />
      <h2>CDN</h2>
      <p>
        vue-tags-input can be included via CDN and it registrates itself as a global component.
      </p>
      <el-code lang="html">
        <code>&lt;script src=&quot;{{ cdnUrl }}&quot;&gt;&lt;/script&gt;</code>
      </el-code>
    </div>
  </div>
</template>

<script>
import VueTagsInput from '@johmun/vue-tags-input';
import ElCode from '@components/el-code';

export default {
  name: 'GettingStarted',
  components: {
    VueTagsInput,
    ElCode,
  },
  data() {
    return {
      tag: '',
      tags: [],
      cdnUrl: 'https://unpkg.com/@johmun/vue-tags-input/dist/vue-tags-input.js',
    };
  },
  computed: {
    tagString() {
      return JSON.stringify(this.tag);
    },
    tagsString() {
      return JSON.stringify(this.tags);
    },
  },
};
</script>

<style lang="scss" scoped>
.data {
  margin-top: 20px;
}

span, p {
  line-height: 1.5em;
  max-width: 900px;
}
</style>
