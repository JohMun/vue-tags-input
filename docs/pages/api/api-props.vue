<template lang="html">
  <div class="docs-props">
    <ul>
      <div class="docs-item" v-for="(p, index) in props" :key="index">
        <docs-item :item="p"></docs-item>
      </div>
    </ul>
  </div>
</template>

<script>
import DocsItem from '../../components/docs-item';

export default {
  name: 'DocsProps',
  components: {
    DocsItem,
  },
  data() {
    return {
      props: [{
        name: 'v-model',
        type: 'String',
        required: 'true',
      }, {
        name: 'tags',
        type: 'Array',
        required: 'true',
        // schreiben wie ein tag aufgebaut sein muss und welche extra props er haben kann
      }, {
        name: 'autocompleteItems',
        type: 'Array',
        default: '[]',
        // schreiben wie ein item aufgebaut sein muss und welche extra props es haben kann
      }, {
        name: 'allowEditTags',
        type: 'Boolean',
        default: 'false',
      }, {
        name: 'autocompleteFilterDuplicates',
        type: 'Boolean',
        default: 'true',
      }, {
        name: 'addOnlyFromAutocomplete',
        type: 'Boolean',
        default: 'false',
      }, {
        name: 'addOnKey',
        type: 'Array',
        default: '[13]',
      }, {
        name: 'saveOnKey',
        type: 'Array',
        default: '[13]',
      }, {
        name: 'autocompleteMinLength',
        type: 'Number',
        default: '1',
      }, {
        name: 'autocompleteAlwaysOpen',
        type: 'Boolean',
        default: 'false',
      }, {
        name: 'disabled',
        type: 'Boolean',
        default: 'false',
      }, {
        name: 'placeholder',
        type: 'String',
        default: 'Add Tag',
      }, {
        name: 'maxTags',
        type: 'Number',
      }, {
        name: 'maxlength',
        type: 'Number',
      }, {
        name: 'validation',
        type: 'Array',
        default: '[]',
        // schreiben wie validation aufgebaut sein muss und welche extra props es haben kann
      }, {
        name: 'separators',
        type: 'Array',
        default: '[";"]',
      }, {
        name: 'avoidAddingDuplicates',
        type: 'Boolean',
        default: 'true',
      }, {
        name: 'addOnBlur',
        type: 'Boolean',
        default: 'true',
      }, {
        name: 'addFromPaste',
        type: 'Boolean',
        default: 'true',
      }, {
        name: 'deleteOnBackslash',
        type: 'Boolean',
        default: 'true',
      }],
    };
  },
};
</script>

<style lang="scss" scoped>
</style>
