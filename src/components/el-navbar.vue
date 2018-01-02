<template lang="html">
  <nav class="el-navbar">
    <div class="content">
      <div class="logo">
        <div @click="goHome">
          <i class="material-icons">loyalty</i>
          <h2>Vue Tags Input</h2>
        </div>
        <i class="material-icons close-nav" @click="$emit('close-nav')">clear</i>
      </div>
      <div class="navigation">
        <div class="breadcrumbs">
          <div>
            <span @click="active = false">All</span>
            <i v-show="activeLink" class="material-icons">chevron_right</i>
            <span v-if="activeLink">{{ activeLink.label }}</span>
          </div>
          <i
            v-show="activeLink"
            @click="active = false"
            class="material-icons">keyboard_backspace
          </i>
        </div>
        <div class="nav-items" :class="{ 'on-2': active }">
          <ul class="lvl-1">
            <li
            v-for="(item, index) in links"
            :key="index"
            @click="item.disabled ? false : moveTo(item)"
            :class="{ active: isActive(item), disabled: item.disabled }">
              <div>
                <span>{{ item.label }}</span>
                <i v-show="item.children" class="material-icons">more_horiz</i>
              </div>
            </li>
          </ul>
          <ul class="lvl-2">
            <li v-for="(item, index) in childs"
              :key="index"
              @click="item.disabled ? false : moveTo(item)"
              :class="{ active: isActive(item), disabled: item.disabled }">
              <div><span>{{ item.label }}</span></div>
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
      active: null,
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
          route: '',
          disabled: true,
        }, {
          label: 'Styling',
          route: '/examples/styling',
          disabled: true,
        }, {
          label: 'Hooks',
          route: '',
          disabled: true,
        }, {
          label: 'Templating',
          route: '',
          disabled: true,
        }],
      }, {
        label: 'API',
        route: '',
        disabled: true,
        children: [{
          label: 'Props',
          route: '',
          disabled: true,
        }, {
          label: 'Events',
          route: '',
          disabled: true,
        }, {
          label: 'Classes',
          route: '',
          disabled: true,
        }, {
          label: 'Slots',
          route: '',
          disabled: true,
        }, {
          label: 'Ref',
          route: '',
          disabled: true,
        }],
      }, {
        label: 'Caveats',
        disabled: true,
        route: '',
      }],
    };
  },
  computed: {
    childs() {
      return this.activeLink && this.activeLink.children;
    },
    activeLink() {
      return this.links.find(l => l.label === this.active);
    },
  },
  methods: {
    goHome() {
      this.$emit('close-nav');
      this.$router.push({ path: '/' });
      this.active = false;
    },
    isActive(item) {
      return item.route === this.$route.path;
    },
    moveTo(item) {
      if (!item.children) {
        this.$emit('close-nav');
        return this.$router.push({ path: item.route });
      }
      this.active = item.label;
    },
    setActive() {
      const active = this.links.find(l => {
        if (l.children && l.children.find(c => c.route === this.$route.path)) return l;
      });
      if (active) this.active = active.label;
    },
  },
  watch: {
    '$route': 'setActive',
  },
  mounted() {
    this.setActive();
  },
};
</script>

<style lang="scss" scoped>
@import '~colors';

  nav {
    width: 350px;
    background-color: #F2F2F2;
    flex-direction: column;
    flex-shrink: 0;
    display: flex;
    height: 100%;
    overflow-y: auto;
  }

  @media (max-width: 1280px) {
    nav {
      width: 280px;
    }
  }

  @media (max-width: 940px) {
    nav {
      width: 100%;
      position: absolute;
    }
  }

  .content {
    flex-direction: column;
    flex: 1 0 auto;
    display: flex;
  }

  .logo {
    width: 100%;
    height: 120px;
    align-items: center;
    justify-content: center;
    display: flex;
    flex-direction: column;
    color: #848484;
    cursor: pointer;
    position: relative;

    > div {
      display: flex;
      flex-direction: column;
      align-items: center;
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
    font-weight: bold;
    display: flex;
    flex-direction: column;
    flex: 1 0 auto;
  }

  .breadcrumbs {
    height: 18px;
    color: $primary;
    font-size: 14px;
    text-transform: uppercase;
    display: flex;
    align-items: center;
    justify-content: space-between;

    > div {
      display: flex;
      align-items: center;

      span:first-child {
        cursor: pointer;
      }

      i {
        font-size: 18px;
      }
    }

    i {
      font-size: 20px;
      cursor: pointer;
    }
  }

  .nav-items {
    display: flex;
    position: relative;
    overflow: hidden;
    flex: 1 0 auto;

    ul {
      transition: transform .3s ease-in-out;
    }

    li {
      margin-top: 30px;
      cursor: pointer;

      > div {
        display: flex;
        justify-content: space-between;
      }

      > div > span {
        position: relative;
      }

      &.active {
        color: $primary;
      }

      &.active > div > span:before {
        position: absolute;
        right: 0px;
        left: 0px;
        bottom: -5px;
        content: '';
        height: 2px;
        background-color: $primary;
      }

      &:hover:not(.disabled) {
        color: $primary;
      }

      &.disabled {
        cursor: default;
        opacity: 0.4;
      }
    }
  }

  .on-2 {
    ul:nth-child(1) {
      transform: translateX(-100%);
    }
    ul:nth-child(2) {
      transform: translateX(0%);
    }
  }

  .lvl-1 {
    width: 100%;
    position: absolute;
    transform: translateX(0%);
  }

  .lvl-2 {
    width: 100%;
    position: absolute;
    transform: translateX(100%);
  }
</style>
