<template lang="html">
  <div class="examples-templates page">
    <div class="content">
      <h1>Templating</h1>
      <breaking-changes :current-version="2">
        <p>
          All slot names are now in kebab-case.
          <ul>
            <li>V1: <span class="code">tagLeft</span></li>
            <li>V2: <span class="code">tag-left</span></li>
          </ul>
        </p>
        <p>
          The function <span class="code">performSaveTag</span>,
          provided via slot-scope, is now called <span class="code">performSaveEdit</span>
        </p>
      </breaking-changes>
      <div class="tag-picture">
        <div class="tag">
          <div class="tag-left">
            <span class="code">tag-left</span>
            <span>&nbsp;</span>
            <span>&nbsp;</span>
          </div>
          <div class="tag-center">
            <span class="code">tag-center</span>
            <span>Contains: text & input</span>
            <span class="experimental">(experimental)</span>
          </div>
          <div class="tag-right">
            <span class="code">tag-right</span>
            <span>&nbsp;</span>
            <span>&nbsp;</span>
          </div>
          <div class="tag-actions">
            <span class="code">tag-actions</span>
            <span>
              Contains:
              <i class="material-icons">undo</i>
              <i class="material-icons">clear</i>
            </span>
            <span>&nbsp;</span>
          </div>
        </div>
        <div class="description">All possible slots in a tag</div>
      </div>
      <example1 />
      <example2 />
      <example3 />
      <example4 />
    </div>
  </div>
</template>

<script>
import BreakingChanges from '@components/breaking-changes';
import VueTagsInput from '@johmun/vue-tags-input';
import ElCode from '@components/el-code';
import TagInput from '@tag-input';
import Example1 from './example1';
import Example2 from './example2';
import Example3 from './example3';
import Example4 from './example4';

export default {
  name: 'ExamplesTemplates',
  components: {
    VueTagsInput,
    ElCode,
    BreakingChanges,
    TagInput,
    Example2,
    Example1,
    Example3,
    Example4,
  },
};
</script>

<style lang="scss" scoped>
@import 'colors';

a {
  text-decoration: underline;
}

.tag-picture {
  margin-top: 18px;
  max-width: 600px;
  display: flex;
  flex-direction: column;

  .tag {
    display: flex;
    border-radius: 12px;
    height: 120px;
    background-color: #324652;
    margin-bottom: 10px;

    > div {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
    }

    span {
      margin: 2px;
      font-size: 0.8em;
    }

    span:not(.code) {
      color: #fff;
      display: flex;
      align-items: center;
    }

    i {
      padding-left: 3px;
      font-size: 18px;
    }

    span.experimental {
      color: $grey;
    }
  }

  .description {
    color: $grey;
    font-style: italic;
    font-size: 0.9em;
  }

  .tag-left, .tag-right, .tag-actions {
    width: 120px;
  }

  .tag-center {
    border-left: 1px solid #283944;
    border-right: 1px solid #283944;
    flex: 1;
  }

  .tag-actions {
    border-left: 1px solid #283944;
  }

}
</style>
