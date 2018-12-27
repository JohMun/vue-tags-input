<template lang="html">
  <div class="changelog">
    <h1>Changelog</h1>
    <ul>
      <li v-for="(node, index) in log" :key="index">
        <h2>{{ node.version }}</h2>
        <ul class="changes">
          <li v-for="(change, index2) in node.changes" :key="index2">
            {{ change }}
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Changelog',
  data() {
    return {
      log: [
        {
          version: '2.0.0',
          changes: [
            'Changed the property key "type" to "classes" in a validation item',
            `All css classes vue-tags-input uses are prefixed with 'ti'.
              For example: 'ti-tag', 'ti-valid' or 'ti-item'`,
            'Better build setup',
            'More linting',
            'Simplify examples code',
            'Rebuild docs if the props file change',
            'Changing the prop\'s name from "delete-on-backslash" to "delete-on-backspace"',
            `The function "perform-save-tag", provided in a slot,
              is now called "perform-save-edit"`,
            'All slots names are now in kebab-case',
            'New styling for the documentation',
            'The rule function in a validation item, gets the complete tag as parameter',
            'Migration page',
          ],
        },
        {
          version: '1.6.0',
          changes: [
            'Focus the input after adding a tag via autocomplete',
            'Add "ti-focus" class to vue-tags-input if necessary',
            'Allow key strings in the array which is assigned to addOnKey and saveOnKey',
          ],
        },
        {
          version: '1.5.10',
          changes: [
            'Fix findIndex for IE11',
            'Add new slots autocomplete-header & autocompete-footer',
          ],
        },
        {
          version: '1.5.7',
          changes: [
            'The automcoplete filtering consider the custom duplicate check function',
          ],
        },
        {
          version: '1.5.6',
          changes: [
            `Add prop to use a custom function, which determines if a tag
            is a duplicate or not.`,
          ],
        },
        {
          version: '1.5.5',
          changes: [
            `The :max-tags limitation cannot be circumvented, when adding multiple
            tags divided by separators.`,
          ],
        },
        {
          version: '1.5.3',
          changes: [
            `It doesn't emit '@tags-changed' if the internal and external
            models are not equal. The '.sync' modifier is now available for the tags array
            and the create tags helper are better explained`,
          ],
        },
        {
          version: '1.5.0',
          changes: [
            'Improve documentation.',
            'Add more code comments.',
            `vue-tags-input now emits the event '@tags-changed' if the internal and external
            models are not equal. For example, if you pass a tag and the property 'tiClasses'
            is missing, the event fires to apply the property to the tag.`,
          ],
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
.changes {
  list-style-type: disc;
  padding-left: 15px;

  li {
    margin: 3px;
  }
}
</style>
