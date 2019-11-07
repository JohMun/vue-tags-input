<template lang="html">
  <section>
    <h2>Example 1</h2>
    <p>
      In this example, we push the <span class="code">addTag</span> function
      in <span class="code">handlers</span>, if the
      <span class="code">before-adding-tag</span> hook fires.
    </p>
    <p>
      Its might be suprising that we are using an array here. That's because we can have mulitple
      <span class="code">addTag</span> functions. If we are using separators (see prop
      <router-link :to="{ path: '/api/props'}">
        <span class="code">separators</span>
      </router-link>)
      vue-tags-input will emit
      <span class="code">@before-adding-tag</span> multiple times in a row,
      if it has to split the input string into multiple tags.
    </p>
    <p>
      If the <span class="code">handlers</span> array is not <span class="code">null</span>,
      we show two buttons. The "Add" button invokes the saved functions on click
      and the tag/s will be added.
    </p>
    <vue-tags-input
      v-model="tag"
      :tags="tags"
      @tags-changed="newTags => tags = newTags"
      @before-adding-tag="obj => handlers.push(obj.addTag)"
    />
    <div v-if="handlers.length" class="actions">
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
      handlers: [],
    };
  },
  methods: {
    cancel() {
      this.$nextTick(() => this.handlers = []);
      this.tag = '';
    },
    add() {
      this.handlers.forEach(h => h());
      this.$nextTick(() => this.handlers = []);
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
