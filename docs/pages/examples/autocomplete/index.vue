<template>
  <div class="examples-autocomplete page">
    <div class="content">
      <example1 />
      <example2 />
    </div>
  </div>
</template>

<script>
import Example1 from './example1';
import Example2 from './example2';

export default {
  name: 'ExamplesAutocomplete',
  components: {
    Example1,
    Example2,
  },
};
</script>
