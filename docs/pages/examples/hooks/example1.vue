<template lang="html">
  <section>
    <h2>Example 1</h2>
    <p>
      In this example, we save the <span class="code">addTag</span> function
      in <span class="code">handler</span>, when the
      <span class="code">before-adding-tag</span> hook fires.
      If <span class="code">handler</span> is not <span class="code">null</span>,
      we show two buttons. The "Add" button invokes the saved function on click
      and the tag will be added.
    </p>
    <vue-tags-input
      v-model="tag"
      :tags="tags"
      @tags-changed="newTags => tags = newTags"
      @before-adding-tag="obj => handler = obj.addTag"
    />
    <div v-if="handler" class="actions">
      <button @click="cancel">Cancel</button>
      <button @click="add">Add</button>
    </div>
    <el-code lang="html" :code="require('./example1.demo.html')" />
    <el-code :code="require('./example1.demo.js')" />
  </section>
</template>

<script>
import VueTagsInput from '@johmun/vue-tags-input';
import ElCode from '@components/el-code';

export default {
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
    cancel() {
      this.$nextTick(() => this.handler = null);
      this.tag = '';
    },
    add() {
      this.handler();
      this.$nextTick(() => this.handler = null);
    },
  },
};
</script>

<style lang="css" scoped>

a {
  text-decoration: underline;
}

.actions {
  display: flex;
}
</style>
