<template>
  <div class="examples-autocomplete page">
    <div class="content">
      <section>
        <h1>Simple Autocomplete</h1>
        <p>
          The property <span class="code">autocomplete-items</span> expects an array.
          We pass through the computed property <span class="code">filteredItems</span>, which is a
          filtered collection based on the string <span class="code">tag</span>
          and the possible items: Spain, France, USA, Germany and China.
        </p>
        <vue-tags-input
          v-model="example1.tag"
          :tags="example1.tags"
          :autocomplete-items="filteredItems1"
          @tags-changed="newTags => example1.tags = newTags">
        </vue-tags-input>
      </section>
      <el-code>
        <code>
&lt;template&gt;
  &lt;div&gt;
    &lt;vue-tags-input
      v-model=&quot;tag&quot;
      :tags=&quot;tags&quot;
      :autocomplete-items=&quot;filteredItems&quot;
      @tags-changed=&quot;newTags =&gt; tags = newTags&quot;&gt;
    &lt;/vue-tags-input&gt;
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
      return this.autocompleteItems.filter(i =&gt; new RegExp(this.tag, 'i').test(i.text));
    },
  },
};
&lt;/script&gt;
        </code>
      </el-code>
      <section>
        <h1>Add only from autocomplete and http</h1>
        <p>
          In this example music artists can be found with the autocomplete function.
          The <a href="https://itunes.apple.com/" target="_blank">iTunes API</a> is requested as data source.
          As supporting http library, <a href="https://github.com/axios/axios" target="_blank">axios</a> is used.
          The property <span class="code">add-only-from-autocomplete</span> disables adding tags from input directly.
          A debounce avoid too much requests when typing.
        </p>
        <div class="searchbox">
          <vue-tags-input
            class="example-input"
            v-model="example2.tag"
            :tags="example2.tags"
            :autocomplete-items="example2.autocompleteItems"
            :add-only-from-autocomplete="true"
            @tags-changed="update">
          </vue-tags-input>
          <div class="spinner" v-if="example2.loading">Loading</div>
        </div>
      </section>
      <el-code class="html">
        <code>
&lt;template&gt;
  &lt;div&gt;
    &lt;vue-tags-input
      v-model=&quot;tag&quot;
      :tags=&quot;tags&quot;
      :autocomplete-items=&quot;autocompleteItems&quot;
      :add-only-from-autocomplete=&quot;true&quot;
      @tags-changed=&quot;update&quot;&gt;
    &lt;/vue-tags-input&gt;
  &lt;/div&gt;
&lt;/template&gt;
        </code>
      </el-code>
      <el-code class="javascript">
        <code>
&lt;script&gt;
import VueTagsInput from '@johmun/vue-tags-input';
import axios from 'axios';

export default {
  components: {
    VueTagsInput,
  },
  data() {
    return {
      tag: '',
      tags: [],
      autocompleteItems: [],
      debounce: null,
    };
  },
  methods: {
    update(newTags) {
      this.autocompleteItems = [];
      this.tags = newTags;
    },
    initItems() {
      if (this.tag.length === 0) return;
      const url = `https://itunes.apple.com/search?term=
        ${this.tag}&amp;entity=allArtist&amp;attribute=allArtistTerm&amp;limit=6`;

      clearTimeout(this.debounce);
      this.debounce = setTimeout(() => {
        axios.get(url).then(response => {
          this.autocompleteItems = response.data.results.map(a => {
            return { text: a.artistName };
          });
        }).catch(() => console.warn('Oh. Something went wrong'));
      }, 600);
    },
  },
  watch: {
    'tag': 'initItems',
  },
};
&lt;/script&gt;
        </code>
      </el-code>
    </div>
  </div>
</template>

<script>
import VueTagsInput from '../../../vue-tags-input/vue-tags-input.vue';
import ElCode from '../../components/el-code';
import axios from 'axios';

export default {
  name: 'ExamplesAutocomplete',
  components: {
    VueTagsInput,
    ElCode,
  },
  data() {
    return {
      example1: {
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
      },
      example2: {
        tag: '',
        tags: [],
        autocompleteItems: [],
        debounce: null,
        loading: false,
      },
    };
  },
  methods: {
    update(newTags) {
      this.example2.autocompleteItems = [];
      this.example2.tags = newTags;
    },
    initItems() {
      if (this.example2.tag.length === 0) return;
      const url = `https://itunes.apple.com/search?term=
        ${this.example2.tag}&entity=allArtist&attribute=allArtistTerm&limit=6`;
      this.example2.loading = true;
      clearTimeout(this.debounce);
      this.debounce = setTimeout(() => {
        axios.get(url).then(response => {
          this.example2.autocompleteItems = response.data.results.map(a => {
            return { text: a.artistName };
          });
        }).catch(() => alert('Oh. Something went wrong'))
          .then(() => this.example2.loading = false);
      }, 600);
    },
  },
  computed: {
    filteredItems1() {
      return this.example1.autocompleteItems.filter(i => {
        return new RegExp(this.example1.tag, 'i').test(i.text);
      });
    },
  },
  watch: {
    'example2.tag': 'initItems',
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
    padding: 8px;
  }
}
</style>
