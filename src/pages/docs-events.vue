<template lang="html">
  <div class="docs-events">
    <ul>
      <li>tag-clicked</li>
      <li>tags-changed</li>
      <li>saving-duplicate</li>
      <li>adding-duplicate</li>
      <li>max-tags-reached</li>
      <li>before-adding-tag</li>
      <li>before-editing-tag</li>
      <li>before-deleting-tag</li>
      <li>before-saving-tag</li>
    </ul>
    <ul>
      <div class="docs-item" v-for="(e, index) in events" :key="index">
        <docs-item :item="e"></docs-item>
      </div>
    </ul>
  </div>
</template>

<script>
import DocsItem from '../components/docs-item';

export default {
  name: 'DocsEvents',
  components: {
    DocsItem,
  },
  data() {
    return {
      events: [{
        name: 'before-adding-tag',
        type: 'Event / Hook',
        description: `Lorem ipsum dolor sit amet, consetetur sadipscing elitr,
          sed diam nonumy eirmod tempor invidunt`,
        parameters: [{
          index: 0,
          type: 'Object',
          description: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr',
        }],
      }, {
        name: 'before-editing-tag',
        type: 'Event / Hook',
        description: `Lorem ipsum dolor sit amet, consetetur sadipscing elitr,
          sed diam nonumy eirmod tempor invidunt`,
        parameters: [{
          index: 1,
          type: 'Object',
          description: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr',
        }],
      }],
    };
  },
};
</script>

<style lang="scss" scoped>
</style>
