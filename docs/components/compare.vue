<template lang="html">
  <div class="compare">
    <article class="">
      <h3>Version 1</h3>
      <el-code class="el-code" :code="v1Code.trim()" :lang="lang" />
    </article>
    <article class="">
      <h3>Version 2 (Current)</h3>
      <el-code class="el-code" :code="v2Code" :lang="lang" />
    </article>
  </div>
</template>

<script>
import ElCode from './el-code';

export default {
  name: 'Compare',
  components: {
    ElCode,
  },
  props: {
    lang: {
      type: String,
    },
    v1Code: {
      type: String,
    },
    v2Code: {
      type: String,
    },
  },
};
</script>

<style lang="scss" scoped>
@import 'colors';

.compare {
  display: flex;
  width: 100%;

  h3 {
    font-size: 0.9em;
    margin-bottom: 4px;
    margin-top: 0px;
    color: $grey;
  }

  article:nth-child(1) {
    margin-right: 7px;
    flex: 1 0 auto;
  }

  article:nth-child(2) {
    margin-left: 7px;
    flex: 1 0 auto;
  }

  .el-code {
    margin-top: 0px;
  }
}

@media (max-width: 600px) {
  #app .compare {
    flex-direction: column;

    article {
      margin-left: 0px;
      margin-right: 0px;
    }

    article:nth-child(1) h3 {
      margin-top: 0px;
    }

    article:nth-child(2) h3 {
      margin-top: 6px;
    }
  }
}
</style>
