<template lang="html">
  <div class="examples-hooks page">
    <div class="content">
      <h1>Hooks</h1>
      <p>
        The tags input component provides different hooks.
        A callback function can be registered, to control the behaviour of tags input.
        For example like that: <span class="code">@before-adding-tag="myCallback"</span>.
        Before a tag is added, the function <span class="code">myCallback</span> is invoked
        and gets an object as parameter. The object contains the properties
        <span class="code">tag</span>, which is the to adding tag and a function named
        <span class="code">addTag</span>. If this function is invoked,
        <span class="code">tag</span> will be added.
        You find more information in the
        <router-link :to="{ path: '/api/events' }">documentations</router-link>,
        how the other hooks work.
      </p>
      <example1 />
      <example2 />
    </div>
  </div>
</template>

<script>
import Example1 from './example1';
import Example2 from './example2';

export default {
  name: 'ExamplesHooks',
  components: {
    Example1,
    Example2,
  },
};
</script>
