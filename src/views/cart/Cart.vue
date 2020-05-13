<template>
  <div id="cart">
    <!--导航栏-->
    <NavBar class="cart-nav">
      <h4 slot="center">购物车({{cartLength}})</h4>
    </NavBar>
    <!--商品列表-->
    <CartList />
    <!--底部汇总-->
    <CartBottomBar />
  </div>
</template>

<script>
import NavBar from "../../components/common/navbar/NavBar";
import CartList from "./childComps/CartList";
import CartBottomBar from "./childComps/CartBottomBar";
import { mapGetters } from "vuex";
export default {
  name: "Cart",
  data() {
    return {};
  },
  computed: {
    //两种语法
    ...mapGetters(["cartLength"])
    //   ...mapGetters({
    //       length:'CartLength'//是mapState把'cartLength'的值映射给了length
    //   })
  },
  components: {
    NavBar,
    CartList,
    CartBottomBar
  }
};
</script>

<style scoped>
#cart {
  height: 100%;
  background-color: #f1f1f1;
}
.cart-nav {
  background-color: var(--color-tint);
  color: #fff;
}
</style>