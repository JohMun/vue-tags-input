<template lang="html">
  <section>
    <h2>Example 2</h2>
    <p>
      In the <span class="code">checkTag</span> function, which is called
      by the <span class="code">before-adding-tag</span> hook, some logic is executed.
      If a to adding tag contains the letter "e", an alert box is shown.
    </p>
    <vue-tags-input
      v-model="tag"
      :tags="tags"
      @tags-changed="newTags => tags = newTags"
      @before-adding-tag="checkTag"
    />
    <el-code lang="html" :code="require('./example2.demo.html')" />
    <el-code :code="require('./example2.demo.js')" />
  </section>
</template>

<script>
import VueTagsInput from '@johmun/vue-tags-input';
import ElCode from '@components/el-code';

export default {
  name: 'ExamplesHooks',
  components: {
    VueTagsInput,
    ElCode,
  },
  data() {
    return {
      tag: '',
      tags: [],
      handler: null,
    };
  },
  methods: {
    checkTag(obj) {
      if (obj.tag.text.includes('e')) alert('Letter "e" is forbidden');
      else obj.addTag();
    },
  },
};
</script>
