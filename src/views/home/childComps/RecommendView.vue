<template>
  <div class="recommend">
    <div v-for="(item,index) in recommends" :key="index" class="recommend-item">
      <a :href="item.link">
        <img :src="item.image" alt />
        <p>{{item.title}}</p>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: "RecommendView",
  props: {
    recommends: {
      type: Array,
      default() {
        return [];
      }
    }
  }
};
</script>

<style scoped>
.recommend{
    display:flex;
    font-size:12px;
    text-align:center;
    padding:15px 0 30px;
    margin-bottom:10px;
    background-color:#fff;
}
.recommend-item{
    flex:1;
}
.recommend-item img{
    height:80px;
    width:80px;
    margin-bottom:10px;
}
</style>