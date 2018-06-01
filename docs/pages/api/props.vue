<template lang="html">
  <div class="props page">
    <div class="content">
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

export default {
  name: 'props',
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
