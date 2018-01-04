<template lang="html">
  <div class="project-features">
    <div class="basic">
      <div class="logo">
        <i class="material-icons">loyalty</i>
        <h2>Vue Tags Input</h2>
      </div>
      <p>A tags input component for VueJs with autocomplete, validation, templating and much more.</p>
    </div>
    <!-- todo: cool gif with features-->
    <div class="features">
      <ul>
        <li>Fast setup</li>
        <li>Custom validation rules</li>
        <li>Hooks: Before Tag adding, Before Tag deleting ...</li>
        <li>Option to edit tags after creation</li>
        <li>Delete tags on backslash</li>
      </ul>
      <ul>
        <li>Add tags on paste</li>
        <li>Small size: 18kb minified | gzipped 6kb</li>
        <li>Autocompletion</li>
        <li>A lot of customization options</li>
        <li>Own templates for tags and autocomplete items (cooming soon)</li>
      </ul>
    </div>
    <!-- todo: add broswe support -->
    <!--<div class="browser-support">
      <p>browser support</p>
    </div>-->
    <p class="license">License: MIT</p>
  </div>
</template>

<script>
export default {
  name: 'ProjectFeatures',
};
</script>

<style lang="scss" scoped>
.project-features {
  max-width: 900px;
}

.basic {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin-bottom: 20px;
  text-align: center;

  .logo {
    display: flex;
    align-items: center;
    flex-direction: column;
    text-transform: uppercase;

    h2 {
      margin-top: 10px;
    }
  }
}

.features {
  display: flex;
  margin-bottom:40px;

  ul {
    flex: 1;
    list-style-type: disc;
    padding-left: 20px;
  }

  li {
    padding: 8px 10px;
  }
}

@media (max-width: 680px) {
  .features {
    flex-direction: column;
  }
}

</style>
