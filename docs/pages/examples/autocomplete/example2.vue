<template>
  <section>
    <h1>Add only from autocomplete and http</h1>
    <p>
      In this example music artists can be found with the autocomplete function.
      The <a href="https://itunes.apple.com/" target="_blank">iTunes API</a>
      is requested as data source. As supporting http library,
      <a href="https://github.com/axios/axios" target="_blank">axios</a>
      is used. The property <span class="code">add-only-from-autocomplete</span>
      disables adding tags from input directly.
      A debounce avoid too much requests when typing.
    </p>
    <div class="searchbox">
      <vue-tags-input
        v-model="tag"
        :tags="tags"
        :autocomplete-items="autocompleteItems"
        :add-only-from-autocomplete="true"
        class="example-input"
        @tags-changed="update"
      />
      <div v-if="loading" class="spinner">Loading</div>
    </div>
    <el-code lang="html" :code="require('./example2.demo.html')" />
  </section>
</template>

<script>
import VueTagsInput from '@johmun/vue-tags-input';
import ElCode from '@components/el-code';
import axios from 'axios';

export default {
  components: {
    VueTagsInput,
    ElCode,
  },
  data() {
    return {
      tag: '',
      tags: [],
      autocompleteItems: [],
      debounce: null,
      loading: false,
    };
  },
  watch: {
    'tag': 'initItems',
  },
  methods: {
    update(newTags) {
      this.autocompleteItems = [];
      this.tags = newTags;
    },
    initItems() {
      if (this.tag.length < 2) return;
      const url = `https://itunes.apple.com/search?term=
        ${this.tag}&entity=allArtist&attribute=allArtistTerm&limit=6`;
      this.loading = true;
      clearTimeout(this.debounce);
      this.debounce = setTimeout(() => {
        axios.get(url).then(response => {
          this.autocompleteItems = response.data.results.map(a => {
            return { text: a.artistName };
          });
        }).catch(() => alert('Oh. Something went wrong'))
          .finally(() => this.loading = false);
      }, 600);
    },
  },
};
</script>

<style lang="scss" scoped>
.searchbox {
  margin-top: 15px;
  display: flex;
  align-items: center;

  .example-input {
    width: 100%;
  }

  .spinner {
    padding-left: 8px;
  }
}
</style>
