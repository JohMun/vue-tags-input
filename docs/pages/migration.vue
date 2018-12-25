<template lang="html">
  <div class="migration page">
    - css-prefixes
    - validation-item: type is now called classes
    - the prop 'delete-on-backslash' is now called 'delete-on-backspace'
    - The function 'perform-save-tag', provided in a slot, is now called 'perform-save-edit'
    - all slot names are now in kebab-case e.g. 'tag-left'
  </div>
</template>

<script>
export default {
  name: 'Migration',
};
</script>

<style lang="scss" scoped>
</style>
