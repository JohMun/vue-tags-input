<template lang="html">
  <div id="project-features">
    <div class="basic">
      <div class="logo">
        <i class="material-icons">loyalty</i>
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
    <!-- todo: add broswe support -->
    <!--<div class="browser-support">
      <p>browser support</p>
    </div>-->
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
        text: 'Fast setup',
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
        text: 'Delete tags on backslash',
        style: 'background-color: #586565',
      }, {
        text: 'Add tags on paste',
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
        text: 'Own templates (coming soon)',
        style: 'background-color:  #f49a3e',
      }, {
        text: 'Examples & Docs',
        style: 'background-color: #586565',
      }],
      todo: [
        'Animation support',
        'addOnKey="Some Keycode"',
        'Autocomplete Highlighting',
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
    padding: 8px 12px;
  }

  .tag {
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

  .new-tag-input {
    margin: 7px;
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
</style>
