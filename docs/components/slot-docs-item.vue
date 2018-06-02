<template lang="html">
  <div class="slot-docs-item">
    {{ item }}
  </div>
</template>

<script>
export default {
  name: 'SlotDocsItem',
  props: {
    item: {
      type: Object,
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
