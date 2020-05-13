<template>
  <div id="detail">
    <DetailNav class="detail-nav" @titleClick="titleClick" ref="detailNav" />
    <Scroll
      class="detail-scroll"
      ref="detailScroll"
      :pullUpLoad="true"
      :probeType="3"
      @scroll="contentScroll"
    >
      <DetailSwiper :topImages="topImages" />
      <DetailBaseInfo :goods="goods" />
      <DetailShopInfo :shop="shop" />
      <DetailGoodsInfo :detailInfo="detailInfo" @imageLoad="imageLoad" />
      <DetailParamInfo ref="params" :paramsInfo="itemParams" />
      <DetailCommentInfo ref="comment" :commentInfo="commentInfo" />
      <GoodsList ref="recommend" :goods="recommends" @itemImageLoad="itemImageLoad" />
    </Scroll>
    <DetailBottomBar @addCart="addToCart" />
    <BackTop @click.native="backClick" v-show=" isShowBackTop" />
    <Toast :message="message" v-show="message" />
  </div>
</template>

<script>
import { getDetail, Goods, Shop, getRecommend } from "../../network/detail";
import Scroll from "../../components/common/scroll/Scroll";
import DetailNav from "./childComps/DetailNav";
import DetailSwiper from "./childComps/DetailSwiper";
import DetailBaseInfo from "./childComps/DetailBaseInfo";
import DetailShopInfo from "./childComps/DetailShopInfo";
import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
import DetailParamInfo from "./childComps/DetailParamInfo";
import DetailCommentInfo from "./childComps/DetailCommentInfo";
import DetailBottomBar from "./childComps/DetailBottomBar";
import GoodsList from "../../components/content/goods/GoodsList";
import BackTop from "../../components/content/backTop/BackTop";
import Toast from "../../components/common/toast/Toast";

export default {
  name: "Detail",
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      itemParams: {},
      commentInfo: {},
      recommends: [],
      themeTopYs: [],
      message: "",
      currentIndex: 0,
      isShowBackTop: false
    };
  },
  created() {
    console.log(this.$route.params.id);
    //保存传入的iid
    this.iid = this.$route.params.id;
    //请求详情数据
    getDetail(this.iid).then(res => {
      console.log(res);
      const data = res.result;
      this.topImages = data.itemInfo.topImages;
      this.goods = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );
      //获取店铺信息
      this.shop = new Shop(data.shopInfo);
      //获取商品详细信息
      this.detailInfo = data.detailInfo;
      //取出参数信息
      this.itemParams = data.itemParams;
      //取出评论的信息
      if (data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list[0];
        //这里获取值不对是因为各组件还未被渲染挂载
        //  this.themeTopYs = [];
        // this.themeTopYs.push(0);
        // this.themeTopYs.push(this.$refs.params.$el.offsetTop);
        // this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
        // this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
        // console.log(this.themeTopYs);
      }
      //$nextTick()方法是根据以上最新得到的数据，对应的DOM是已经被渲染出来了
      //但是图片还没加载完，所以目前获取到的offsetTop不包含图片的高度
      // this.$nextTick(() => {
      //   this.themeTopYs = [];
      //   this.themeTopYs.push(0);
      //   this.themeTopYs.push(this.$refs.params.$el.offsetTop);
      //   this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
      //   this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
      //   console.log(this.themeTopYs);
      // });
    });

    //请求推荐数据
    getRecommend().then(res => {
      console.log(res);
      this.recommends = res.data.list;
    });
  },
  mounted() {
    // this.$bus.$on("detailImageLoad", () => {
    //   this.$refs.detailScroll.refresh();
    // });
    //因为这些个组件的渲染是有前提条件(v-if)，而那些数据是在created里异步获取的，此时并未全部获取到，所以这里要放在created里操作
    // this.themeTopYs.push(0)
    // this.themeTopYs.push(this.$refs.params.$el.offsetTop)
    // this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
    // this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
  },
  methods: {
    imageLoad() {
      this.$refs.detailScroll.refresh();
      this.themeTopYs = [];
      this.themeTopYs.push(0);
      this.themeTopYs.push(this.$refs.params.$el.offsetTop);
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
      // console.log(this.themeTopYs);
    },
    titleClick(index) {
      const themeTopY = -this.themeTopYs[index] + 44;
      this.$refs.detailScroll.scrollTo(0, themeTopY, 100);
    },
    contentScroll(position) {
      // console.log(position);
      this.isShowBackTop = -position.y + 44 > 1000;
      //1.获取y值
      const positionY = -position.y + 44;
      //2.positionY和 themeTopYs中的值做对比
      //[0，7938，9120，9452]
      //positionY在0和7928之间，index=0
      //positionY在7938和9120之间，index=1
      //positionY超过9120，index=1
      // console.log(positionY)
      //方式一：循环出来的i是字符串类型，所以不适用
      // for (let i in this.themeTopYs) {
      //   // console.log(i) i是字符串类型
      //   if (
      //     positionY > this.themeTopYs[i] &&
      //     positionY < this.themeTopYs[i + 1]
      //   ) {
      //     console.log(i); //循环出来的i类型是字符串类型
      //   }
      // }
      let length = this.themeTopYs.length;

      for (let i = 0; i < length; i++) {
        if (
          (i < length - 1 &&
            positionY >= this.themeTopYs[i] &&
            positionY < this.themeTopYs[i + 1]) ||
          (i === length - 1 && positionY >= this.themeTopYs[i])
        ) {
          this.currentIndex = i;
          this.$refs.detailNav.currentIndex = this.currentIndex;
          // console.log(i);
        }
      }
    },
    itemImageLoad() {
      this.$refs.detailScroll.refresh();
    },
    addToCart() {
      //获取购物车需要展示的信息
      const product = {};
      product.image = this.topImages[0];
      product.title = this.goods.title;
      product.desc = this.goods.desc;
      product.price = this.goods.realPrice;
      product.iid = this.iid;
      //将商品添加到购物车里
      // this.$store.commit('addCart',product)
      this.$store.dispatch("addCart", product).then(res => {
        this.message = res;
        setTimeout(() => {
          this.message = "";
        }, 1000);
      });
    },
    backClick() {
      this.$refs.detailScroll.scrollTo(0, 0);
    }
  },
  components: {
    DetailNav,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    Scroll,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    GoodsList,
    DetailBottomBar,
    Toast,
    BackTop
  }
};
</script>

<style scoped>
#detail {
  height: 100%;
  background-color: #f1f1f1;
  position: relative;
  z-index: 9;
}
.detail-nav {
  background-color: #fff;
}
.detail-scroll {
  height: calc(100% - 44px);
  overflow: hidden;
}
</style>