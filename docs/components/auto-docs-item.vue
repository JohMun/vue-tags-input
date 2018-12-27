<template lang="html">
  <div class="auto-docs-item">
    <div class="name">
      <!-- <span class="label">Name</span> -->
      <span class="value code">{{ name }}</span>
    </div>
    <p v-if="description" class="description meta">{{ description }}</p>
    <div v-if="type" class="type meta">
      <span class="label">Type</span>
      <span class="value code">{{ type }}</span>
    </div>
    <div v-if="defaultValue" class="default meta">
      <span class="label">Default</span>
      <span class="value code">{{ defaultValue }}</span>
    </div>
    <div v-if="required" class="required meta">
      <span class="label">Required</span>
      <i class="material-icons">check</i>
    </div>
    <div v-if="sync" class="required meta">
      <span class="label">Sync available</span>
      <i class="material-icons">check</i>
    </div>
    <div v-if="params.length" class="params meta">
      <span class="label big">Parameters</span>
      <ul>
        <li v-for="(param, index) in params" :key="index">
          <div>
            <span class="label">Name</span>
            <span>{{ param.name }}</span>
          </div>
          <div>
            <span class="label">Description</span>
            <span>{{ param.description }}</span>
          </div>
          <div>
            <span class="label">Type</span>
            <template v-if="param.type.elements && param.type.elements.length">
              <span
                v-for="(type2, index2) in param.type.elements"
                :key="index2"
                class="code"
              >
                {{ type2.name }}
                <span v-if="param.type.elements.length - 1 > index2">|</span>
              </span>
            </template>
            <template v-if="param.type.type === 'OptionalType'">
              <span class="code">{{ param.type.expression.name }}</span>
              - Default
              <span class="code">{{ param.default }}</span>
            </template>
            <span v-else class="code">
              {{ param.type.name }}
            </span>
          </div>
        </li>
      </ul>
    </div>
    <div v-if="returnsType" class="returns meta">
      <span class="label">Returns</span>
      <div><span class="value code">{{ returnsType }}</span></div>
      <span class="value text">{{ returnsDescription }}</span>
    </div>
    <div v-if="hook" class="hook meta">
      <span class="label">Hook</span>
      <i class="material-icons">check</i>
    </div>
    <el-code v-if="example" class="js">
      <code v-html="example" />
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
  props: {
    item: {
      type: Object,
    },
    kebabName: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    name() {
      const name = this.model ? 'v-model' : this.item.name;
      return this.kebabName ? kebabCase(name) : name;
    },
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
    sync() {
      return !!this.item.tags.find(t => t.title === 'sync');
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
    params() {
      return this.item.tags.filter(t => t.title === 'param');
    },
  },
};
</script>

<style lang="scss" scoped>
@import 'colors';

.auto-docs-item {
  margin: 35px 0;
}

.meta {
  margin: 6px 0;
}

.name {
  font-size: 1.15em;
  padding-bottom: 6px;
  border-bottom: 1px solid #ccc;
}

.label {
  margin-right: 6px;
  color: $primary;
  font-weight: 500;

  &.big {
    font-size: 0.925em;
  }
}

.required, .hook {
  display: flex;
  align-items: center;

  i {
    margin-top: -4px;
  }
}

.params {
  display: flex;
  flex-direction: column;

  ul {
    margin-top: 2px;
    margin-left: 6px;
    display: flex;
    flex-direction: column;
  }

  ul li {
    display: flex;
    flex-direction: column;
    margin-bottom: 14px;
  }

  ul li .label {
    color: #fff;
  }
}

.returns {
  display: flex;
}

.text {
  margin-left: 6px;
}
</style>
