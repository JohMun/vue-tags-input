<template lang="html">
  <div class="breaking-changes">
    <i class="material-icons">info</i>
    <div class="content">
      <span class="title">Breaking changes</span>
      <p>
        <slot />
      </p>
      <span class="further-info">
        Please check out the
        <router-link :to="{ path: '/migration'}">migration page</router-link>
        for further information
      </span>
    </div>
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
@import 'colors';

.breaking-changes {
  padding: 12px;
  display: flex;
  align-items: center;
  border: 1px solid $grey;
  border-radius: 12px;

  > i {
    font-size: 34px;
  }
}

.content {
  margin-left: 15px;
}

.title {
  color: $primary;
  font-weight: 500;
}

.further-info {
  margin-top: 5px;
  font-size: 0.85em;
  color: $grey;
}

p {
  margin: 0px;
  margin-top: 4px;
}

a {
  font-weight: 500;
}
</style>
