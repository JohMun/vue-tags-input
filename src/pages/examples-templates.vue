<template lang="html">
  <div class="examples-templates">
    <h1>Templating</h1>
    <p>
      Templates are a powerful tool to customize tags or autocomplete items.
      <!-- sagen das material icon font verwendet wird -->
    </p>
    <vue-tags-input
      class="tags-input"
      v-model="tag"
      :tags="tags"
      :allow-edit-tags="true"
      @tags-changed="newTags => tags = newTags"
      :autocomplete-items="items">
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
      {{ tagText }}
    &lt;/i&gt;{{ tagText }}
  &lt;/div&gt;
  &lt;div
    slot=&quot;tagLeft&quot;
    class=&quot;my-tag-left&quot;
    slot-scope=&quot;props&quot;
    @click=&quot;props.performOpenEdit(props.index)&quot;&gt;
    &lt;i class=&quot;material-icons&quot; :style=&quot;{ color: props.tag.iconColor }&quot;&gt;
      {{ itemText }}
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
  height: 48px;
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
  </div>
</template>

<script>
import VueTagsInput from '../components/vue-tags-input';
import ElCode from '../components/el-code';

export default {
  name: 'ExamplesTemplates',
  components: {
    VueTagsInput,
    ElCode,
  },
  data() {
    return {
      itemText: '{{ props.item.text }}',
      tagText: '{{ props.tag.text }}',
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
};
</script>

<style lang="scss">
@import '~colors';
.examples-templates {
  .tags-input .input {
    height: 48px;
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
    background-color: $error;
  }
}
</style>

<style lang="scss" scoped>
.tags-input {
  margin-top: 15px;
}
</style>
