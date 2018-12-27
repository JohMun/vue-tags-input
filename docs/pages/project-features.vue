<template lang="html">
  <div id="project-features">
    <h1 class="title">Vue Tags Input</h1>
    <p>A generic UI component to input tags, with a couple of features</p>
    <div class="features">
      <vue-tags-input
        v-model="tag"
        class="tags-input"
        :tags="tags"
        :autocomplete-items="items"
        :allow-edit-tags="true"
        :placeholder="'Add a feature'"
        @tags-changed="newTags => tags = newTags"
      />
    </div>
    <h3>Browser support</h3>
    <div class="browser-support">
      <div>
        <ie class="icon" />
        <span>IE 10 &lt;=</span>
      </div>
      <div>
        <safari class="icon" />
        <span>iPhone 9 &lt;=</span>
      </div>
      <div>
        <chrome class="icon" />
        <span>Chrome <i class="material-icons">check</i></span>
      </div>
      <div>
        <firefox class="icon" />
        <span>Firefox <i class="material-icons">check</i></span>
      </div>
      <div>
        <opera class="icon" />
        <span>Opera 35 &lt;=</span>
      </div>
      <div>
        <safari class="icon" />
        <span>Safari 9.1 &lt;=</span>
      </div>
      <div>
        <chrome class="icon" />
        <span>Android 4.4 &lt;=</span>
      </div>
      <div>
        <edge class="icon" />
        <span>Edge 12 &lt;=</span>
      </div>
    </div>
    <p class="license">
      License:
      <a href="https://opensource.org/licenses/MIT" target="_blank">MIT</a>
    </p>
    <p class="date">Copyright (c) {{ new Date().getFullYear() }} Johannes Munari</p>
  </div>
</template>

<script>
import VueTagsInput from '@johmun/vue-tags-input';
import Ie from '@components/icons/ie';
import Safari from '@components/icons/safari';
import Edge from '@components/icons/edge';
import Chrome from '@components/icons/chrome';
import Opera from '@components/icons/opera';
import Firefox from '@components/icons/firefox';

export default {
  name: 'ProjectFeatures',
  components: {
    VueTagsInput,
    Ie,
    Safari,
    Edge,
    Chrome,
    Opera,
    Firefox,
  },
  data() {
    return {
      tag: '',
      tags: [],
      features: [
        'No dependencies',
        'Custom validation rules',
        'Hooks: Before adding, Before deleting ...',
        'Edit tags after creation (click me)',
        'Fast setup',
        'Works with Vuex',
        'Small size: 34kb minified (css included) | gzipped 9kb',
        'Autocompletion',
        'Customization options',
        'Templating',
        'Delete tags on backspace',
        'Add tags on paste',
        'Examples & Docs',
        'More ...',
      ],
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
  created() {
    this.tags = this.features.map(text => ({ text }));
  },
};
</script>

<style lang="scss">
@import '~colors';

#app #project-features .tags-input {
  width: 100%;
  max-width: none;

  .ti-input {
    border: none;
    border-bottom: 1px solid $lightGrey;
    padding: 4px 12px;
  }

  .ti-tag input {
    color: $darker;
  }

  .ti-tag, .ti-item.ti-selected-item {
    background-color: $primary;
    color: $darker;
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

#project-features .browser-support .icon {
  width: 100%;
  height: auto;
  padding: 16px;

  > * {
    fill: #b7c4c9;
  }
}
</style>

<style lang="scss" scoped>
@import 'colors';

.title {
  line-height: 28px;
  font-size: 23px;
  font-weight: bold;
  font-family: 'Raleway', sans-serif;
  color: #fff;
  margin-bottom: 20px
}

.features {
  display: flex;
  margin-bottom:40px;
  flex-direction: column;
}

.browser-support {
  display: flex;
  flex-wrap: wrap;

  > div {
    display: flex;
    flex-direction: column;
    flex: 1;
    align-items: center;
    font-size: 14px;
    min-width: 85px;
    margin: 8px;
    max-width: 94px;
  }

  span {
    display: flex;
    margin-top: 0px;
    font-weight: 500;

    i {
      margin-left: 3px;
      font-size: 20px;
    }
  }
}

.license {
  margin-top: 40px;
  font-size: 0.85em;
}

.date {
  font-size: 0.85em;
}
</style>
