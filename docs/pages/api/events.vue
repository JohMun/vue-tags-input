<template lang="html">
  <div class="events page">
    <div class="content">
      <ul>
        <div class="docs-item" v-for="(e, index) in events" :key="index">
          <docs-item :item="e"></docs-item>
        </div>
      </ul>
    </div>
  </div>
</template>

<script>
import DocsItem from '../../components/docs-item';

export default {
  name: 'Events',
  components: {
    DocsItem,
  },
  data() {
    return {
      events: [{
        name: 'tag-clicked',
        type: 'Event',
        parameters: [{
          type: 'Object',
          name: 'tag',
        }, {
          type: 'Number',
          name: 'index',
        }],
      }, {
        name: 'tags-changed',
        type: 'Event',
        parameters: [{
          type: 'Array',
          name: 'tags',
        }],
      }, {
        name: 'saving-duplicate',
        type: 'Event',
        parameters: [{
          type: 'Object',
          name: 'tag',
        }],
      }, {
        name: 'adding-duplicate',
        type: 'Event',
      }, {
        name: 'max-tags-reached',
        type: 'Event',
      }, {
        name: 'before-adding-tag',
        type: 'Event / Hook',
        description: 'Lorem ipsum dolor sit amet ...',
        parameters: [{
          type: 'Object',
        }],
      }, {
        name: 'before-editing-tag',
        type: 'Event / Hook',
        description: 'Lorem ipsum dolor sit amet ...',
        parameters: [{
          type: 'Object',
        }],
      }, {
        name: 'before-deleting-tag',
        type: 'Event / Hook',
        description: 'Lorem ipsum dolor sit amet ...',
        parameters: [{
          type: 'Object',
        }],
      }, {
        name: 'before-saving-tag',
        type: 'Event / Hook',
        description: 'Lorem ipsum dolor sit amet ...',
        parameters: [{
          type: 'Object',
        }],
      }],
    };
  },
};
</script>

<style lang="scss" scoped>
</style>
