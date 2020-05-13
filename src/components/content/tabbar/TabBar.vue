<template>
  <div class="tab-bar">
    <router-link
      class="tab-bar-item"
      active-class="is-selected"
      replace
      v-for="(item,index) in tabBar"
      :key="index"
      :to="item.path"
    >
      <div>
        <img v-if="$route.path.indexOf(item.path)" class="tab-item-img" :src="item.icon" alt />
        <img v-else class="tab-item-img" :src="item.active" alt />
      </div>
      <div class="tab-item-title">{{item.title}}</div>
    </router-link>
  </div>
</template>

<script>
export default {
  props: {
    tabBar: Array
  }
};
</script>

<style scoped>
.tab-bar {
  width: 100%;
  height: 49px;
  background-color: #f6f6f6;
  display: flex;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  box-shadow: 0 -1px 1px rgba(100, 100, 100, 0.08);
}
.tab-bar-item {
  flex: 1;
  height: 49px;
  text-align: center;
}
.tab-item-img {
  width: 24px;
  height: 24px;
  margin-top: 3px;
  vertical-align: middle;
}
.is-selected {
  color: var(--color-tint);
}
</style>