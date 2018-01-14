<template lang="html">
  <div class="examples-templates">
    <h1>Templating</h1>
    <p>
      Templates are a powerful tool to customize tags or autocomplete items.
      <!-- sagen das material icon font verwendet wird -->
    </p>
    <vue-tags-input
      class="tags-input-1"
      v-model="example1.tag"
      :tags="example1.tags"
      :allow-edit-tags="true"
      @tags-changed="newTags => example1.tags = newTags"
      :autocomplete-items="items1">
      <div
        slot="autocompleteItem"
        class="my-item"
        slot-scope="props"
        @click="props.performAdd(props.item)">
        <i class="material-icons" :style="{ color: props.item.iconColor }">
          {{ props.item.text }}
        </i>{{ props.item.text }}
      </div>
      <div
        slot="tagLeft"
        class="my-tag-left"
        slot-scope="props"
        @click="props.performOpenEdit(props.index)">
        <i class="material-icons" :style="{ color: props.tag.iconColor }">
          {{props.tag.text}}
        </i>
      </div>
    </vue-tags-input>
    <el-code class="html">
      <code>
&lt;vue-tags-input
  class=&quot;tags-input&quot;
  v-model=&quot;tag&quot;
  :tags=&quot;tags&quot;
  :allow-edit-tags=&quot;true&quot;
  @tags-changed=&quot;newTags =&gt; tags = newTags&quot;
  :autocomplete-items=&quot;items&quot;&gt;
  &lt;div
    slot=&quot;autocompleteItem&quot;
    class=&quot;my-item&quot;
    slot-scope=&quot;props&quot;
    @click=&quot;props.performAdd(props.item)&quot;&gt;
    &lt;i class=&quot;material-icons&quot; :style=&quot;{ color: props.item.iconColor }&quot;&gt;
      {{ example1.tagText }}
    &lt;/i&gt;{{ example1.tagText }}
  &lt;/div&gt;
  &lt;div
    slot=&quot;tagLeft&quot;
    class=&quot;my-tag-left&quot;
    slot-scope=&quot;props&quot;
    @click=&quot;props.performOpenEdit(props.index)&quot;&gt;
    &lt;i class=&quot;material-icons&quot; :style=&quot;{ color: props.tag.iconColor }&quot;&gt;
      {{ example1.itemText }}
    &lt;/i&gt;
  &lt;/div&gt;
&lt;/vue-tags-input&gt;
      </code>
    </el-code>
    <el-code class="javascript">
      <code>
/* Other stuff before, like template, import tagsinput ... */

data() {
  return {
    tag: '',
    tags: [],
    icons: [{
      text: 'done',
      iconColor: '#086A87',
    }, {
      text: 'fingerprint',
      iconColor: '#8A0886',
    }, {
      text: 'label',
      iconColor: '#B43104',
    }, {
      text: 'pregnant_woman',
    }, {
      text: 'touch_app',
      iconColor: '#AC58FA',
    }, {
      text: 'group_work',
    }, {
      text: 'pets',
      iconColor: '#8A4B08',
    }],
  };
},
computed: {
  items() {
    return this.icons.filter(i => new RegExp(this.tag, 'i').test(i.text));
  },
},
      </code>
    </el-code>
    <el-code class="css">
      <code>
.tags-input .input {
  min-height: 44px;
}

.tags-input .tag.tag {
  background-color: #F2F2F2;
  color: #000;
}

.tags-input .tag-left {
  margin-right: 2px;
  width: 24px;
}

.tags-input .my-item, .tags-input  .my-tag-left {
  display: flex;
  align-items: center;
}

.tags-input  .my-item i {
  margin-right: 5px;
}

.tags-input .deletion-mark {
  background-color: #e54d42;
}
      </code>
    </el-code>
    <h2>Slot: tagCenter - select</h2>
    <vue-tags-input
      class="tags-input-2"
      v-model="example2.tag"
      :tags="example2.tags"
      :allow-edit-tags="true"
      :add-only-from-autocomplete="true"
      @tags-changed="newTags => example2.tags = newTags"
      :autocomplete-items="items2">
      <div slot="tagCenter" slot-scope="props">
        <span
          @click="props.performOpenEdit(props.index)"
          v-if="!props.edit">{{ props.tag.text }}
        </span>
        <div class="inputs" v-else>
          <select
            v-model="props.tag.text"
            @change="props.createdChangedTag(props.index, props.tag)">
            <option v-for="(animal, index) in animals" :key="index">{{ animal }}</option>
          </select>
          <i class="material-icons" @click="props.performSaveTag(props.index)">check</i>
        </div>
      </div>
    </vue-tags-input>
    <el-code :code="example2.tags"></el-code>
    <el-code class="html">
      <code>
