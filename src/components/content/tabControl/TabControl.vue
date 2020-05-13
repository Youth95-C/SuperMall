<template>
  <div class="tab-control">
    <div
      class="tab-item"
      v-for="(item,index) in title"
      :key="index"
      :class="{'active':index===currentIndex}" @click="itemClick(index)"
    >
      <span>{{item}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "TabControl",
  data() {
    return {
      currentIndex: 0
    };
  },
  props: {
    title: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  methods:{
      itemClick(index){
          this.currentIndex=index
          this.$emit('tabClick',index)
      }
  } 
};
</script>

<style scoped>
.tab-control {
  display: flex;
  height: 40px;
  line-height: 40px;
  text-align: center;
  background-color: #fff;
}
.tab-item {
  flex: 1;
}
.tab-item span{
   padding:5px;
}
.active {
  color: var(--color-high-text);
}
.active span {
  border-bottom: 3px solid var(--color-tint);
}
</style>