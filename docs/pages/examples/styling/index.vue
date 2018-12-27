<template>
  <div class="page">
    <div class="content">
      <section id="styling-example">
        <div class="explanation">
          <h1>Styling Elements</h1>
          <breaking-changes :current-version="2">
            All css classes vue-tags-input is using,
            are prefixed with <span class="code">ti-</span>. For example:
            <ul>
              <li>
                V1: <span class="code">duplicate</span> or
                <span class="code">item</span>
              </li>
              <li>
                V2: <span class="code">ti-duplicate</span> or
                <span class="code">ti-item</span>
              </li>
            </ul>
          </breaking-changes>
          <p>
            You can add CSS classes to tags, the input element or
            to autocomplete items, in the following ways:
          </p>
          <ul>
            <li>
              In a validation item, the value of the property
              <span class="code">classes</span>
              is added as class, if the rule matches.
            </li>
            <li>
              The value of the property <span class="code">classes</span>
              in a tag or an autocomplete item, is always appended.
            </li>
          </ul>
          <p>
            CSS Classes which are added from tags input:
          </p>
          <ul>
            <li>
              The class "ti-duplicate" is added if an element exists twice.
              Duplicates can't be added by default. To achieve that, The property
              <span class="code">avoidAddingDuplicates</span> have to be set to
              <span class="code">false</span>.
            </li>
            <li>
              The class "ti-deletion-mark" is appended for a short time,
              if the user deletes a tag with backspace.
            </li>
            <li>
              The class "ti-valid" is added if a tag came through the validation,
              "ti-invalid" if not.
            </li>
          </ul>
          <p>
            Styles can also be changed with the property
            <span class="code">style</span> in an autocomplete item or a tag.
            But be aware that those styles have a high priority,
            because they will be set inline.
          </p>
        </div>
        <vue-tags-input
          v-model="tag"
          :tags="tags"
          :validation="validation"
          :autocomplete-items="filteredItems"
          class="light"
          @tags-changed="newTags => tags = newTags"
        />
      </section>
      <el-code :code="require('./example1.demo')" />
      <el-code lang="html" :code="require('./example1.demo.html')" />
    </div>
  </div>
</template>

<script>
import VueTagsInput from '@johmun/vue-tags-input';
import ElCode from '@components/el-code';
import BreakingChanges from '@components/breaking-changes';

export default {
  name: 'ExamplesStyling',
  components: {
    VueTagsInput,
    ElCode,
    BreakingChanges,
  },
  data() {
    return {
      tag: 'Also valid8ed',
      tags: [{
        text: 'custom class',
        classes: 'custom-class',
      }, {
        text: 'valid tag',
      }, {
        text: 'toShort',
      }, {
        text: 'duplicate',
      }, {
        text: 'duplicate',
      }, {
        text: 'Inline styled tag',
        style: 'color: #56c1da; background-color: transparent; border: 1px solid #56c1da',
      }],
      autocompleteItems: [{
        text: 'invalid',
      }, {
        text: 'Invalid cause of "1"',
      }, {
        text: 'valid item',
      }],
      validation: [{
        classes: 'min-length',
        rule: '^.{8,}$',
      }, {
        classes: 'no-numbers',
        rule: '^([^0-9]*)$',
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

<style lang="scss">

#app #styling-example {
  /* style the background and the text color of the input ... */
  .vue-tags-input {
    background: #283944;
  }

  .vue-tags-input .ti-new-tag-input {
    background: transparent;
    color: #b7c4c9;
  }

  .vue-tags-input .ti-input {
    padding: 4px 10px;
    transition: border-bottom 200ms ease;
  }

  /* we cange the border color if the user focuses the input */
  .vue-tags-input.ti-focus .ti-input {
    border: 1px solid #ebde6e;
  }

  /* some stylings for the autocomplete layer */
  .vue-tags-input .ti-autocomplete {
    background: #283944;
    border: 1px solid #8b9396;
    border-top: none;
  }

  /* the selected item in the autocomplete layer, should be highlighted */
  .vue-tags-input .ti-item.ti-selected-item {
    background: #ebde6e;
    color: #283944;
  }

  /* style the placeholders color across all browser */
  .vue-tags-input ::-webkit-input-placeholder {
    color: #a4b1b6;
  }

  .vue-tags-input ::-moz-placeholder {
    color: #a4b1b6;
  }

  .vue-tags-input :-ms-input-placeholder {
    color: #a4b1b6;
  }

  .vue-tags-input :-moz-placeholder {
    color: #a4b1b6;
  }

  /* default styles for all the tags */
  .vue-tags-input .ti-tag {
    position: relative;
    background: #ebde6e;
    color: #283944;
  }

  /* we defined a custom css class in the data model, now we are using it to style the tag */
  .vue-tags-input .ti-tag.custom-class {
    background: transparent;
    border: 1px solid #ebde6e;
    color: #ebde6e;
    margin-right: 4px;
    border-radius: 0px;
    font-size: 13px;
  }

  /* the styles if a tag is invalid */
  .vue-tags-input .ti-tag.ti-invalid {
    background-color: #e88a74;
  }

  /* if the user input is invalid, the input color should be red */
  .vue-tags-input .ti-new-tag-input.ti-invalid {
    color: #e88a74;
  }

  /* if a tag or the user input is a duplicate, it should be crossed out */
  .vue-tags-input .ti-duplicate span,
  .vue-tags-input .ti-new-tag-input.ti-duplicate {
    text-decoration: line-through;
  }

  .vue-tags-input .ti-tag:after {
    transition: transform .2s;
    position: absolute;
    content: '';
    height: 2px;
    width: 108%;
    left: -4%;
    top: calc(50% - 1px);
    background-color: #000;
    transform: scaleX(0);
  }

  .vue-tags-input .ti-deletion-mark:after {
    transform: scaleX(1);
  }
}
</style>

<style scoped lang="scss">
.explanation {
  ul {
    padding-left: 20px;
    list-style-type: disc;
  }
}
</style>
