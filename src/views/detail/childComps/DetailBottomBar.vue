<template>
  <div class="bottom-bar">
    <div class="bar-item bar-left">
      <div>
        <i class="iconfont iconkefu"></i>
        <span class="text">客服</span>
      </div>
      <div>
        <i class="iconfont icondianpu"></i>
        <span class="text">店铺</span>
      </div>
      <div>
        <i class="iconfont iconshoucang"></i>
        <span class="text">收藏</span>
      </div>
    </div>
    <div class="bar-item bar-right">
      <div class="cart" @click="addToCart">加入购物车</div>
      <div class="buy">购买</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailBottomBar",
  methods:{
      addToCart(){
          this.$emit('addCart')
      }
  }
};
</script>

<style scoped>
.bottom-bar {
  width: 100%;
  height: 49px;
  /* line-height: 49px; */
  position: fixed;
  left: 0;
  bottom: 0;
  z-index: 20;
  display: flex;
}
.bar-item {
  flex: 1;
  display: flex;
}
.bar-item > div {
  flex: 1;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
}
.bar-left {
  background-color: #fff;
}
.bar-left>i{
    line-height:0;
}
.bar-left .text {
    margin-top:10px;
  font-size: 12px;
  line-height:0;
}
.bar-right {
  font-size: 16px;
  color: #fff;
  text-align: center;
}
.bar-right .cart {
  background-color: #ffe817;
  color: #333;
}

.bar-right .buy {
  background-color: #f69;
}
</style>