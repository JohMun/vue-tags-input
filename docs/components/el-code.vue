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
      scrollbar: false,
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
@import 'colors';

.code-block {
  overflow-x: auto;
  margin-top: 15px;
  margin-bottom: 15px;
  padding: 15px;
  line-height: 1.5em;
  min-height: 54px;
  font-size: 0.925em;
  background-color: $middle;
  color: $lightGrey;
  border-radius: 3px;
  font-family: 'Oxygen Mono', monospace !important;

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
