<template lang="html">
  <div class="docs-item">
    <div class="header content">
      <div>
        <span>Name:</span>
        <span class="code">{{ item.name }}</span>
      </div>
      <div class="type">
        <span>Type:</span>
        <span class="code">{{ item.type }}</span>
      </div>
    </div>
    <div class="main content">
      <div>
        <span>Description:</span>
        <span>{{ item.description }}</span>
      </div>
      <div class="default" v-if="item.default">
        <span>Default:</span>
        <span>
          <span class="code">{{ item.default }}</span>
        </span>
      </div>
      <div class="required" v-if="item.required">
        <span>Required:</span>
        <span>
          <span class="code">{{ item.required }}</span>
        </span>
      </div>
      <div v-if="item.parameters"><span>Parameters:</span></div>
      <ul v-if="item.parameters" class="parameters" v-for="(param, index) in item.parameters" :key="index">
        <li class="param content">
          <div>
            <span>Type: </span>
            <span><span class="code">{{ param.type }}</span></span>
          </div>
          <div v-if="param.name">
            <span>Name: </span>
            <span><span class="code">{{ param.name }}</span></span>
          </div>
          <div>
            <span>Description:</span>
            <span>{{ param.description }}</span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DocsItem',
  props: ['item'],
};
</script>

<style lang="scss" scoped>
.docs-item {
  border: 1px solid #474949;
  border-radius: 5px;
  display: flex;
  margin: 50px 0px;
  flex-direction: column;
  max-width: 1200px;
}

.content {
  display: flex;
  padding: 15px;
  flex-direction: column;

  > div {
    display: flex;
    margin: 6px 0;

    span:first-child {
      font-weight: bold;
      margin-right: 8px;
    }
  }
}

.header {
  background: #474949;
  flex-direction: row;
  color: #fff;

  > div {
    align-items: center;
    flex: 1;
  }

  > div:first-child {
    flex: 2;
  }
}

.param > div span:first-child,
.main > div span:first-child {
  flex-basis: 115px;
}

.param > div span:last-child,
.main > div span:last-child {
  flex: 1;
}

.parameters {
  border: 1px solid #474949;
  border-radius: 5px;
  margin-top: 8px;
}

.param {
  > div {
    margin: 2px 0;
  }
}
</style>
