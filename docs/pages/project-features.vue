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
    <!-- todo: cool video with features-->
    <div class="features">
      <vue-tags-input
        v-model="tag"
        class="tags-input"
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
        <img src="https://cdnjs.cloudflare.com/ajax/libs/browser-logos/45.1.0/archive/internet-explorer-tile_10-11/internet-explorer-tile_10-11_48x48.png">
        <span>IE 10 +</span>
      </div>
      <div>
        <img src="../assets/img/apple-logo.png">
        <span>iPhone 9 +</span>
      </div>
      <div>
        <img src="https://cdnjs.cloudflare.com/ajax/libs/browser-logos/45.1.0/safari-ios/safari-ios_48x48.png">
        <span>Safari 9.1 +</span>
      </div>
      <div>
        <img src="../assets/img/android-logo.png">
        <span>Android 4.4 +</span>
      </div>
      <div>
        <img src="https://cdnjs.cloudflare.com/ajax/libs/browser-logos/45.2.0/chrome/chrome_48x48.png">
        <span>Chrome <i class="material-icons">check</i></span>
      </div>
      <div>
        <img src="https://cdnjs.cloudflare.com/ajax/libs/browser-logos/45.1.0/firefox/firefox_48x48.png">
        <span>Firefox <i class="material-icons">check</i></span>
      </div>
      <div>
        <img src="https://cdnjs.cloudflare.com/ajax/libs/browser-logos/45.1.0/archive/opera_10-14/opera_10-14_48x48.png">
        <span>Opera 35+</span>
      </div>
      <div>
        <img src="https://cdnjs.cloudflare.com/ajax/libs/browser-logos/45.1.0/edge/edge_48x48.png">
        <span>Edge 12+</span>
      </div>
    </div>
    <p class="license">
      License:
      <a href="https://opensource.org/licenses/MIT" target="_blank">MIT</a>
    </p>
    <p>Copyright (c) 2018 Johannes Munari</p>
  </div>
</template>

<script>
import VueTagsInput from '@johmun/vue-tags-input';

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
        style: 'background-color: #364187',
      }, {
        text: 'Custom validation rules',
        style: 'background-color: #D5D9F0',
        classes: 'dark-font',
      }, {
        text: 'Hooks: Before adding, Before deleting ...',
        style: 'background-color: #A7AEDA',
      }, {
        text: 'Edit tags after creation (click me)',
        style: 'background-color: #535EA1',
      }, {
        text: 'Fast setup',
        style: 'background-color: #586565',
      }, {
        text: 'Works with Vuex',
        style: 'background-color:  #364187',
      }, {
        text: 'Small size: 34kb minified | gzipped 9kb',
        style: 'background-color: #A7AEDA',
      }, {
        text: 'Autocompletion',
        style: 'background-color: #D5D9F0',
        classes: 'dark-font',
      }, {
        text: 'Customization options',
        style: 'background-color: #535EA1',
      }, {
        text: 'Own templates',
        style: 'background-color:  #364187',
      }, {
        text: 'Delete tags on backslash',
        style: 'background-color: #586565',
      }, {
        text: 'Add tags on paste',
        style: 'background-color: #D5D9F0',
        classes: 'dark-font',
      }, {
        text: 'Examples & Docs',
        style: 'background-color: #535EA1',
      }],
      todo: [
        'Animation support',
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

  .ti-input {
    border: none;
    border-bottom: 1px solid #ccc;
    padding: 4px 12px;
  }

  .ti-tags li {
    padding: 5px 8px;
    margin:2px;
  }

  .ti-tag.dark-font {
    color: #333;
  }

  .ti-item {
    padding: 2px 3px;
  }

  .ti-tag.ti-deletion-mark  {
    background-color: $error !important;
    color: #fff;
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
