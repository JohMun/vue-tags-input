<template lang="html">
  <div class="examples-hooks">
    <h1>Hooks</h1>
    <!--todo: <span>What are Hooks good for?</span>-->
    <span>
      <span class="code">@before-adding-tag</span>&nbsp;
      <span class="code">@before-deleting-tag</span>&nbsp;
      <span class="code">@before-saving-tag</span>&nbsp;
    </span>
    <section>
      <h2>Example 1</h2>
      <!--todo: Explain what happens here <p></p> -->
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
 &lt;div class=&quot;actions&quot; v-if=&quot;example1.handler&quot;&gt;
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
      <!--todo: Explain what happens here <p></p> -->
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
.actions {
  display: flex;
}
</style>
