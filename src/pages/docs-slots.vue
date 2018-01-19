<template lang="html">
  <div class="docs-slots">
    <section>
      <h1>Tag</h1>
      <h2>Slots:</h2>
      <span class="code">tagLeft</span>
      <span class="code">tagRight</span>
      <span class="code">tagActions</span>
      <h3>Slot props</h3>
      <ul>
        <li><span class="code">tag - object</span></li>
        <li><span class="code">index - number</span></li>
        <li><span class="code">edit - boolean</span></li>
        <li><span class="code">deletion-mark- boolean</span></li>
        <li><span class="code">performDelete - function - expect: index</span></li>
        <li><span class="code">performOpenEdit - function - expect: index</span></li>
        <li><span class="code">performCancelEdit - function - expect: index</span></li>
        <li><span class="code">performSaveEdit - function - expect: index</span></li>
      </ul>
      <h2>Slot:</h2>
      <span class="code">tagCenter (experimental)</span>
      <h3>Slot props</h3>
      <ul>
        <li><span class="code">tag - object</span></li>
        <li><span class="code">index - number</span></li>
        <li><span class="code">edit</span></li>
        <li><span class="code">maxlength</span></li>
        <li><span class="code">deletion-mark- boolean</span></li>
        <li><span class="code">performDelete - function - expect: index</span></li>
        <li><span class="code">performOpenEdit - function - expect: index</span></li>
        <li><span class="code">performCancelEdit - function - expect: index</span></li>
        <li><span class="code">performSaveEdit - function - expect: index</span></li>
        <li><span class="code">validateTag</span></li>
        <li><span class="code">cancelEdit</span></li>
      </ul>
      <p>Explain tag-input component</p>
    </section>
    <section>
      <h1>Automcomplete-items</h1>
      <h2>Slots</h2>
      <span class="code">autocompleteItem</span>
      <h3>Slot props</h3>
      <ul>
        <li><span class="code">item - object</span></li>
        <li><span class="code">index - number</span></li>
        <li><span class="code">selected - boolean</span></li>
        <li><span class="code">performAdd - function - expect: item</span></li>
      </ul>
    </section>
    <p class="other-slots">
      And the slot named between-elements: Between tags and autocomplete -> maybe someone need it.
    </p>
    <!--
      SLOT PROPS

      name: tag
      type: Object
      description: dadsada das das dasd adasd asd sd a
      default: ''

      name: performDelete
      type: function

    -->
  </div>
</template>

<script>
export default {
  name: 'DocsSlots',
};
</script>

<style lang="scss" scoped>

.other-slots {
  margin-top: 60px;
}
</style>
