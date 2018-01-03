<template lang="html">
  <div class="getting-started">
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
      <code>npm install vue-tags-input --save</code>
    </el-code>
    <span>Or via CDN</span>
    <el-code>
      <code>&lt;link href=&quot;https://fonts.googleapis.com/css?family=Montserrat:400,500|Raleway:400,500&quot; rel=&quot;stylesheet&quot;&gt;</code>
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
import VueTagsInput from 'vue-tags-input';

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
  </div>
</template>

<script>
import VueTagsInput from '../components/vue-tags-input';
import ElCode from '../components/el-code';

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
</style>
