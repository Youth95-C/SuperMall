<template>
  <div id="app">
    <keep-alive exclude="Detail">
      <router-view />
    </keep-alive>
    <TabBar :tabBar="tabBar" />
  </div>
</template>
<script>
import TabBar from "components/content/tabbar/TabBar";
export default {
  data() {
    return {
      tabBar: [
        {
          path: "/home",
          title: "首页",
          icon: require("./assets/img/tabbar/home.svg"),
          active: require("./assets/img/tabbar/home_active.svg")
        },
        {
          path: "/category",
          title: "分类",
          icon: require("./assets/img/tabbar/category.svg"),
          active: require("./assets/img/tabbar/category_active.svg")
        },
        {
          path: "/cart",
          title: "购物车",
          icon: require("./assets/img/tabbar/shopcart.svg"),
          active: require("./assets/img/tabbar/shopcart_active.svg")
        },
        {
          path: "/profile",
          title: "我的",
          icon: require("./assets/img/tabbar/profile.svg"),
          active: require("./assets/img/tabbar/profile_active.svg")
        }
      ]
    };
  },
  components: {
    TabBar
  }
};
</script>
<style>
@import "assets/css/base.css";
#app {
  width: 100%;
  height: 100vh;
}
</style>
