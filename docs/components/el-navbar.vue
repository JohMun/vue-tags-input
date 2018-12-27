<template lang="html">
  <nav class="el-navbar">
    <div class="content">
      <div class="logo">
        <div @click="goHome">
          <span class="title">Vue Tags Input</span>
          <span class="sub">A Generic UI Component</span>
        </div>
        <i class="material-icons close-nav" @click="$emit('close-nav')">clear</i>
      </div>
      <div class="navigation">
        <div class="nav-items">
          <ul class="lvl-1">
            <li
              v-for="(item, index) in links"
              :key="index"
              :class="{ active: isActive(item), disabled: item.disabled }"
            >
              <div class="label" @click="moveOrOpen(item, index)">
                <div class="expand">
                  <i
                    v-if="item.icon && !item.children"
                    class="material-icons"
                    :style="item.icon.style"
                  >
                    {{ item.icon.type }}
                  </i>
                  <i
                    v-if="item.children && linkStatus[index]"
                    class="material-icons"
                  >
                    expand_less
                  </i>
                  <i
                    v-if="item.children && !linkStatus[index]" class="material-icons"
                  >
                    expand_more
                  </i>
                </div>
                <span>{{ item.label }}</span>
              </div>
              <ul v-if="linkStatus[index]" class="lvl-2">
                <li
                  v-for="(child, i2) in item.children"
                  :key="i2"
                  :class="{ active: isActive(child), disabled: child.disabled }"
                  @click="moveTo(child)"
                >
                  <div class="label"><span>{{ child.label }}</span></div>
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
        label: 'Migration V1 → V2',
        route: '/migration',
        icon: {
          type: 'info',
          style: [{ color: '#ebde6e' }, { 'font-size': '20px' }],
        },
      }, {
        label: 'Changelog',
        route: '/changelog',
      }],
    };
  },
  created() {
    this.linkStatus = this.links.map(() => false);
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
};
</script>

<style lang="scss" scoped>
@import '~colors';

  nav {
    width: 300px;
    background-color: $darker;
    flex-direction: column;
    flex-shrink: 0;
    display: flex;
    height: 100%;
    overflow-y: auto;
    box-shadow: 0 0 6px rgba(0,0,0,.3);
    color: $lightGrey;
  }

  @media (max-width: 940px) {
    nav {
      position: absolute;
      z-index: 999;
      box-shadow: 0 0 30px rgba(0,0,0,.3);
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
    padding: 45px 24px 22px 24px;
    width: 100%;
    position: relative;

    > div {
      cursor: pointer;
      padding: 6px 12px;
      display: flex;
      flex-direction: column;
    }

    .title {
      line-height: 28px;
      font-size: 23px;
      font-weight: bold;
      font-family: 'Raleway', sans-serif;
      color: #fff;
    }

    .sub {
      color: $grey;
      letter-spacing: 1.3px;
      font-size: 12px;
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
  }

  .navigation {
    padding: 0 24px 30px 24px;
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

        &:before {
          background: transparent;
          transition: background-color 300ms ease;
          position: absolute;
          right: 0px;
          left: 0px;
          bottom: -4px;
          content: '';
          height: 2px;
        }
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

      &.active {
        color: #fff;
        font-weight: 500;
      }

      &.active > div > span:before {
        background-color: $primary;
      }

      &.disabled {
        cursor: default;
        opacity: 0.4;
      }
    }
  }

  li:not(.disabled) .label:hover {
    color: #fff;
  }

  .lvl-2 {
    margin-left: 42px;
    font-weight: 400;

    li:nth-child(1) {
      margin-top: 14px;
    }
  }
</style>
