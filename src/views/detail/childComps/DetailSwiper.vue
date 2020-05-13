<template>
  <Swiper class="swiper-wrapper">
    <Swiper-item v-for="(item,index) in topImages" :key="index">
      <img class="image" :src="item" alt />
    </Swiper-item>
  </Swiper>
</template>

<script>
import { Swiper, SwiperItem } from "../../../components/common/swiper";
export default {
  name: "DetailSwiper",
  props: {
    topImages: {
      type: Array,
      default: []
    }
  },
  components: {
    Swiper,
    SwiperItem
  }
};
</script>

<style scoped>
.swiper-wrapper {
  height: 300px;
  overflow: hidden;
}
</style>