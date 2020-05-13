<template>
  <NavBar>
    <div slot="left" class="back" @click="backClick">
      <img src="~assets/img/common/back.svg" alt />
    </div>
    <div slot="center" class="titles">
      <div
        v-for="(item,index) in titles"
        :key="index"
        class="item-title"
        @click="itemClick(index)"
        :class="{'active':currentIndex===index}"
      >
        <span>{{item}}</span>
      </div>
    </div>
  </NavBar>
</template>

<script>
import NavBar from "../../../components/common/navbar/NavBar";
export default {
  name: "DetailNav",
  data() {
    return {
      titles: ["商品", "参数", "评论", "推荐"],
      currentIndex: 0
    };
  },
  methods: {
    itemClick(index) {
      this.currentIndex = index;
      this.$emit("titleClick", index);
    },
    backClick() {
      //回退一步
      //
       this.$router.go(-1)
      //this.$router.back(); //不能记录来时的页面状态
    }
  },
  components: {
    NavBar
  }
};
</script>

<style scoped>
.titles {
  display: flex;
}
.item-title {
  flex: 1;
  font-size: 14px;
}
.active {
  color: var(--color-high-text);
}
.back img {
  margin-top: 12px;
}
</style>