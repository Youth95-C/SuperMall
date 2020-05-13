<template>
  <div class="cart-list">
    <Scroll class="scroll-cart" ref="CartScroll">
      <!--checked必须在数据模型里定义-->
      <div class="cart-list-item" v-for="(item,index) in cartList" :key="index" @click="item.checked=!item.checked">
        <div class="item-selector">
          <CheckButton :isChecked="item.checked"/>
        </div>
        <div class="item-img">
          <img :src="item.image" alt="商品图片" />
        </div>
        <div class="item-info">
          <div class="item-title">{{item.title}}</div>
          <div class="item-desc">商品描述: {{item.desc}}</div>
          <div class="info-bottom">
            <div class="item-price left">¥{{item.price}}</div>
            <div class="item-count right">x{{item.count}}</div>
          </div>
        </div>
      </div>
    </Scroll>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Scroll from "../../../components/common/scroll/Scroll";
import CheckButton from "../../../components/content/checkButton/checkButton";
export default {
  name: "CartList",
  computed: {
    ...mapGetters(["cartList"])
  },
  components: {
    Scroll,
    CheckButton
  },
  activated() {
    this.$refs.CartScroll.refresh();
  }
};
</script>

<style scoped>
.cart-list {
  height: calc(100% - 44px - 49px - 40px);
  background-color:#fff;
}
.scroll-cart {
  height: 100%;
  overflow: hidden;
}
.cart-list-item {
  width: 100%;
  display: flex;
  font-size: 0;
  padding: 5px;
  border-bottom: 1px solid #ccc;
}
.item-selector {
  width: 14%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.item-title,
.item-desc {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.item-img {
  padding: 5px;
  /*border: 1px solid #ccc;*/
}

.item-img img {
  width: 80px;
  height: 100px;
  display: block;
  border-radius: 5px;
}

.item-info {
  font-size: 17px;
  color: #333;
  padding: 5px 10px;
  position: relative;
  overflow: hidden;
}

.item-info .item-desc {
  font-size: 14px;
  color: #666;
  margin-top: 15px;
}

.info-bottom {
  margin-top: 10px;
  position: absolute;
  bottom: 10px;
  left: 10px;
  right: 10px;
}

.info-bottom .item-price {
  color: orangered;
}
</style>