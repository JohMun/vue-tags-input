<template lang="html">
  <nav class="el-navbar">
    <div class="content">
      <div class="logo">
        <div @click="goHome">
          <i class="material-icons">style</i>
          <span class="tag">vue-tags-input</span>
        </div>
        <i class="material-icons close-nav" @click="$emit('close-nav')">clear</i>
      </div>
      <div class="navigation">
        <div class="nav-items">
          <ul class="lvl-1">
            <li
              v-for="(item, index) in links"
              :key="index"
              :class="{ active: isActive(item), disabled: item.disabled }">
              <div class="label" @click="moveOrOpen(item, index)">
                <div class="expand">
                  <i v-if="item.children && linkStatus[index]" class="material-icons">expand_less</i>
                  <i v-if="item.children && !linkStatus[index]" class="material-icons">expand_more</i>
                </div>
                <span>{{ item.label }}</span>
              </div>
              <ul class="lvl-2" v-if="linkStatus[index]">
                <li
                  v-for="(item, i2) in item.children"
                  :key="i2"
                  @click="moveTo(item)"
                  :class="{ active: isActive(item), disabled: item.disabled }">
                  <div class="label"><span>{{ item.label }}</span></div>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'ElNavbar',
  data() {
    return {
      linkStatus: [],
      links: [{
        label: 'Features',
        route: '/',
      }, {
        label: 'Getting Started',
        route: '/start',
      }, {
        label: 'Examples',
        children: [{
          label: 'Autocomplete',
          route: '/examples/autocomplete',
        }, {
          label: 'Validation',
          route: '/examples/validation',
        }, {
          label: 'Styling',
          route: '/examples/styling',
        }, {
          label: 'Hooks',
          route: '/examples/hooks',
        }, {
          label: 'Templating',
          route: '/examples/templates',
        }, {
          label: 'Nuxt',
          route: '/examples/nuxt',
        }],
      }, {
        label: 'Full Docs',
        route: '',
        children: [{
          label: 'Props',
          route: '/api/props',
        }, {
          label: 'Events',
          route: '/api/events',
        }, {
          label: 'Slots',
          route: '/api/slots',
        }, {
          label: 'Create Tags Helper',
          route: '/api/create-tags-helper',
        }],
      }, {
        label: 'Caveats',
        disabled: true,
        route: '',
      }],
    };
  },
  methods: {
    toggleStatus(index) {
      this.$set(this.linkStatus, index, !this.linkStatus[index]);
    },
    goHome() {
      this.$router.push({ path: '/' });
      this.$emit('close-nav');
    },
    moveOrOpen(item, index) {
      if (item.disabled) return;
      if (item.children) return this.toggleStatus(index);
      this.$router.push({ path: item.route });
      this.$emit('close-nav');
    },
    moveTo(item) {
      if (item.disabled) return;
      this.$router.push({ path: item.route });
      this.$emit('close-nav');
    },
    isActive(item) {
      return item.route === this.$route.path;
    },
  },
  created() {
    this.linkStatus = this.links.map(() => false);
  },
};
</script>

<style lang="scss" scoped>
@import '~colors';

  nav {
    width: 300px;
    background-color: #606060;
    flex-direction: column;
    flex-shrink: 0;
    display: flex;
    height: 100%;
    overflow-y: auto;
    border-right: 1px solid #e2dede;
    color: #fafafa;
  }

  @media (max-width: 940px) {
    nav {
      // width: 100%;
      position: absolute;
      z-index: 999;
    }
  }

  @media (max-width: 420px) {
    nav {
      width: 100%;
    }
  }

  .content {
    flex-direction: column;
    flex: 1 0 auto;
    display: flex;
  }

  .logo {
    width: 100%;
    height: 90px;
    align-items: center;
    justify-content: center;
    display: flex;
    flex-direction: column;
    position: relative;

    > div {
      cursor: pointer;
      display: flex;
      align-items: center;
      padding: 6px 12px;
      border-radius: 2px;
      background-color: rgba(155, 155, 155, 0.2);
      color: #fafafa;
    }

    > div i {
      font-size: 34px;
      margin-right: 8px;
    }

    .tag {
      font-family: 'Oxygen Mono', monospace;
      font-size: 14px;
    }

    .close-nav {
      position: absolute;
      right: 10px;
      top: 10px;
      font-size: 32px;
      cursor: pointer;
      display: none;
    }

    @media (max-width: 940px) {
      .close-nav {
        display: block;
      }
    }

    i {
      font-size: 26px;
    }

    h2 {
      margin-top: 8px;
      font-size: 12px;
      font-weight: 400;
      text-transform: uppercase;
    }
  }

  .navigation {
    padding: 0 30px 30px 30px;
    font-weight: 500;
    display: flex;
    flex-direction: column;
    flex: 1 0 auto;
  }

  .nav-items {
    display: flex;
    position: relative;
    overflow: hidden;
    flex: 1 0 auto;

    li {
      margin-top: 18px;

      > div {
        display: flex;
      }

      > div > span {
        position: relative;
      }

      .expand {
        width: 28px;
        display: flex;
      }

      .label {
        cursor: pointer;
        display: flex;
        align-items: center;
        transition: color .15s ease-in-out;
      }

      &.active > div > span:before {
        position: absolute;
        right: 0px;
        left: 0px;
        bottom: -4px;
        content: '';
        height: 2px;
        background-color: $primary;
      }

      &.disabled {
        cursor: default;
        opacity: 0.4;
      }
    }
  }

  li:not(.disabled) .label:hover {
    color: $primary;
  }

  .lvl-2 {
    margin-left: 42px;
    font-weight: 400;

    li:nth-child(1) {
      margin-top: 14px;
    }
  }
</style>
