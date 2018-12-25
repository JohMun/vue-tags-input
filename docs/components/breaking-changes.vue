<template lang="html">
  <div class="breaking-changes">
    <span class="title">Breaking changes</span>
    <p>
      <slot />
    </p>
    <span>
      Please checkout out the
      <router-link :to="{ path: '/migration'}">migration page</router-link>
      for further information
    </span>
  </div>
</template>

<script>
export default {
  name: 'BreakingChanges',
  props: {
    currentVersion: Number,
  },
};
</script>

<style scoped lang="scss">
.breaking-changes {
  background: #fffcdd;
  border: 1px solid #fffac1;
  padding: 6px 12px;
  font-size: 0.9em;
  color: #826328;
}

.title {
  font-weight: bold;
}

p {
  margin: 0px;
  margin-top: 4px;
}

a {
  font-weight: 400;
}
</style>
