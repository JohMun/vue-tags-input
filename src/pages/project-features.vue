<template lang="html">
  <div id="project-features">
    <div class="basic">
      <div class="logo">
        <h2>Vue Tags Input</h2>
      </div>
      <p>
        A tags input component for VueJs with autocompletion, custom validation,
        templating and much more
      </p>
    </div>
    <!-- todo: cool gif with features-->
    <div class="features">
      <vue-tags-input
        class="tags-input"
        v-model="tag"
        :tags="tags"
        :autocomplete-items="items"
        :allow-edit-tags="true"
        :placeholder="'Add Feature'"
        @tags-changed="newTags => tags = newTags"
      />
    </div>
    <h3>Browser support</h3>
    <div class="browser-support">
      <div>
        <img src="https://cdnjs.cloudflare.com/ajax/libs/browser-logos/45.1.0/archive/internet-explorer-tile_10-11/internet-explorer-tile_10-11_48x48.png" />
        <span>IE 10 +</span>
      </div>
      <div>
        <img src="../assets/img/apple-logo.png" />
        <span>iPhone 9 +</span>
      </div>
      <div>
        <img src="https://cdnjs.cloudflare.com/ajax/libs/browser-logos/45.1.0/safari-ios/safari-ios_48x48.png" />
        <span>Safari 9.1 +</span>
      </div>
      <div>
        <img src="../assets/img/android-logo.png" />
        <span>Android 4.4 +</span>
      </div>
      <div>
        <img src="https://cdnjs.cloudflare.com/ajax/libs/browser-logos/45.2.0/chrome/chrome_48x48.png" />
        <span>Chrome <i class="material-icons">check</i></span>
      </div>
      <div>
        <img src="https://cdnjs.cloudflare.com/ajax/libs/browser-logos/45.1.0/firefox/firefox_48x48.png" />
        <span>Firefox <i class="material-icons">check</i></span>
      </div>
      <div>
        <img src="https://cdnjs.cloudflare.com/ajax/libs/browser-logos/45.1.0/archive/opera_10-14/opera_10-14_48x48.png" />
        <span>Opera 35+</span>
      </div>
      <div>
        <img src="https://cdnjs.cloudflare.com/ajax/libs/browser-logos/45.1.0/edge/edge_48x48.png" />
        <span>Edge 12+</span>
      </div>
    </div>
    <p class="license">License:
      <a href="https://opensource.org/licenses/MIT" target="_blank">MIT</a></p>
    <p>Copyright (c) 2018 Johannes Munari</p>
  </div>
</template>

<script>
import VueTagsInput from '../components/vue-tags-input';

export default {
  name: 'ProjectFeatures',
  components: {
    VueTagsInput,
  },
  data() {
    return {
      tag: '',
      tags: [{
        text: 'No dependencies',
        style: 'background-color: #f49a3e',
      }, {
        text: 'Custom validation rules',
        style: 'background-color: #cdede5',
        classes: 'dark-font',
      }, {
        text: 'Hooks: Before adding, Before deleting ...',
        style: 'background-color: #3ea489',
      }, {
        text: 'Edit tags after creation (click me)',
        style: 'background-color: #F5DA81',
        classes: 'dark-font',
      }, {
        text: 'Fast setup',
        style: 'background-color: #586565',
      }, {
        text: 'Works with Vuex',
        style: 'background-color:  #f49a3e',
      }, {
        text: 'Small size: 25kb minified | gzipped 8kb',
        style: 'background-color: #3ea489',
      }, {
        text: 'Autocompletion',
        style: 'background-color: #cdede5',
        classes: 'dark-font',
      }, {
        text: 'Customization options',
        style: 'background-color: #F5DA81',
        classes: 'dark-font',
      }, {
        text: 'Own templates',
        style: 'background-color:  #f49a3e',
      }, {
        text: 'Delete tags on backslash',
        style: 'background-color: #586565',
      }, {
        text: 'Add tags on paste',
        style: 'background-color: #cdede5',
        classes: 'dark-font',
      }, {
        text: 'Examples & Docs',
        style: 'background-color: #F5DA81',
        classes: 'dark-font',
      }],
      todo: [
        'Animation support',
        'addOnKey="Some Keycode"',
        'Autocomplete Highlighting',
        'Groups',
      ],
    };
  },
  computed: {
    items() {
      return this.todo
        .filter(t => new RegExp(this.tag, 'i').test(t))
        .map(i => {
          return { text: `Todo: ${i}` };
        });
    },
  },
};
</script>

<style lang="scss">
@import '~colors';

#project-features .tags-input {
  width: 100%;
  max-width: none;

  .input {
    border: none;
    border-bottom: 1px solid #ccc;
    padding: 4px 12px;
  }

  .tags li {
    padding: 5px 8px;
    font-size: 18px;
    margin:3px;
  }

  .tag.dark-font {
    color: #333;
  }

  .item {
    padding: 6px 10px;
    font-size: 16px;
  }

  .tag.deletion-mark  {
    background-color: $error !important;
    color: #fff;
  }

  .actions {
    min-width: 22px;
  }
}
</style>

<style lang="scss" scoped>
#project-features {
  max-width: 900px;
}

span, p {
  line-height: 1.5em;
  max-width: 900px;
}

.basic {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  text-align: center;
  margin-bottom: 10px;

  .logo {
    display: flex;
    align-items: center;
    flex-direction: column;
    text-transform: uppercase;

    h2 {
      margin-top: 10px;
    }
  }
}

.features {
  display: flex;
  margin-bottom:40px;
  flex-direction: column;

  h2 {
    text-align: center;
  }
}

.browser-support {
  display: flex;
  background-color: #FAFAFA;
  flex-wrap: wrap;

  > div {
    display: flex;
    flex-direction: column;
    flex: 1;
    align-items: center;
    font-size: 14px;
    min-width: 85px;
    margin: 8px;
  }

  img {
    width: 26px;
    margin-bottom: 3px;
  }

  span {
    display: flex;
    align-items: center;

    i {
      margin-left: 3px;
      font-size: 15px;
    }
  }
}

.license {
  margin-top: 40px;
}
</style>
