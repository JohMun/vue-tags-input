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
      <div><span>Parameters:</span></div>
      <ul class="parameters" v-for="(param, index) in item.parameters" :key="index">
        <li class="param content">
          <div>
            <span>Index: </span><span class="code">{{ param.index }}</span>
          </div>
          <div>
            <span>Type: </span><span class="code">{{ param.type }}</span>
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
  border: 1px solid #F2F2F2;
  border-radius: 5px;
  display: flex;
  margin: 50px 0px;
  flex-direction: column;
  max-width: 1200px;
}

.content {
  display: flex;
  padding: 10px;
  flex-direction: column;

  > div {
    display: flex;
    margin: 2px 0;

    span:first-child {
      font-weight: bold;
      margin-right: 8px;
    }
  }
}

.header {
  background: #F2F2F2;
  flex-direction: row;

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
  flex-basis: 120px;
}

.parameters {
  border: 1px solid #F2F2F2;
  border-radius: 5px;
  margin-top: 8px;
}

.param {
  > div {
    margin: 2px 0;
  }
}
</style>
