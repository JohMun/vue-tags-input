<template lang="html">
  <div class="events page">
    <div class="content">
      <h1>Events</h1>
      <ul>
        <li class="docs-item" v-for="(p, index) in events" :key="index">
          <auto-docs-item :item="p" />
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import AutoDocsItem from '../../components/auto-docs-item';
import sortBy from 'lodash/sortBy';

export default {
  name: 'Events',
  components: {
    AutoDocsItem,
  },
  data() {
    return {
      events: sortBy(window.docs.events, 'name'),
    };
  },
};
</script>

<style lang="scss" scoped>
</style>
