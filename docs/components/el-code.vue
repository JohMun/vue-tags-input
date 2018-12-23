<template>
  <div class="code-block" :class="lang">
    <slot><code v-html="content" /></slot>
  </div>
</template>

<script>
export default {
  name: 'ElCode',
  props: {
    code: {
      type: String,
    },
    lang: {
      type: String,
      default: 'javascript',
    },
  },
  data() {
    return {
      content: null,
    };
  },
  watch: {
    code: 'initHs',
  },
  mounted() {
    if (this.$slots.default) window.hljs.highlightBlock(this.$el);
    else this.initHs();
  },
  methods: {
    initHs() {
      this.content = window.hljs.highlight(this.lang, this.code).value;
    },
  },
};
</script>

<style lang="scss">
.code-block {
  margin-top: 15px;
  padding: 20px 15px 0px 15px;
  line-height: 1.5em;
  min-height: 54px;
  background-color: #f1f0f0;
  color: #5a7994;

  span {
    font-family: 'Oxygen Mono', monospace !important;
  }

  code {
    white-space: pre-wrap;
  }

  .nohighlight {
    .hljs-keyword {
      font-weight: normal;
    }
  }
}
</style>
