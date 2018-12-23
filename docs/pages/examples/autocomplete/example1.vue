<template>
  <section>
    <h1>Simple Autocomplete</h1>
    <p>
      The property
      <span class="code">autocomplete-items</span>
      expects an array. We pass through the computed property
      <span class="code">filteredItems</span>,
      which is a filtered collection based on the string
      <span class="code">tag</span>
      and the possible items: Spain, France, USA, Germany and China.
    </p>
    <vue-tags-input
      v-model="tag"
      :tags="tags"
      :autocomplete-items="filteredItems"
      @tags-changed="newTags => tags = newTags"
    />
    <el-code lang="html" :code="require('./example1.demo.html')" />
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
      autocompleteItems: [{
        text: 'Spain',
      }, {
        text: 'France',
      }, {
        text: 'USA',
      }, {
        text: 'Germany',
      }, {
        text: 'China',
      }],
    };
  },
  computed: {
    filteredItems() {
      return this.autocompleteItems.filter(i => {
        return i.text.toLowerCase().indexOf(this.tag.toLowerCase()) !== -1;
      });
    },
  },
};
</script>
