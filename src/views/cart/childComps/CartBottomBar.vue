<template>
  <div class="bottom-bar">
    <div class="check-area">
      <CheckButton :isChecked="isSelectAll" @click.native="checkClick" />
      <span>全选</span>
    </div>
    <div class="price">合计：￥{{totalPrice}}</div>
    <div class="calculate">去结算：({{checkLength}})</div>
  </div>
</template>

<script>
import CheckButton from "../../../components/content/checkButton/checkButton";
export default {
  name: "CartBottomBar",
  computed: {
    totalPrice() {
      return this.$store.state.cartList
        .filter(item => {
          return item.checked;
        })
        .reduce((preValue, item) => {
          return preValue + item.price * item.count;
        }, 0)
        .toFixed(2);
    },
    checkLength() {
      return this.$store.state.cartList.filter(item => item.checked).length;
    },
    isSelectAll() {
      if (this.$store.state.cartList.length === 0) return false;
      //没选中的情况下有值，得到的值是true，需要取反
      return !this.$store.state.cartList.find(item => !item.checked);
    }
  },
  methods:{
      checkClick(){
          if(this.isSelectAll){//全部选中的话，点击后全部不选中
                this.$store.state.cartList.forEach(item => {
                    item.checked=false
                });
          }else{//部分或全部不选中
              this.$store.state.cartList.forEach(item=>item.checked=true)
          }
      }
  },
  components: {
    CheckButton
  }
};
</script>

<style scoped>
.bottom-bar {
  width: 100%;
  height: 40px;
  line-height: 40px;
  background-color: #f1f1f1;
  display: flex;
  position: relative;
}
.check-area {
  display: flex;
  width: 20%;
  height: 100%;
  justify-content: center;
  align-items: center;
}
.check-area span {
  margin-left: 5px;
  font-size: 14px;
}
.price {
  margin-left: 20px;
}
.calculate {
  position: absolute;
  right: 0;
  width: 120px;
  font-size: 14px;
  color: #fff;
  background-color: red;
  text-align: center;
}
</style>