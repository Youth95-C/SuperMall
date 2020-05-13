<template>
  <div id="home">
    <!--导航栏-->
    <NavBar class="home-nav">
      <h4 slot="center">购物街</h4>
    </NavBar>
    <TabControl
      :title="['流行','新款', '精选']"
      class="fixed"
      @tabClick="tabClick"
      ref="tabControl1"
      v-show="isTabFixed"
    />
    <Scroll
      class="scroll-tap"
      ref="homeScroll"
      :probeType="3"
      :pullUpLoad="true"
      @scroll="contentScroll"
      @pullingUp="loadMore"
    >
      <!--轮播图-->
      <Swiper>
        <Swiper-item v-for="(item,index) in banners" :key="index">
          <a :href="item.link">
            <img :src="item.image" alt @load="imageLoad" />
          </a>
        </Swiper-item>
      </Swiper>
      <!--推荐内容-->
      <RecommendView :recommends="recommends" />
      <!--特点-->
      <FeatureView />
      <!--tab控件-->
      <TabControl :title="['流行','新款', '精选']" @tabClick="tabClick" ref="tabControl2" />
      <!--商品列表-->
      <GoodsList :goods="showGoods" @itemImageLoad="itemImageLoad" />
    </Scroll>
    <!--回到顶部-->
    <BackTop @click.native="backClick" v-show=" isShowBackTop" />
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import { Swiper, SwiperItem } from "../../components/common/swiper";
import Scroll from "../../components/common/scroll/Scroll";

import TabControl from "../../components/content/tabControl/TabControl";
import GoodsList from "../../components/content/goods/GoodsList";
import BackTop from "../../components/content/backTop/BackTop";

import RecommendView from "./childComps/RecommendView";
import FeatureView from "./childComps/FeatureView";
import { getHomeMultidata, getHomeGoods } from "../../network/home";
import {itemListenerMixin} from '../../common/mixin'

export default {
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        pop: {
          page: 0,
          list: []
        },
        new: {
          page: 0,
          list: []
        },
        sell: {
          page: 0,
          list: []
        }
      },
      currentType: "pop",
      isShowBackTop: false,
      isLoad: false,
      tabOffsetTop: 0,
      isTabFixed: false,
      saveY: 0,
      //防抖函数后的操作存储
      refresh:null
    };
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list;
    }
  },
  // mixin:[itemListenerMixin],
  created() {
    //请求首页多个数据
    this.getHomeMultidata();
    //请求商品数据
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
    //监听item中的图片加载完成
    //created的时候组件还未被挂载，所以容易报错，应该在mounted里调用
    // this.$bus.$on("itemImageLoad", () => {
    //   this.$refs.scroll.refresh();
    //   console.log('-----')
    // });
  },
  mounted() {
    // const refresh = this.debounce(this.$refs.homeScroll.refresh, 300);
    // this.$bus.$on("itemImageLoad", () => {
    //   //this.$refs.scroll.refresh(); //但会调用的十分频繁，需要使用防抖函数
    //   console.log('hahha')
    //   refresh();
    // });
    //混入的代码会与这里面的合在一起
    this.refresh= this.debounce(this.$refs.homeScroll.refresh, 100)
  },
  //activated和deactivated要keep-alive存在的情况下生效
  activated() {
    console.log("activated");
    this.$refs.homeScroll.scrollTo(0, this.saveY, 0);
  },
  deactivated() {
    console.log("deactivated");
    this.saveY = this.$refs.homeScroll.scroll.y;
  },
  methods: {
    //防抖函数
    debounce(func, delay) {
      //func是要执行的函数，delay是延迟执行的时间
      let timer = null;
      return function(...args) {
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => {
          func.apply(this, args);
        }, delay);
      };
    },
    getHomeMultidata() {
      getHomeMultidata().then(res => {
        console.log(res);
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      });
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then(res => {
        console.log(res.data);
        this.goods[type].list.push(...res.data.list); 
        this.goods[type].page += 1;
        this.$refs.homeScroll.finishPullUp();
      });
    },
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
      }
      //父组件向子组件传值
      this.$refs.tabControl1.currentIndex = index;
      this.$refs.tabControl2.currentIndex = index;
    },
    backClick() {
      this.$refs.homeScroll.scrollTo(0, 0);
    },
    contentScroll(position) {
      // console.log(position.y);
      // if (position.y < -1000) {
      //   this.isShowBackTop = true;
      // } else {
      //   this.isShowBackTop = false;
      // }
      //决定BackTop是否显示
      this.isShowBackTop = -position.y+44 > 1000;
      //决定TabControl是否吸顶
      this.isTabFixed = -position.y + 44 > this.tabOffsetTop;
    },
    loadMore() {
      this.getHomeGoods(this.currentType);
    },
    imageLoad() {
      if (!this.isLoad) {
        console.log(this.$refs.tabControl2.$el.offsetTop);
        this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
        this.isLoad = true;
      }
    },
    itemImageLoad() {
      this.refresh()
    }
  },
  components: {
    NavBar,
    Swiper,
    SwiperItem,
    RecommendView,
    FeatureView,
    TabControl,
    GoodsList,
    Scroll,
    BackTop
  }
};
</script>

<style scoped>
#home {
  background-color: #f1f1f1;
  height: 100%;
}
.home-nav {
  background-color: var(--color-tint);
  color: #fff;
}
/* .tab-control {
  position: sticky;
  top: 44px;
  z-index: 10;
} */
.scroll-tap {
  height: calc(100% - 93px);
  overflow: hidden;
}
.fixed {
  position: fixed;
  left: 0;
  right: 0;
  top: 44px;
  z-index: 10;
}
</style>