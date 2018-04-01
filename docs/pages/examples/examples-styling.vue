<template>
  <div>
    <section id="styling-example">
      <div class="explanation">
        <h1>Styling Elements</h1>
        <p>
          You can add CSS classes to tags, the input element or
          to autocomplete items, in the following ways:
        </p>
        <ul>
          <li>
            In a validation item, the value of the property
            <span class="code">type</span>
            is added as class, if the rule match.</li>
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
            The class "duplicate" is added if an element exists twice.
            Duplicates can't be added by default. To achieve that, The property
            <span class="code">avoidAddingDuplicates</span> have to be set to
            <span class="code">false</span>.
          </li>
          <li>
            The class "deletion-mark" is appended for a short time,
            if the user deletes a tag with backspace.
          </li>
          <li>
            The class "valid" is added if a tag came through the validation,
            "invalid" if not.
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
        @tags-changed="newTags => tags = newTags">
      </vue-tags-input>
    </section>
    <el-code class="javascript">
      <code>
/* Other stuff before, like template, import tagsinput ... */

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
      type: 'min-length',
      rule: '^.{8,}$',
    }, {
      type: 'no-numbers',
      rule: '^([^0-9]*)$',
    }],
  };
},

/* Computed properties, methods and more ... */
      </code>
    </el-code>
    <el-code class="css">
      <code>
&lt;style lang=&quot;css&quot;&gt;

.vue-tags-input .input {
  padding: 4px 10px;
  border: none;
  border-bottom: 1px solid #ccc;
}

.tag {
  position: relative;
}

.tag.valid {
  background-color: #04B404;
}

.tag.custom-class {
  background-color: #fff;
  color: rgba(100 ,100, 100, 1);
  font-weight: bold;
  text-transform: uppercase;
  box-shadow: 2px 2px 0px 0px rgba(100, 100, 100, 1);
  margin-right: 4px;
  border: 1px solid rgba(100, 100, 100, 1);
  border-radius: 0px;
  font-size: 13px;
}

.tag.no-numbers {
  background-color: #FE9A2E;
}

.duplicate {
  text-decoration: line-through;
}

.new-tag-input.invalid, .item.invalid {
  color: #e54d42;
}

.new-tag-input.no-numbers, .item.no-numbers {
  color: #FE9A2E;
}

.tag:after {
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

.deletion-mark :after {
  transform: scaleX(1);
}

&lt;/style&gt;
      </code>
    </el-code>
  </div>
</template>

<script>
import VueTagsInput from '../../../vue-tags-input/vue-tags-input';
import ElCode from '../../components/el-code';

export default {
  name: 'ExamplesStyling',
  components: {
    VueTagsInput,
    ElCode,
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
        type: 'min-length',
        rule: '^.{8,}$',
      }, {
        type: 'no-numbers',
        rule: '^([^0-9]*)$',
      }],
    };
  },
  computed: {
    filteredItems() {
      return this.autocompleteItems.filter(i => {
        return new RegExp(this.tag, 'i').test(i.text);
      });
    },
  },
};
</script>

<style lang="scss">

#styling-example {
  .vue-tags-input .input {
    padding: 4px 10px;
    border: none;
    border-bottom: 1px solid #ccc;
  }

  .tag.valid {
    background-color: #04B404;
  }

  .tag.custom-class {
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

  .tag.no-numbers {
    background-color: #FE9A2E;
  }

  .duplicate {
    text-decoration: line-through;
  }

  .new-tag-input.invalid, .item.invalid {
    color: #e54d42;
  }

  .new-tag-input.no-numbers, .item.no-numbers {
    color: #FE9A2E;
  }

  .tag {
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

  .deletion-mark {
    &:after {
      transform: scaleX(1);
    }
  }
}
</style>

<style scoped lang="scss">
span, p {
  line-height: 1.5em;
  max-width: 900px;
}

.explanation {
  ul {
    padding-left: 20px;
    list-style-type: disc;
  }
}
</style>
