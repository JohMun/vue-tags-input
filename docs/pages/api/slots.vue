<template lang="html">
  <div class="slots page">
    <div class="content">
      <h1>Slots</h1>
      <ul>
        <li class="docs-item" v-for="(s, index) in slots" :key="index">
          <slot-docs-item :item="s" />
        </li>
      </ul>

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
          <li><span class="code">performSaveTag - function - expect: index</span></li>
        </ul>
        <h2>Slot: (experimental)</h2>
        <span class="code">tagCenter</span>
        <h3>Slot props</h3>
        <ul>
          <li><span class="code">tag - object</span></li>
          <li><span class="code">index - number</span></li>
          <li><span class="code">edit - boolean</span></li>
          <li><span class="code">maxlength - number</span></li>
          <li><span class="code">deletion-mark- boolean</span></li>
          <li><span class="code">performDelete - function - expect: index</span></li>
          <li><span class="code">performOpenEdit - function - expect: index</span></li>
          <li><span class="code">performCancelEdit - function - expect: index</span></li>
          <li><span class="code">performSaveTag - function - expect: index, event</span></li>
          <li><span class="code">validateTag - function - expect: index, event</span></li>
        </ul>
        <!--<p>Explain tag-input component</p>-->
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
        And the slot <span class="code">between-elements</span>
        is positioned between the tags and the autocomplete layer.
        Maybe someone needs it.
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
  </div>
</template>

<script>
import sortBy from 'lodash/sortBy';
import SlotDocsItem from '../../components/slot-docs-item';

export default {
  name: 'Slots',
  components: {
    SlotDocsItem,
  },
  data() {
    return {
      slots: sortBy(window.docs.slots),
    };
  },
};
</script>

<style lang="scss" scoped>

.other-slots {
  margin-top: 60px;
}
</style>
