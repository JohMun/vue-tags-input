<template>
  <div ref="app" id="app">
    <el-navbar @close-nav="navVisible = false" class="navbar" :class="{visible: navVisible }" />
    <main ref="scrollArea">
      <div class="content">
        <header>
          <div class="menu-toggle">
            <i class="material-icons" @click="navVisible = true">menu</i>
          </div>
          <div>
            <a class="gt-link" href="https://github.com/JohMun/vue-tags-input" target="_blank">
              <img src="./assets/img/github.png" alt="github logo" />
              <span>Visit On Github</span>
            </a>
          </div>
        </header>
        <router-view class="page-content" />
      </div>
    </main>
  </div>
</template>

<script>
import './app-style.scss';
import ElNavbar from './components/el-navbar';

export default {
  name: 'app',
  components: {
    ElNavbar,
  },
  data() {
    return {
      navVisible: false,
    };
  },
  methods: {
    scrollTop() {
      setTimeout(() => this.$refs.scrollArea.scrollTop = 0, 10);
    },
  },
  watch: {
    '$route': 'scrollTop',
  },
};
</script>

<style lang="scss" scoped>
#app {
  width: 100%;
  display: flex;
  height: 100%;
}

@media (max-width: 940px) {
  .navbar {
    transition: transform .4s ease-in-out;
    transform: translateX(-100%);

    &.visible {
      transform: translateX(0%);
    }
  }
}

main {
  flex: 1 0 calc(100% - 350px);
  flex-direction: column;
  height: 100%;
  width: 100%;
  overflow-y: scroll;
}

@media (max-width: 1280px) {
  main {
    flex: 1 0 calc(100% - 280px);
  }
}

@media (max-width: 940px) {
  main {
    flex: 1 0 100%;
  }
}

.content {
  flex: 1 0 auto;
  flex-direction: column;
}

header {
  display: flex;
  justify-content: space-between;
  height: 120px;
  padding: 0 40px;
  font-size: 14px;

  .menu-toggle i {
    font-size: 32px;
    cursor: pointer;
    display: none;
  }

  @media (max-width: 940px) {
    .menu-toggle i {
      display: block;
    }
  }

  > div {
    display: flex;
    justify-content: center;
    flex-direction: column;
  }
}

@media (max-width: 600px) {
  header {
    position:fixed;
    background-color: #fff;
    width: 100%;
    height: 50px;
    z-index: 2;
  }
}

.gt-link {
  display: flex;
  align-items: center;
  font-size: 14px;

  img {
    width: 24px;
  }

  span {
    margin-left: 6px;
  }
}

.page-content {
  flex: 1 0 auto;
  padding: 20px 40px 40px 40px;
}

</style>