&lt;vue-tags-input
  class=&quot;tags-input&quot;
  v-model=&quot;tag&quot;
  :tags=&quot;tags&quot;
  :allow-edit-tags=&quot;true&quot;
  :add-only-from-autocomplete=&quot;true&quot;
  @tags-changed=&quot;newTags =&gt; tags = newTags&quot;
  :autocomplete-items=&quot;items&quot;&gt;
  &lt;div slot=&quot;tagCenter&quot; slot-scope=&quot;props&quot;&gt;
    &lt;span
      @click=&quot;props.performOpenEdit(props.index)&quot;
      v-if=&quot;!props.edit&quot;&gt;{{ example2.tagText }}
    &lt;/span&gt;
    &lt;div class=&quot;inputs&quot; v-else&gt;
      &lt;select
        v-model=&quot;props.tag.text&quot;
        @change=&quot;props.createdChangedTag(props.index, props.tag)&quot;&gt;
        &lt;option v-for=&quot;(animal, index) in animals&quot; :key=&quot;index&quot;&gt;{{ example2.animal }}&lt;/option&gt;
      &lt;/select&gt;
      &lt;i class=&quot;material-icons&quot; @click=&quot;props.performSaveTag(props.index)&quot;&gt;check&lt;/i&gt;
    &lt;/div&gt;
  &lt;/div&gt;
&lt;/vue-tags-input&gt;
      </code>
    </el-code>
    <el-code class="javascript">
      <code>
data() {
  return {
    animals: [
      'Lion', 'Turtle', 'Rabbit', 'Frog', 'Squirrel', 'Owl', 'Bee',
    ],
    tag: '',
    tags: [],
  };
},
computed: {
  items() {
    return this.animals
      .filter(a => new RegExp(this.tag, 'i').test(a))
      .map(a => {
        return { text: a };
      });
  },
},
      </code>
    </el-code>
    <el-code class="css">
      <code>
.tags-input .inputs {
  display: flex;

  i {
    font-size: 20px;
    cursor: pointer;
  }
}
      </code>
    </el-code>
    <h2>Slot: tagCenter - input helper</h2>
    <p>
      This is the default behaviour recreated with the slot.
      The component <span class="code">tag-input</span> is a helper to fastly build
      the standard text input.
    </p>
    <el-code class="html">
      <code>
&lt;vue-tags-input
  v-model=&quot;tag&quot;
  :tags=&quot;tags&quot;
  :allow-edit-tags=&quot;true&quot;
  @tags-changed=&quot;newTags =&gt; tags = newTags&quot;&gt;
  &lt;div slot=&quot;tagCenter&quot; slot-scope=&quot;props&quot;&gt;
    &lt;span
      @click=&quot;props.performOpenEdit(props.index)&quot;
      :class=&quot;{ hidden: props.edit }&quot;&gt;{{ example2.tagText }}
    &lt;/span&gt;
    &lt;tag-input :scope=&quot;props&quot; /&gt;
  &lt;/div&gt;
&lt;/vue-tags-input&gt;
      </code>
    </el-code>
    <el-code class="javascript">
      <code>
import TagInput from '../components/tag-input';

export default {
  components: {
    TagInput,
  },
  data() {
    return {
      tag: '',
      tags: [],
    };
  }
      </code>
    </el-code>
  </div>
</template>

<script>
import VueTagsInput from '../components/vue-tags-input';
import ElCode from '../components/el-code';
import TagInput from '../components/tag-input';

export default {
  name: 'ExamplesTemplates',
  components: {
    VueTagsInput,
    ElCode,
    TagInput,
  },
  data() {
    return {
      animals: [
        'Lion', 'Turtle', 'Rabbit', 'Frog', 'Squirrel', 'Owl', 'Bee',
      ],
      icons: [{
        text: 'done',
        iconColor: '#086A87',
      }, {
        text: 'fingerprint',
        iconColor: '#8A0886',
      }, {
        text: 'label',
        iconColor: '#B43104',
      }, {
        text: 'pregnant_woman',
      }, {
        text: 'touch_app',
        iconColor: '#AC58FA',
      }, {
        text: 'group_work',
      }, {
        text: 'pets',
        iconColor: '#8A4B08',
      }],
      example1: {
        itemText: '{{ props.item.text }}',
        tagText: '{{ props.tag.text }}',
        tag: '',
        tags: [],
      },
      example2: {
        tagText: '{{ props.tag.text }}',
        animal: '{{ animal }}',
        tag: '',
        tags: [],
      },
    };
  },
  computed: {
    items1() {
      return this.icons.filter(i => new RegExp(this.example1.tag, 'i').test(i.text));
    },
    items2() {
      return this.animals
        .filter(a => new RegExp(this.example2.tag, 'i').test(a))
        .map(a => {
          return { text: a };
        });
    },
  },
};
</script>

<style lang="scss">
@import '~colors';
.examples-templates {

  .tags-input-2 .inputs {
    display: flex;

    i {
      font-size: 20px;
      cursor: pointer;
    }
  }

  .tags-input-1 {
    .input {
      min-height: 44px;
    }

    .tag.tag {
      background-color: #F2F2F2;
      color: #000;
    }

    .tag-left {
      margin-right: 2px;
      width: 24px;
    }

    .my-item, .my-tag-left {
      display: flex;
      align-items: center;
    }

    .my-item i {
      margin-right: 5px;
    }

    .deletion-mark {
      background-color: $error;
    }
  }
}
</style>

<style lang="scss" scoped>
span, p {
  line-height: 1.5em;
  max-width: 900px;
}

.tags-input-1  {
  margin-top: 15px;
}
</style>
