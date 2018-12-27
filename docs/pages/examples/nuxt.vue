<template lang="html">
  <div class="examples-nuxt page">
    <div class="content">
      <h1>Use Taginput with Nuxt</h1>
      <p>
        Create the file <span class="code">vue-tags-input.js</span> with the following content
        in the <span class="code">./plugins</span> folder.
      </p>

      <el-code class="javascript">
        <code>import Vue from 'vue';
import VueTagsInput from '@johmun/vue-tags-input';

Vue.use(VueTagsInput);
        </code>
      </el-code>

      <p>
        Add <span class="code">VueTagsInput</span> to the plugins list in your
        <span class="code">nuxt.config.js</span>
      </p>

      <el-code class="javascript">
        <code>plugins: [{ src: '~/plugins/vue-tags-input', ssr: false }],
build: {
vendor: ['@johmun/vue-tags-input'],
// more config
}
        </code>
      </el-code>

      <p>
        Now you can use <span class="code">VueTagsInput</span> like this:
      </p>

      <el-code lang="html" :code="html" />
    </div>
  </div>
</template>

<script>
import ElCode from '@components/el-code';

export default {
  name: 'ExamplesNuxt',
  components: { ElCode },
  data() {
    return {
      html: `<template>
  <no-ssr>
    <vue-tags-input
      v-model="tag"
      :tags="tags"
      @tags-changed="newTags => tags = newTags"
    />
  </no-ssr>
</template>
      `,
    };
  },
};
</script>
