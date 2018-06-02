<template lang="html">
  <div class="props page">
    <div class="content">
      <h1>Props</h1>
      <ul>
        <li class="docs-item" v-for="(p, index) in props" :key="index">
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
  name: 'props',
  components: {
    AutoDocsItem,
  },
  data() {
    return {
      props: sortBy(window.docs.props, 'name'),
    };
  },
};
</script>
