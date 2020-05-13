<template>
  <div class="goods">
    <div v-for="(item,index) in goods" :key="index" class="goods-item" @click="itemClick(item.iid)">
      <img v-lazy="item.image||item.show.img" @load="imageLoad" />
      <div class="goods-info">
        <p>{{item.title}}</p>
        <span class="price">{{item.price}}</span>
        <span class="collect">{{item.cfav}}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    goods: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  methods: {
    imageLoad() {
      this.$emit("itemImageLoad");
      //这里的/home和/detail不能获取
      // if (this.$route.path.indexOf("/home")) {
      //   this.$emit("itemImageLoad");
      // }else if(this.$route.path.indexOf('/detail')){
      //   this.$emit('detailImageLoad')
      // }
    },
    itemClick(id) {
      this.$router.push("/detail/" + id);
    }
  }
};
</script>

<style scoped>
.goods {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  padding: 5px 2px;
  background-color: #fff;
}
.goods-item {
  width: 48%;
  padding-bottom: 40px;
  position: relative;
}
.goods-item img {
  width: 100%;
  border-radius: 5px;
}
.goods-info {
  font-size: 12px;
  position: absolute;
  bottom: 5px;
  left: 0;
  right: 0;
  overflow: hidden;
  text-align: center;
}
.goods-info p {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-bottom: 3px;
}
.goods-info .price {
  color: var(--color-high-text);
  margin-right: 20px;
}

.goods-info .collect {
  position: relative;
}

.goods-info .collect::before {
  content: "";
  position: absolute;
  left: -15px;
  top: -1px;
  width: 14px;
  height: 14px;
  background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
}
</style>