<template lang="html">
  <div class="auto-docs-item">
    <div class="name">
      <!-- <span class="label">Name</span> -->
      <span class="value code">{{ model ? 'v-model' : kebabCase(item.name) }}</span>
    </div>
    <p class="description meta" v-if="description">{{ description }}</p>
    <div class="type meta" v-if="type">
      <span class="label">Type</span>
      <span class="value code">{{ type }}</span>
    </div>
    <div class="default meta" v-if="defaultValue">
      <span class="label">Default</span>
      <span class="value code">{{ defaultValue }}</span>
    </div>
    <div class="required meta" v-if="required">
      <span class="label">Required</span>
      <i class="material-icons">check</i>
    </div>
    <div class="returns meta" v-if="returnsType">
      <span class="label">Returns</span>
      <div><span class="value code">{{ returnsType }}</span></div>
      <span class="value text">{{ returnsDescription }}</span>
    </div>
    <div class="hook meta" v-if="hook">
      <span class="label">Hook</span>
      <i class="material-icons">check</i>
    </div>
    <el-code v-if="example">
      <code v-html="example"></code>
    </el-code>
  </div>
</template>

<script>
import ElCode from './el-code';
import kebabCase from 'lodash/kebabCase';

export default {
  name: 'AutoDocsItem',
  components: {
    ElCode,
  },
  props: ['item'],
  computed: {
    model() {
      return this.item.tags.find(t => t.title === 'model');
    },
    description() {
      const item = this.item.tags.find(t => t.title === 'description');
      return item && item.description;
    },
    defaultValue() {
      const item = this.item.tags.find(t => t.title === 'default');
      return item && item.description;
    },
    hook() {
      const item = this.item.properties.find(t => t.title === 'property');
      return item && item.type.name === 'events' && item.name === 'hook';
    },
    required() {
      return !!this.item.tags.find(t => t.title === 'required');
    },
    type() {
      const item = this.item.tags.find(t => t.title === 'type');
      return item && item.type && item.type.name;
    },
    example() {
      const item = this.item.tags.find(t => t.title === 'example');
      return item && item.description;
    },
    returnsDescription() {
      const item = this.item.tags.find(t => t.title === 'returns');
      return item && item.description;
    },
    returnsType() {
      const item = this.item.tags.find(t => t.title === 'returns');
      return item && item.type && item.type.name;
    },
  },
  methods: {
    kebabCase,
  },
};
</script>

<style lang="scss" scoped>
@import '~colors';

.auto-docs-item {
  margin: 35px 0;
}

.meta {
  margin: 6px 0;
}

.name {
  font-size: 17px;
  padding-bottom: 6px;
  border-bottom: 1px solid #ccc;
}

.label {
  margin-right: 6px;
  color: $primary;
  font-weight: bold;
}

.required, .hook {
  display: flex;
  align-items: center;

  i {
    margin-top: -4px;
  }
}

.returns {
  display: flex;
}

.text {
  margin-left: 6px;
}
</style>
