<template>
  <pre class="code-block"><slot v-if="$slots.default"></slot><code v-html="content"></code></pre>
</template>

<script>
export default {
  name: 'ElCode',
  props: ['code', 'lang'],
  data() {
    return {
      content: null,
    };
  },
  methods: {
    initHs() {
      this.content = window.hljs.highlight(this.lang || 'javascript', this.code).value;
    },
  },
  watch: {
    code: 'initHs',
  },
  mounted() {
    if (this.$slots.default) window.hljs.highlightBlock(this.$el);
    else this.initHs();
  },
};
</script>

<style lang="scss">
.code-block {
  padding: 15px;
  line-height: 1.5em;
  min-height: 54px;
  background-color: #fafafa;
  color: #5a7994;

  span {
    font-family: 'Oxygen Mono', monospace !important;
  }

  pre {
    margin: 10px 0px 20px 0px;
  }

  .nohighlight {
    .hljs-keyword {
      font-weight: normal;
    }
  }
}
</style>
