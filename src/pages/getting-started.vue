<template lang="html">
  <div class="getting-started">
    <h1>Getting Started</h1>
    <h2>Demo</h2>
    <vue-tags-input
      v-model="tag"
      :tags="tags"
      @tags-changed="newTags => tags = newTags">
    </vue-tags-input>
    <h2>Install</h2>
    <span>Install vue-tags-input with npm</span>
    <pre v-highlightjs>
      <code class="console">npm install vue-tags-input --save</code>
    </pre>
    <span>Or via CDN</span>
    <pre v-highlightjs>
      <code class="xml">&lt;link href=&quot;https://fonts.googleapis.com/css?family=Montserrat:400,500|Raleway:400,500&quot;rel=&quot;stylesheet&quot;&gt;</code>
    </pre>
    <h2>Usage</h2>
    <pre v-highlightjs>
      <code class="vue">
&lt;template&gt;
  &lt;div&gt;
    &lt;vue-tags-input v-model=&quot;tag&quot; :tags=&quot;tags&quot; @tags-changed=&quot;newTags =&gt; tags = newTags&quot; /&gt;
  &lt;/div&gt;
&lt;/template&gt;

&lt;script&gt;
import VueTagsInput from 'vue-tags-input';

export default {
  components: {
    VueTagsInput,
  },
  data() {
    return {
      tag: '',
      tags: [],
    };
  },
};
&lt;/script&gt;
      </code>
    </pre>
  </div>
</template>

<script>
import VueTagsInput from '../components/vue-tags-input';

export default {
  name: 'GettingStarted',
  components: {
    VueTagsInput,
  },
  data() {
    return {
      tag: '',
      tags: [{ text: 'new Tag' }],
    };
  },
};
</script>
