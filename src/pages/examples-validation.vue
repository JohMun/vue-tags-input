<template lang="html">
  <div class="examples-validation">
    <section>
      <h1>Validation</h1>
      <p>
        Explain what we see here (which autocomplet items exists).
        Which one can be added
      </p>
      <vue-tags-input
        v-model="tag"
        :tags="tags"
        :validation="validation"
        :autocomplete-items="filteredItems"
        @tags-changed="newTags => tags = newTags">
      </vue-tags-input>
      <div class="data">
        <span>tag</span>
        <el-code :code="tag"></el-code>
        <span>tags</span>
        <el-code :code="tags"></el-code>
      </div>
      <p>
        Validation Array can be defined. Type will be added as css class if rule match a tag, the input or
        an autocomplete item. If the rule is valid, the class "valid", or if not "invalid" is added too.
        If tagsinput find a duplicate item, the classe duplicate will be added.
        In chapter <router-link :to="{ path: '/examples/styling'}">Styling</router-link>
        we will see how to use this css classes in detail.
      </p>
      <p>
        Prop <span class="code">disableAdd</span> erwähnen
      </p>
      <el-code class="html">
        <code>
&lt;vue-tags-input
  v-model=&quot;tag&quot;
  :tags=&quot;tags&quot;
  :validation=&quot;validation&quot;
  :autocomplete-items=&quot;filteredItems&quot;
  @tags-changed=&quot;newTags =&gt; tags = newTags&quot;&gt;
&lt;/vue-tags-input&gt;
        </code>
      </el-code>
      <el-code class="javascript">
        <code>
/* Other stuff like import tagsinput ... */

data() {
  return {
    tag: '',
    tags: [],
    autocompleteItems: [{
      text: 'Invalid because of "8"',
    }, {
      text: 'toShort',
    }, {
      text: 'I am valid',
    }, {
      text: 'Cannot be added',
    }],
    validation: [{
      type: 'min-length',
      rule: '^.{8,}$',
    }, {
      type: 'no-numbers',
      rule: '^([^0-9]*)$',
    }, {
      type: 'avoid-item',
      rule: '^(?!Cannot).*$',
      disableAdd: true,
    }],
  };
},

/* Computed properties, methods and more ... */
        </code>
      </el-code>
    </section>
  </div>
</template>

<script>
import VueTagsInput from '../components/vue-tags-input';
import ElCode from '../components/el-code';

export default {
  name: 'examplesValidation',
  components: {
    VueTagsInput,
    ElCode,
  },
  data() {
    return {
      tag: '',
      tags: [],
      autocompleteItems: [{
        text: 'Invalid because of "8"',
      }, {
        text: 'toShort',
      }, {
        text: 'I am valid',
      }, {
        text: 'Cannot be added',
      }],
      validation: [{
        type: 'min-length',
        rule: '^.{8,}$',
      }, {
        type: 'no-numbers',
        rule: '^([^0-9]*)$',
      }, {
        type: 'avoid-item',
        rule: '^(?!Cannot).*$',
        disableAdd: true,
      }],
    };
  },
  computed: {
    filteredItems() {
      return this.autocompleteItems.filter(i => new RegExp(this.tag, 'i').test(i.text));
    },
  },
};
</script>

<style lang="scss" scoped>
.examples-validation {
  span, p {
    line-height: 1.5em;
  }
}

.data {
  margin-top: 20px;
}
</style>
