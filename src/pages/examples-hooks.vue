<template lang="html">
  <div class="examples-hooks">
    <h1>Hooks</h1>
    <p>
      The tags input component provides different hooks.
      A callback function can be registered, to control the behaviour of tags input.
      For example <span class="code">@before-adding-tag="myCallback"</span>.
      Before a tag is added, the function <span class="code">myCallback</span> is invoked
      and gets an object as paramter. The object contains the properties
      <span class="code">tag</span>, which is the to adding tag and a function named
      <span class="code">addTag</span>. If this funcion is invoked,
      <span class="code">tag</span> will be added.
      You find more information in the <a @click="$router.push({ path: '/docs/events' })">documentations</a>,
      how the other hooks work.
    </p>
    <section>
      <h2>Example 1</h2>
      <p>
        In this example, we save the <span class="code">addTag</span> function
        in <span class="code">handler</span>, when the
        <span class="code">before-adding-tag</span> hook fires.
        If <span class="code">handler</span> is not <span class="code">null</span>,
        we show two buttons. The "Add" button invokes the saved function on click
        and the tag will be added.
      </p>
      <vue-tags-input
         v-model="example1.tag"
         :tags="example1.tags"
         @tags-changed="newTags => example1.tags = newTags"
         @before-adding-tag="obj => example1.handler = obj.addTag"
      />
      <div class="actions" v-if="example1.handler">
        <button @click="cancel1">Cancel</button>
        <button @click="add1">Add</button>
      </div>
      <el-code class="html">
        <code>
&lt;vue-tags-input
  v-model=&quot;tag&quot;
  :tags=&quot;tags&quot;
  @tags-changed=&quot;newTags =&gt; tags = newTags&quot;
  @before-adding-tag=&quot;obj =&gt; handler = obj.addTag&quot;
/&gt;
&lt;div class=&quot;actions&quot; v-if=&quot;handler&quot;&gt;
  &lt;button @click=&quot;cancel&quot;&gt;Cancel&lt;/button&gt;
  &lt;button @click=&quot;add&quot;&gt;Add&lt;/button&gt;
&lt;/div&gt;
        </code>
      </el-code>
      <el-code class="javascript">
        <code>
/* Other stuff before like import tagsinput ... */

data() {
  return {
    tag: '',
    tags: [],
    handler: null,
  };
},
methods: {
  cancel() {
    this.handler = null;
    this.tag = '';
  },
  add() {
    this.handler();
    this.handler = null;
  },
},

        </code>
      </el-code>
    </section>
    <section>
      <h2>Example 2</h2>
      <p>
        In the <span class="code">checkTag</span> function, which is called
        by the <span class="code">before-adding-tag</span> hook, a check is executed.
        If a to adding tag contains the letter "e", an alert box is shown.
      </p>
      <vue-tags-input
         v-model="example2.tag"
         :tags="example2.tags"
         @tags-changed="newTags => example2.tags = newTags"
         @before-adding-tag="checkTag"
       />
       <el-code class="html">
         <code>
&lt;vue-tags-input
  v-model=&quot;tag&quot;
  :tags=&quot;tags&quot;
  @tags-changed=&quot;newTags =&gt; tags = newTags&quot;
  @before-adding-tag=&quot;checkTag&quot;
/&gt;
         </code>
       </el-code>
       <el-code class="javascript">
         <code>
/* Other stuff before like template, data, import tagsinput ... */

 methods: {
   checkTag(obj) {
     if (obj.tag.text.includes('e')) alert('Letter "e" is forbidden');
     else obj.addTag();
   },
 },
         </code>
       </el-code>
    </section>
  </div>
</template>

<script>
import VueTagsInput from '../components/vue-tags-input';
import ElCode from '../components/el-code';

export default {
  name: 'ExamplesHooks',
  components: {
    VueTagsInput,
    ElCode,
  },
  data() {
    return {
      example1: {
        tag: '',
        tags: [],
        handler: null,
      },
      example2: {
        tag: '',
        tags: [],
        handler: null,
      },
    };
  },
  methods: {
    cancel1() {
      this.example1.handler = null;
      this.example1.tag = '';
    },
    add1() {
      this.example1.handler();
      this.example1.handler = null;
    },
    checkTag(obj) {
      if (obj.tag.text.includes('e')) alert('Letter "e" is forbidden');
      else obj.addTag();
    },
  },
};
</script>

<style lang="css" scoped>
span, p {
  line-height: 1.5em;
  max-width: 900px;
}

a {
  text-decoration: underline;
}

.actions {
  display: flex;
}
</style>
