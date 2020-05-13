import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Mint from "mint-ui";
import FastClick from "fastclick";
import LazyLoad from "vue-lazyload"
import "./assets/icon/iconfont.css";
Vue.use(Mint);
Vue.config.productionTip = false;
Vue.prototype.$bus = new Vue();
//解决移动端300ms的延迟
FastClick.attach(document.body);
//使用懒加载的插件
Vue.use(LazyLoad,{
  loading:require("./assets/img/common/placeholder.png")
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
