<template lang="html">
  <div class="migration page">

    <h2>CSS Prefixes</h2>
    <p>All CSS classes used by vue-tags-input are prefixed with <span class="code">ti-</span></p>
    <compare
      lang="css"
      :v1-code="cssPrefixes.v1"
      :v2-code="cssPrefixes.v2"
    />

    <h2>Validation item changes</h2>
    <p>
      The property <span class="code">type</span> in a validation item
      has been renamed to <span class="code">classes</span>.
      And the function <span class="code">rule</span>
      gets the complete tag as parameter.
    </p>
    <compare
      lang="js"
      :v1-code="validationItem.v1"
      :v2-code="validationItem.v2"
    />

    <h2>Slot changes</h2>
    <p>
      All slot names are now in kebab-case. For example in version 1,
      most of the slot names where in camelCase like <span class="code">tagLeft</span>
      or <span class="code">autocompleteItem</span>. All those names have changed to
      the kebab-case pattern:
      <span class="code">tag-left</span> or <span class="code">autocomplete-item</span>
    </p>
    <p>
      The function <span class="code">performSaveTag</span>,
      provided via slot-scope, is now called <span class="code">performSaveEdit</span>
    </p>

    <h2>Props</h2>
    <p>
      The prop <span class="code">delete-on-backslash</span>
      has been renamed to <span class="code">delete-on-backspace</span>
    </p>
  </div>
</template>

<script>
import Compare from '@components/compare';

export default {
  name: 'Migration',
  components: {
    Compare,
  },
  data() {
    return {
      cssPrefixes: {
        v1: `
.new-tag-input {
  color: #b7c4c9;
}`,
        v2: `.ti-new-tag-input {
  color: #b7c4c9;
}`
      },
      validationItem: {
        v1: `validation: [{
  type: 'min-length',
  rule: text => text.length < 8,
}],
        `,
        v2: `validation: [{
  classes: 'min-length',
  rule: tag => tag.text.length < 8,
}],`
      },
    };
  },
};
</script>

<style lang="scss" scoped>
</style>
