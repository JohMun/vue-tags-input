<template>
  <div ref="app" id="app">
    <main class="pagewidth">
      <basic-demo></basic-demo>
    </main>
  </div>
</template>

<script>
import './app-style.scss';
import BasicDemo from './pages/basic-demo';

export default {
  name: 'app',
  components: {
    BasicDemo,
  },
};
</script>

<style lang="scss" scoped>
#app {
  width: 100%;
}
</style>
