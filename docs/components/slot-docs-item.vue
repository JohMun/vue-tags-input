<template lang="html">
  <div class="slot-docs-item">
    <div class="name">
      <span class="value code">{{ item.slot }}</span>
    </div>
    <p v-if="item.description" class="description meta">
      {{ item.description }}
    </p>
    <div v-if="item.props && item.props.length" class="slot-scope meta">
      <span class="label big">Slot Scope</span>
      <ul>
        <li v-for="(prop, index) in item.props" :key="index">
          <div>
            <span class="label">Name</span>
            <span class="code">{{ prop.name }}</span>
          </div>
          <div>
            <span v-if="prop.description" class="label">Description</span>
            <span>{{ prop.description }}</span>
          </div>
          <div>
            <span class="label">Type</span>
            <span class="code">{{ prop.type }}</span>
          </div>
          <div v-if="prop.expectedParams">
            <span class="label">Expected Parameters</span>
            <span class="code">{{ prop.expectedParams }}</span>
          </div>
          <el-code v-if="prop.example" class="js">
            <code v-html="prop.example" />
          </el-code>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import ElCode from './el-code';

export default {
  name: 'SlotDocsItem',
  components: {
    ElCode,
  },
  props: {
    item: {
      type: Object,
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~colors';

.slot-docs-item {
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
    font-size: 1em;
  }
}

.slot-scope {
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
</style>
