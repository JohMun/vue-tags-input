<template>
  <div id="app" ref="app">
    <el-navbar
      :class="{visible: navVisible }"
      class="navbar"
      @close-nav="navVisible = false"
    />
    <main ref="scrollArea">
      <div class="content">
        <header>
          <div class="menu-toggle">
            <i class="material-icons" @click="navVisible = true">menu</i>
          </div>
          <div>
            <a class="gt-link" href="https://github.com/JohMun/vue-tags-input" target="_blank">
              <github-icon />
              <span>{{ stars }}</span>
              <i class="material-icons">star</i>
            </a>
          </div>
        </header>
        <transition name="fade" mode="out-in">
          <router-view class="main-content" />
        </transition>
      </div>
    </main>
  </div>
</template>

<script>
import './app-style.scss';
import './vue-tags-input-dark.scss';
import ElNavbar from '@components/el-navbar';
import axois from 'axios';
import GithubIcon from '@components/icons/github';

export default {
  name: 'App',
  components: {
    ElNavbar,
    GithubIcon,
  },
  data() {
    return {
      navVisible: false,
      stars: null,
    };
  },
  watch: {
    '$route': 'scrollTop',
  },
  mounted() {
    axois.get('http://api.github.com/repos/johmun/vue-tags-input').then(r => {
      this.stars = r.data.stargazers_count;
    }).catch(e => e);
  },
  methods: {
    scrollTop() {
      setTimeout(() => this.$refs.scrollArea.scrollTop = 0, 160);
    },
  },
};
</script>

<style lang="scss" scoped>
@import 'colors';

#app {
  width: 100%;
  display: flex;
  height: 100%;
  position: relative;
  padding-top: 5px;
}

#app:before {
  content: '';
  position: absolute;
  left: 0px;
  top: 0px;
  height: 5px;
  width: 100%;
  z-index: 999;
  background: $primary;
}

@media (max-width: 940px) {
  .navbar {
    transition: transform 160ms ease-in-out;
    transform: translateX(-100%);

    &.visible {
      transform: translateX(0%);
    }
  }
}

main {
  flex: 1 0 calc(100% - 300px);
  flex-direction: column;
  height: 100%;
  width: 100%;
  overflow-y: scroll;
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
  height: 90px;
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
    background-color: $darker;
    width: 100%;
    height: 50px;
    padding: 0 20px;
    z-index: 2;
  }
}

.gt-link {
  display: flex;
  align-items: center;
  font-size: 14px;
  background: $middle;
  border-radius: 20px;
  padding-right: 14px;
  text-decoration: none;
  font-weight: 500;

  span, i {
    transition: color 200ms ease;
  }

  svg {
    width: 36px;
    height: 36px;

    > * {
      transition: fill 200ms ease;
      fill: $lightestGrey;
    }
  }

  span {
    text-align: right;
    min-width: 34px;
    color: $lightestGrey;
    margin-right: 3px;
  }

  &:hover {
    span, i {
      color: #fff;
    }
    svg > * {
      fill: #fff;
    }
  }

  i {
    font-size: 16px;
    margin-top: -3px;
  }
}

.main-content {
  flex: 1 0 auto;
  padding: 20px 40px 40px 40px;
}

@media (max-width: 600px) {
  .main-content {
    flex: 1 0 auto;
    padding: 50px 15px 15px 15px;
  }
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 160ms;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}

</style>

<style lang="scss">
@import 'colors';

.gt-link {

  svg {
    width: 36px;
    height: 36px;

    > * {
      transition: fill 200ms ease;
      fill: $lightestGrey;
    }
  }

  &:hover svg > * {
    fill: #fff;
  }
}
</style>
