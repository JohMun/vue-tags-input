<template lang="html">
  <div class="getting-started page">
    <div class="content">
      <h1>Getting Started</h1>
      <h2>Demo</h2>
      <vue-tags-input
        v-model="tag"
        :tags="tags"
        :tagsFilterDuplicates="false"
        @tags-changed="newTags => tags = newTags">
      </vue-tags-input>
      <div class="data">
        <span>tag</span>
        <el-code :code="tag"></el-code>
        <span>tags</span>
        <el-code :code="tags"></el-code>
      </div>
      <h2>Install</h2>
      <span>Install vue-tags-input with npm</span>
      <el-code class="bash">
        <code>npm install @johmun/vue-tags-input --save</code>
      </el-code>
      <h2>Usage</h2>
      <el-code>
        <code>
&lt;template&gt;
  &lt;div&gt;
    &lt;vue-tags-input
      v-model=&quot;tag&quot;
      :tags=&quot;tags&quot;
      @tags-changed=&quot;newTags =&gt; tags = newTags&quot;
    /&gt;
  &lt;/div&gt;
&lt;/template&gt;

&lt;script&gt;
import VueTagsInput from '@johmun/vue-tags-input';

export default {
  components: {
    VueTagsInput,
  },
  data() {
    return {
      tag: '',
      tags: [],
    };
  },
};
&lt;/script&gt;
        </code>
      </el-code>
      <h2>CDN</h2>
      <p>
        vue-tags-input can be included via CDN and it registrates itself as a global component.
      </p>
      <el-code>
        <code>
&lt;script src=&quot;https://unpkg.com/@johmun/vue-tags-input/dist/vue-tags-input.js&quot;&gt;&lt;/script&gt;
        </code>
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
    };
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
