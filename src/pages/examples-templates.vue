<template lang="html">
  <div class="examples-templates">
    <h1>Templating</h1>
    <p>
      Explain what we see here. tags can be changed to some material icon definition e.g. reorder, work
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
        @click="props.performOpenEdit(props.index, props.tag)">
        <i class="material-icons" :style="{ color: props.tag.iconColor }">
          {{props.tag.text}}
        </i>
      </div>
    </vue-tags-input>
    <section>
      <h2>Tags</h2>
      <h3>Slots:</h3>
      <span class="code">tagLeft</span>
      <span class="code">tagRight</span>
      <span class="code">tagActions</span>
      <h3>Slot props</h3>
      <ul>
        <li><span class="code">tag - object</span></li>
        <li><span class="code">index - number</span></li>
        <li><span class="code">edit - boolean</span></li>
        <li><span class="code">deletion-mark- boolean</span></li>
        <li><span class="code">performDelete - function - expect: index, tag</span></li>
        <li><span class="code">performOpenEdit - function - expect: index, tag</span></li>
        <li><span class="code">performCancelEdit - function - expect: index, tag</span></li>
        <li><span class="code">performSaveEdit - function - expect: index, tag</span></li>
      </ul>
    </section>
    <section>
      <h2>Automcomplete-items</h2>
      <h3>Slots</h3>
      <span class="code">autocompleteItem</span>
      <h3>Slot props</h3>
      <ul>
        <li><span class="code">item - object</span></li>
        <li><span class="code">index - number</span></li>
        <li><span class="code">selected - boolean</span></li>
        <li><span class="code">performAdd - function - expect: item</span></li>
      </ul>
    </section>
  </div>
</template>

<script>
import VueTagsInput from '../components/vue-tags-input';

export default {
  name: 'ExamplesTemplates',
  components: {
    VueTagsInput,
  },
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
};
</script>

<style lang="scss">
@import '~colors';

.vue-tags-input .input {
  height: 48px;
}

.examples-templates .tag.tag {
  background-color: #F2F2F2;
  color: #000;
}

.tag-left {
  margin-right: 5px;
}

.my-item, .my-tag-left {
  display: flex;
  align-items: center;
}

.my-tag-left {
  max-width: 30px;
  width: 30px;
}

.my-item i {
  margin-right: 5px;
}

.deletion-mark.deletion-mark {
  background-color: $error;
}
</style>

<style lang="scss" scoped>
.tags-input {
  margin-top: 15px;
}
</style>
