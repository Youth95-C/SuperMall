import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    cartList: []
  },
  getters: {
    cartLength(state) {
      return state.cartList.length;
    },
    cartList(state) {
      return state.cartList;
    }
  },
  mutations: {
    //mutations唯一的目的就是修改state中的状态
    //mutations中的每个方法尽可能完成的事件比较单一，所以一个方法里最好不要有两种操作，所以addCart()方法
    //最好不要放在mutations里
    addCounter(state, playload) {
      playload.count++;
    },
    addToCart(state, payload) {
      payload.checked = false;
      state.cartList.push(payload);
    }
  },
  actions: {
    //actions里除了异步操作还可以有判断
    addCart(context, payload) {
      return new Promise((resolve, reject) => {
        console.log(context);
        //要判断此商品是否已经添加到了购物车中，如果有就不能重复添加
        // let oldProduct = null;
        // for(let item of state.cartList){
        //   if(item.iid===payload.iid){
        //     oldProduct=item
        //   }
        // }
        //要判断此商品是否已经添加到了购物车中，如果有就不能重复添加
        let oldProduct = context.state.cartList.find(
          item => item.iid === payload.iid
        );
        if (oldProduct) {
          // oldProduct.count += 1;
          context.commit("addCounter", oldProduct);
          resolve('当前的商品数量+1')
        } else {
          payload.count = 1;
          // context.state.cartList.push(payload);
          context.commit("addToCart", payload);
          resolve('添加购物车成功')
        }
      });
    }
  },
  modules: {}
});
