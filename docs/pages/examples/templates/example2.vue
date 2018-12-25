<template>
  <section class="template-example-2">
    <h2>Slot: tag-center (experimental) with select</h2>
    <vue-tags-input
      v-model="tag"
      :tags="tags"
      :allow-edit-tags="true"
      :add-only-from-autocomplete="true"
      :autocomplete-items="items"
      class="tags-input"
      @tags-changed="newTags => tags = newTags"
    >
      <div slot="tag-center" slot-scope="props">
        <span
          v-if="!props.edit"
          @click="props.performOpenEdit(props.index)"
        >
          {{ props.tag.text }}
        </span>
        <div v-else class="inputs">
          <select
            v-model="props.tag.text"
            @change="props.validateTag(props.index)"
          >
            <option v-for="(animal, index) in animals" :key="index">{{ animal }}</option>
          </select>
          <i class="material-icons" @click="props.performSaveEdit(props.index)">check</i>
        </div>
      </div>
    </vue-tags-input>
    <el-code :code="tagCode" />
    <el-code lang="html" :code="require('./example2.demo.html')" />
    <el-code :code="require('./example2.demo.js')" />
    <el-code :code="require('./example2.demo.css')" />
  </section>
</template>

<script>
import VueTagsInput from '@johmun/vue-tags-input';
import ElCode from '@components/el-code';
import TagInput from '@tag-input';

export default {
  name: 'ExamplesTemplates',
  components: {
    VueTagsInput,
    ElCode,
    TagInput,
  },
  data() {
    return {
      animals: ['Lion', 'Turtle', 'Rabbit', 'Frog', 'Squirrel', 'Owl', 'Bee'],
      tag: '',
      tags: [],
    };
  },
  computed: {
    tagCode() {
      return JSON.stringify(this.tags);
    },
    items() {
      return this.animals
        .filter(a => {
          return a.toLowerCase().indexOf(this.tag.toLowerCase()) !== -1;
        })
        .map(a => ({ text: a }));
    },
  },
};
</script>

<style lang="scss">
.template-example-2 .tags-input .inputs {
  display: flex;

  i {
    font-size: 20px;
    cursor: pointer;
  }
}
</style>
