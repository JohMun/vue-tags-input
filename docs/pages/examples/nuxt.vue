<template lang="html">
  <div class="examples-nuxt page">
    <div class="content">
      <h1>Use Taginput with Nuxt</h1>
      <p>
        Create the file <span class="code">vue-tags-input.js</span> with the following content
        in the <span class="code">./plugins</span> folder.
      </p>

      <el-code class="javascript">
        <code>
import Vue from 'vue';
import VueTagsInput from '@johmun/vue-tags-input';

Vue.use(VueTagsInput);
        </code>
      </el-code>

      <p>
        Add <span class="code">VueTagsInput</span> to the plugins list in your
        <span class="code">nuxt.config.js</span>
      </p>

      <el-code class="javascript">
        <code>
plugins: [{ src: '~/plugins/vue-tags-input', ssr: false }],
build: {
  vendor: ['@johmun/vue-tags-input'],
  // more config
}
        </code>
      </el-code>

      <p>
        Now you can use <span class="code">VueTagsInput</span> like this:
      </p>

      <el-code class="html">
        <code>
&lt;template&gt;
  &lt;no-ssr&gt;
    &lt;vue-tags-input
      v-model=&quot;tag&quot;
      :tags=&quot;tags&quot;
      @tags-changed=&quot;newTags =&gt; tags = newTags&quot;
    /&gt;
  &lt;/no-ssr&gt;
&lt;/template&gt;
        </code>
      </el-code>
    </div>
  </div>
</template>

<script>
import ElCode from '../../components/el-code';

export default {
  name: 'ExamplesNuxt',
  components: { ElCode },
};
</script>
