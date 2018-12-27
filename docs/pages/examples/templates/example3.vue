<template lang="html">
  <section>
    <h2>Slot: tag-center (experimental) with input helper</h2>
    <p>
      This is the default behaviour of every tag recreated with the slot
      <span class="code">tag-center</span>.
      The component <span class="code">TagInput</span> is a helper to fastly build
      the standard text input, which provides the ability to edit tags after creation.
      The css class <span class="code">ti-hidden</span> is provided by tags input.
      It's a helper class which enlarges a tag while the user is typing.
    </p>
    <el-code :code="require('./example3.demo.html')" lang="html" />
  </section>
</template>

<script>
import ElCode from '@components/el-code';

export default {
  components: {
    ElCode,
  },
};

</script>
