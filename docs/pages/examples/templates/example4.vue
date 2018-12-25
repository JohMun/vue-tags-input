<template lang="html">
  <section>
    <h2>Slot: autocomplete-header & autocomplete-footer</h2>
    <vue-tags-input
      v-model="tag"
      placeholder="Type something"
      :tags="tags"
      :allow-edit-tags="true"
      :add-only-from-autocomplete="true"
      :autocomplete-items="bikeMakers"
      class="tags-input"
      @tags-changed="newTags => tags = newTags"
    >
      <template slot="autocomplete-header">
        <strong>Select your favorite bike maker ↓</strong>
      </template>
      <template slot="autocomplete-footer">
        <small>
          <em>Or keep going with your worlds...</em>
        </small>
      </template>
    </vue-tags-input>
    <el-code :code="require('./example4.demo.html')" lang="html" />
    <el-code :code="require('./example4.demo.js')" />
  </section>
</template>

<script>
import ElCode from '@components/el-code';
import VueTagsInput from '@johmun/vue-tags-input';

export default {
  components: {
    VueTagsInput,
    ElCode,
  },
  data() {
    return {
      tag: '',
      tags: [],
      bikeMakers: [{
        text: 'Honda',
      }, {
        text: 'Yamaha',
      }, {
        text: 'Suzuki',
      }, {
        text: 'Triumph',
      }, {
        text: 'Kawasaki',
      }, {
        text: 'Triumph',
      }, {
        text: 'husqvarna',
      }],
    };
  },
};
</script>
