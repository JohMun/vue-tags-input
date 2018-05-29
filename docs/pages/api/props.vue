<template lang="html">
  <div class="docs-props">
    <ul>
      <div class="docs-item" v-for="(p, index) in props" :key="index">
        <auto-docs-item :item="p" />
      </div>
    </ul>
  </div>
</template>

<script>
import AutoDocsItem from '../../components/auto-docs-item';

export default {
  name: 'DocsProps',
  components: {
    AutoDocsItem,
  },
  data() {
    return {
      props: window.docs.props,
    };
  },
};
</script>
