<template>
  <div class="page">
    <div class="content">
      <section id="styling-example">
        <div class="explanation">
          <h1>Styling Elements</h1>
          <breaking-changes :current-version="2">
            All css classes vue-tags-input is using, are prefixed with 'ti-'. For example:
            <ul>
              <li>V1: 'duplicate' or 'item'</li>
              <li>V2: 'ti-duplicate' or 'ti-item'</li>
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
        text: '8 is invalid',
      }, {
        text: 'duplicate',
      }, {
        text: 'duplicate',
      }, {
        text: 'Inline style',
        style: 'color: #000; background-color: transparent; border: 1px solid #ccc',
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

#styling-example {
  .vue-tags-input .ti-input {
    padding: 4px 10px;
    border: none;
    transition: border-bottom 100ms ease;
    border-bottom: 1px solid #ccc;
  }

  .vue-tags-input.ti-focus .ti-input {
    border-bottom: 1px solid #333;
  }

  .ti-tag.ti-valid {
    background-color: #04B404;
  }

  .ti-tag.custom-class {
    background-color: #fff;
    color: rgba(100,100,100,1);
    font-weight: bold;
    text-transform: uppercase;
    box-shadow: 2px 2px 0px 0px rgba(100,100,100,1);
    margin-right: 4px;
    border: 1px solid rgba(100,100,100,1);
    border-radius: 0px;
    font-size: 13px;
  }

  .ti-tag.no-numbers {
    background-color: #FE9A2E;
  }

  .ti-duplicate {
    text-decoration: line-through;
  }

  .ti-new-tag-input.ti-invalid, .ti-item.ti-invalid {
    color: #e54d42;
  }

  .ti-new-tag-input.no-numbers, .ti-item.no-numbers {
    color: #FE9A2E;
  }

  .ti-tag {
    position: relative;

    &:after {
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
  }

  .ti-deletion-mark {
    &:after {
      transform: scaleX(1);
    }
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
