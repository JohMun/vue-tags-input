<template lang="html">
  <div class="events page">
    <div class="content">
      <h1>{{ type }}</h1>
      <ul>
        <li v-for="(p, index) in items" :key="index" class="docs-item">
          <slot-docs-item v-if="type === 'slots'" :item="p" />
          <auto-docs-item v-else :item="p" />
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import AutoDocsItem from '@components/auto-docs-item';
import sortBy from 'lodash/sortBy';
import SlotDocsItem from '@components/slot-docs-item';

export default {
  name: 'GenericApiPage',
  components: {
    AutoDocsItem,
    SlotDocsItem,
  },
  computed: {
    type() {
      return this.$route.meta.type;
    },
    items() {
      return sortBy(window.docs[this.type], 'name');
    },
  },
};
</script>

<style lang="scss" scoped>
h1 {
  text-transform: capitalize;
}
</style>
