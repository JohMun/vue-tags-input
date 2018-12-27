<template lang="html">
  <section class="template-example-1">
    <h2>Slot: tag-left & autocomplete-item</h2>
    <p>
      Templates are a powerful tool to customize tags input even more.
      In this example we use the slots
      <span class="code">tag-left</span> and
      <span class="code">autocompleteItem</span> to insert
      <a href="https://material.io/icons/" target="_blanc">material icons</a>
      on the left of each tag and autocomplete item. The property
      <span class="code">allow-edit-tags</span> is set to <span class="code">true</span>,
      to enable editing tags after creation.
    </p>
    <p>
      Via <span class="code">slot-scope</span> we access some properties and helper functions.
      The autocomplete item slot for example, gets the <span class="code">performAdd</span>
      function, which adds a new tag to the collection by passing an index.
      You can read the <router-link :to="{ path: '/api/slots' }">documentations</router-link>
      for further information.
    </p>
    <vue-tags-input
      v-model="tag"
      :tags="tags"
      :allow-edit-tags="true"
      :autocomplete-items="items"
      class="tags-input"
      @tags-changed="newTags => tags = newTags"
    >
      <div
        slot="autocomplete-item"
        slot-scope="props"
        class="my-item"
        @click="props.performAdd(props.item)"
      >
        <i class="material-icons" :style="{ color: props.item.iconColor }">
          {{ props.item.text }}
        </i>{{ props.item.text }}
      </div>
      <div
        slot="tag-left"
        slot-scope="props"
        class="my-tag-left"
        @click="props.performOpenEdit(props.index)"
      >
        <i class="material-icons" :style="{ color: props.tag.iconColor }">
          {{ props.tag.text }}
        </i>
      </div>
    </vue-tags-input>
    <el-code lang="html" :code="require('./example1.demo.html')" />
    <el-code :code="require('./example1.demo.js')" />
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
      tag: '',
      tags: [],
    };
  },
  computed: {
    items() {
      return this.icons.filter(i => {
        return i.text.toLowerCase().indexOf(this.tag.toLowerCase()) !== -1;
      });
    },
  },
};
</script>

<style lang="scss">
@import 'colors';
#app .template-example-1 .tags-input {
  margin-top: 15px;

  .ti-input {
    min-height: 46px;
  }

  li.ti-tag {
    background-color: #E6E6E6;
    color: #000;
    border-radius: 12px;
    padding: 4px 8px;
  }

  .ti-tag input {
    color: #000;
  }

  .ti-tag-left {
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

  .ti-deletion-mark {
    background-color: $error;
  }
}
</style>
