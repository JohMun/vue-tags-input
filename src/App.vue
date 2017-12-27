<template>
  <div ref="app" id="app">
    <main class="pagewidth">
      <basic-demo></basic-demo>
      <hr />
      <getting-started></getting-started>
    </main>
  </div>
</template>

<script>
import './app-style.scss';
import BasicDemo from './pages/basic-demo';
import GettingStarted from './pages/getting-started';

export default {
  name: 'app',
  components: {
    BasicDemo,
    GettingStarted,
  },
};
</script>

<style lang="scss" scoped>
#app {
  width: 100%;
}
</style>
