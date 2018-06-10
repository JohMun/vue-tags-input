<template lang="html">
  <div class="slots page">
    <div class="content">
      <h1>Slots</h1>
      <ul>
        <li class="docs-item" v-for="(s, index) in slots" :key="index">
          <slot-docs-item :item="s" />
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import sortBy from 'lodash/sortBy';
import SlotDocsItem from '../../components/slot-docs-item';

export default {
  name: 'Slots',
  components: {
    SlotDocsItem,
  },
  data() {
    return {
      slots: sortBy(window.docs.slots),
    };
  },
};
</script>

<style lang="scss" scoped>

.other-slots {
  margin-top: 60px;
}
</style>
