<template lang="html">
  <div class="examples-validation page">
    <div class="content">
      <section>
        <h1>Validation</h1>
        <breaking-changes :current-version="2">
          <ul>
            <li>
              The key <span>type</span> in a validation item,
              has been renamed to <span class="code">classes</span>.
            </li>
            <li>
              The function <span class="code">rule</span> in a validation item,
              gets the complete tag as parameter.
            </li>
          </ul>
        </breaking-changes>
        <p>
          To validate tags, autocomplete items or the user input, a validation array
          can be passed to the tags input component. In this example, a tag has to be
          at least 8 characters long, can't contain a number or a brace and must not start
          with the string "Cannot".
        </p>
        <vue-tags-input
          v-model="tag"
          :tags="tags"
          :validation="validation"
          :autocomplete-items="filteredItems"
          @tags-changed="newTags => tags = newTags"
        />
        <div class="data">
          <span>tag</span>
          <el-code :code="tagString" />
          <span>tags</span>
          <el-code :code="tagsString" />
        </div>
        <p>
          Each item in the validation array must contain the properties
          <span class="code">classes</span> and <span class="code">rule</span>.
          <span class="code">classes</span> will be added as css class, if the related
          <span class="code">rule</span> matches a tag, the user input or an autocomplete item.
          The rule can by type of RegExp or function.
          In chapter <router-link :to="{ path: '/examples/styling'}">Styling</router-link>
          we will see how to use these css classes in detail.
        </p>
        <p>
          If the rule is valid, the class "ti-valid", or if not, "ti-invalid" is also added.
          If the tag input component finds a duplicate item, the class "ti-duplicate" is appended.
          By default the prop <span class="code">avoid-adding-duplicates</span> is true.
          So in this example it is impossible to add duplicates.
        </p>
        <p>
          If a validation item holds the property <span class="code">disableAdd: true</span>,
          a tag, which does match the appropriated rule, won't get just some css classes.
          In this case, the tag can't be added to the tags array.
          Like every tag which starts with "Cannot" in this example.
        </p>
        <el-code lang="html" :code="require('./example1.demo.html')" />
        <el-code :code="require('./example1.demo.js')" />
      </section>
      <section>
        <p>
          You should be aware, that if you use the validation feature,
          vue-tags-input validates the passed tags and edits/adds the property
          <span class="code">tiClasses</span>. To get the validated tags,
          vue-tags-input emits <span class="code">@tags-changed</span>.
        </p>
        <p>
          The event is only emitted,
          if the user does a action like adding, editing or deleting a tag.
        </p>
        <p>
          If you want updates, if vue-tags-input detects unvalidated tags,
          you can use the <span class="code">.sync</span> modifier:
          <span class="code">:tags.sync="tags"</span>
        </p>
        <p>
          Another way would be to validate tags by yourself
          and pass them to vue-tags-input, see chapter
          <router-link :to="{ name: 'api.create-tags-helper' }">Create Tags Helper</router-link>.
        </p>
      </section>
    </div>
  </div>
</template>

<script>
import VueTagsInput from '@johmun/vue-tags-input';
import ElCode from '@components/el-code';
import BreakingChanges from '@components/breaking-changes';

export default {
  name: 'ExamplesValidation',
  components: {
    VueTagsInput,
    ElCode,
    BreakingChanges,
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
      }, {
        text: 'Invalid cause of "{"',
      }],
      validation: [{
        classes: 'min-length',
        rule: tag => tag.text.length < 8,
      }, {
        classes: 'no-numbers',
        rule: '^([^0-9]*)$',
      }, {
        classes: 'avoid-item',
        rule: /^(?!Cannot).*$/,
        disableAdd: true,
      }, {
        classes: 'no-braces',
        rule: ({ text }) => text.indexOf('{') !== -1 || text.indexOf('}') !== -1,
      }],
    };
  },
  computed: {
    tagString() {
      return JSON.stringify(this.tag);
    },
    tagsString() {
      return JSON.stringify(this.tags);
    },
    filteredItems() {
      return this.autocompleteItems.filter(i => {
        return i.text.toLowerCase().indexOf(this.tag.toLowerCase()) !== -1;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.data {
  margin-top: 20px;
}
</style>
