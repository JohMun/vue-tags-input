<template lang="html">
  <div class="events page">
    <div class="content">
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

export default {
  name: 'Events',
  components: {
    AutoDocsItem,
  },
  data() {
    return {
      events: window.docs.events,
    };
  },
};
</script>

<style lang="scss" scoped>
</style>
