<template>
    <div id="home">
        <!-- 导航栏 -->
        <nav-bar class="navbar">
        <div slot="center">购物街</div>
        </nav-bar>
        <tab-control :titles="['流行','新款','精选']" @tabClick='tabClick' 
            ref="tabControl1" class="tab-control" v-show="isTabFixed"/>
        <scroll class="content1" ref="scroll" :probe-type="3" :pull-up-load="true"
         @scrolling="contentScroll" @pullingUp="loadMore">
            <!-- 轮播图 -->
            <home-swiper :banners="banners" class="swiper1" @swiperImageLoad="swiperImageLoad"></home-swiper>
            <recommend-view :recommends="recommends"/>
            <feature-view/>
            <tab-control :titles="['流行','新款','精选']" @tabClick='tabClick' 
            ref="tabControl2" class="tab"/>
            <goods-list :goodsList="showGoods"/>
        </scroll>
        <!-- 监听组件的点击，加上.native修饰符 -->
        <back-top @click.native="backClick" v-show="isShowBackTop"/>
    </div>
</template>
<script>
import NavBar from 'components/common/navbar/NavBar'
import TabControl from 'components/content/tabControl/TabControl'
import GoodsList from 'components/content/goods/GoodsList'
import BackTop from 'components/content/backTop/BackTop'

import HomeSwiper from './childComs/HomeSwiper'
import RecommendView from './childComs/RecommendView'
import FeatureView from './childComs/FeatureView'

import Scroll from 'components/common/scroll/Scroll'
import {
    getHomeMultidata,
    getHomeGoods
} 
from 'network/home.js'
//import {debounce} from 'common/utils.js'

import {itemImgListenerMixin} from 'common/mixin.js'

export default {
  components: { NavBar,HomeSwiper,RecommendView,FeatureView,TabControl,GoodsList,Scroll,BackTop},
  data(){
      return{
          banners:[],
          recommends:[],
          //存放商品数据的数据结构
          goods:{
              'pop':{page:0,list:[]},
              'new':{page:0,list:[]},
              'sell':{page:0,list:[]}
          },
          currentType:'pop',
          isShowBackTop:false,
          tabOffsetTop:0,
          isTabFixed:false,
          saveY:0
      }
  },
  mixins:[itemImgListenerMixin],
  computed:{
      showGoods(){
          return this.goods[this.currentType].list;
      }
  },
  //created不能拿到DOM元素
  created(){
      this.getHomeMultidata(),
      this.getHomeGoods('pop')
      this.getHomeGoods('new'),
      this.getHomeGoods('sell')
  },
  mounted(){
    //   this.$bus.$on('imgLoadEvent',()=>{
    //       window.console.log('---')
    //       this.scroll&&this.$refs.scroll.refresh();
    //   })
    //1.图片加载完成的事件监听
    // const refresh = debounce(this.$refs.scroll.refresh,100);
    // //对监听的事件进行保存
    // this.itemImgListener = ()=>{
    //     refresh();
    // }
    // this.$bus.$on("imgLoadEvent",this.itemImgListener)
  },
  destroyed(){
      window.console.log('home destroyed');
  },
  activated(){
      this.$refs.scroll.scrollTo(0,this.saveY,0);
      this.$refs.scroll.refresh();
  },
  deactivated(){
      //1.保存Y值
      this.saveY = this.$refs.scroll.scroll.y;
      //2.取消全局事件监听
      this.$bus.$off('imgLoadEvent',this.itemImgListener)
  },
  methods:{
      //事件监听相关方法
      //接收从TabControl传过来的index,对应不同的商品展示种类
      tabClick(index){
          switch(index){
              case 0:
                  this.currentType = 'pop';
                  break;
              case 1:
                  this.currentType = 'new';
                  break;  
              case 2:
                  this.currentType = 'sell';
                  break;    
              
          }
          //使两个tabControl的下标保持一致
          this.$refs.tabControl1.currentIndex = index;
          this.$refs.tabControl2.currentIndex = index;
      },
      backClick(){
          this.$refs.scroll.scrollTo(0,0,500);
      },
      
      contentScroll(position){
          //1.滚动位置超过1000px时，显示返回顶部按钮
          //window.console.log(position);
          this.isShowBackTop = -position.y>1000;
          //2.吸顶效果,滚动到导航栏下方时，isTabFixed为true
          this.isTabFixed = -position.y>this.tabOffsetTop
      },
      loadMore(){
        //   window.console.log('more!')
        this.getHomeGoods(this.currentType);
      },
        
      swiperImageLoad(){
          //2.获取tabControl的offsetTop,等于轮播图加载完成后TabControl的offsetTop
          this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
      },





      //网络请求相关方法
      getHomeMultidata(){
        //1.请求多个数据，是一个异步操作
        getHomeMultidata().then(res=>{
        window.console.log(res);
        //this.result = res;//内存地址赋给result，也就是说和res指向相同的对象
        this.banners = res.data.data.banner.list;
        this.recommends = res.data.data.recommend.list;
      }) 
      },
      getHomeGoods(type){
          //2.请求商品数据
          //每次请求时页数加1（获取的页码数加1）
          const page = this.goods[type].page+1;
          getHomeGoods(type,page).then(res=>{
        //   var i;
        //   for(i in res.data.data.list){
        //       this.goods[type].list.push(i);
        //   }
          this.goods[type].list.push(...res.data.data.list);//把数组中的数据分别push进去
          this.goods[type].page +=1;//更新实际存储的页码数
          this.$refs.scroll.finishPullUp();
      })
      }
  }   
}
</script>
<style scoped>
.navbar{
    background-color: var(--color-tint);
    color:white;
    /* 在使用浏览器原生滚动时，为了让导航不跟随一起滚动，而使用BS后，导航则不需要脱离文档流了 */
    /* position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9; */
    
}
.swiper1{
    margin-top:44px;
}
#home{
    height: 100vh;
    position: relative;
}
/* 使用Better-scroll后不起作用了
.tab{
    //relative和fixed定位的结合 
    position: sticky;
    top:44px;
    z-index: 9;
    background-color: #f6f6f6;
} */

/* 给content确定高度的两种方法 */
/* 通过calc属性 */
/* .content1{
    height: calc(100% - 93px);
    overflow: hidden;
    margin-top: 44px;
} */

/* 通过定位 */
.content1{
    position: absolute;
    top:44px;
    bottom:59px;
    left: 0;
    right: 0;
    overflow: hidden;
}
.tab-control{
    position: relative;
    z-index: 9;
    background-color: #f6f6f6;
}
.tab{
    background-color: #f6f6f6;
}
</style>