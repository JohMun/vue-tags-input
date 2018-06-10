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
