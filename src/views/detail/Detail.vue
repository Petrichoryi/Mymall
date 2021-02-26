<template>
    <div id="detail">
        <detail-nav-bar class="top-nav" @titleClick="titleClick" ref="navbar"/>
        <scroll class="content" ref="scroll" :probeType='3' @scrolling='contentScroll'>
            <detail-swiper :topImages="topImages"/>
            <detail-base-info :Goods='Goods'/>
            <detail-shop-info :shop="shop"/>
            <detail-goods-info :detailInfo="detailInfo" @imgLoad="imgLoad"/>
            <detail-param-info :paramInfo="paramInfo" ref="param"/>
            <detail-comment-info :commentInfo="commentInfo" ref="comment"/>
            <goods-list :goodsList="recommend" ref="recommend"/>  
        </scroll>
        <detail-bottom-bar @addCart="addToCart"/>
        <back-top @click.native="backClick" v-show="isShowBackTop"/>
        <!-- <toast :show="show" :msg="message"/> -->
    </div>
</template>
<script>
import DetailNavBar from './childComps/DetailNavBar'
import DetailSwiper from './childComps/DetailSwiper'
import DetailBaseInfo from './childComps/DetailBaseInfo'
import DetailShopInfo from './childComps/DetailShopInfo'
import DetailGoodsInfo from './childComps/DetailGoodsInfo'
import DetailParamInfo from './childComps/DetailParamInfo'
import DetailCommentInfo from './childComps/DetailCommentInfo'
import DetailBottomBar from './childComps/DetailBottomBar'



import {getDetail,Goods,Shop,GoodsParam,getRecommend} from 'network/detail.js'
import Scroll from 'components/common/scroll/Scroll.vue'
import GoodsList from 'components/content/goods/GoodsList.vue'
//import Toast from 'components/common/Toast/Toast.vue'

import {itemImgListenerMixin,backTopMixin} from 'common/mixin.js'
import {debounce} from 'common/utils.js'

import {mapActions} from 'vuex'

export default {
    name:'Detail',
    components:{
        DetailNavBar,
        DetailSwiper,
        DetailBaseInfo,
        DetailShopInfo,
        Scroll,
        DetailGoodsInfo,
        DetailParamInfo,
        DetailCommentInfo,
        GoodsList,
        DetailBottomBar,
        //Toast
        },
    mixins:[itemImgListenerMixin,backTopMixin],
    data(){
        return{
            iid:null,
            topImages:[],
            Goods:{},
            shop:{},
            detailInfo:{},
            paramInfo:{},
            commentInfo:{},
            recommend:[],
            themeTopYs:[],
            getThemeTopY:null,
            currentIndex:0,
            // show:null,
            // message:""
            
        }
    },
    created(){
        this.iid = this.$route.params.iid;
        //window.console.log(this.iid)
        getDetail(this.iid).then(res=>{
            window.console.log(res);
            //1.获取顶部的轮播图片
            var data = res.data.result;
            this.topImages = data.itemInfo.topImages;
            //window.console.log(res);
            //2.将商品详细信息存到对象里
            this.Goods = new Goods(data.itemInfo,data.columns,data.shopInfo.services)
            //3.将店铺信息存到对象里
            this.shop = new Shop(data.shopInfo)
            //4.商品图片信息
            this.detailInfo = data.detailInfo
            //5.获取商品参数信息
            this.paramInfo = new GoodsParam(data.itemParams.info,data.itemParams.rule)
            //6.获取评论信息
            if(data.rate.crate!==0){
                this.commentInfo = data.rate.list[0]
                //window.console.log(this.commentInfo)
            }
        }),
        //7.获取推荐商品的信息
        getRecommend().then(res=>{
            this.recommend = res.data.data.list;
        })
        // this.$nextTick(()=>{
        //     //dom渲染完了，图片还没有进行加载
        //     this.themeTopYs = [];
        //     this.themeTopYs.push(0);
        //     this.themeTopYs.push(this.$refs.param.$el.offsetTop);
        //     this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
        //     this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
        //     window.console.log(this.themeTopYs);
        // })
        
        //对themeTopYs赋值的操作进行防抖
        this.getThemeTopY = debounce(()=>{
            this.themeTopYs = [];
            this.themeTopYs.push(0);
            this.themeTopYs.push(this.$refs.param.$el.offsetTop);
            this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
            this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
            this.themeTopYs.push(Number.MAX_VALUE)
            //window.console.log(this.themeTopYs);
        },500)
        
    },
    mounted(){
    // //1.图片加载完成的事件监听
    // const refresh = debounce(this.$refs.scroll.refresh,100);
    // //对监听的事件进行保存
    // this.itemImgListener = ()=>{
    //     refresh();
    // }
    // this.$bus.$on("imgLoadEvent",this.itemImgListener)
    },

    destroyed(){
         //取消全局事件监听
        this.$bus.$off("imgLoadEvent",this.itemImgListener)
    },
    methods:{
        ...mapActions(['addCart']),
        imgLoad(){
            //this.$refs.scroll.refresh();
            //window.console.log('ww')
            this.newRefresh()
            this.getThemeTopY()
            
        },
        //点击标题，滚动到对应的主题
        titleClick(index){
            this.$refs.scroll.scrollTo(0,-this.themeTopYs[index],100);
        //     switch(index){
        //       case 0:
        //           this.$refs.scroll.scrollTo(0,0);
        //           break;
        //       case 1:
        //           this.$refs.scroll.scrollTo(0,-this.$refs.param.$el.offsetTop,100);
        //           break;  
        //       case 2:
        //           this.$refs.scroll.scrollTo(0,-this.$refs.comment.$el.offsetTop,100);
        //           break; 
        //       case 3:
        //           this.$refs.scroll.scrollTo(0,-this.$refs.recommend.$el.offsetTop,100);
        //           break;
              
        //   }
        },
        //滚动内容显示对应的标题
        contentScroll(position){
            const positionY = -position.y;
            //[0, 5406, 5998, 6392,Number.MAX_VALUE]
            var len = this.themeTopYs.length;
            // for(var i=0;i<len;i++){
            //     if(this.currentIndex!==i&&((i<len-1&&positionY>=this.themeTopYs[i]&&positionY<this.themeTopYs[i+1])||(i===len-1&&positionY>=this.themeTopYs[i]))){
            //         this.currentIndex = i;
            //         //window.console.log(this.currentIndex);
            //         this.$refs.navbar.currentIndex = this.currentIndex;
            //     }
            // }
            for(var i=0;i<len-1;i++){
                if(this.currentIndex!==i&&(positionY>=this.themeTopYs[i]&&positionY<this.themeTopYs[i+1])){
                    this.currentIndex = i;
                    this.$refs.navbar.currentIndex = this.currentIndex;
                }
            }
            this.listenShowBackTop(position)
            

        },
        addToCart(){
            const product={};
            product.image = this.topImages[0];
            product.title = this.Goods.title;
            product.desc = this.Goods.desc;
            product.price = this.Goods.realPrice;
            product.iid = this.iid;
            //this.$store.commit('addToCart',product);
            //this.$store.dispatch('addCart',product)
             this.addCart(product).then(res=>{
            //     this.show=true;
            //     this.message=res;
            //     setTimeout(() => {
            //         this.show=false;
            //         this.message="";
            //     }, 2000);
            // })
            this.$toast.show(res)
        })
    }   

}
}
</script>

<style scoped>
.content{
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
    /* overflow: hidden; */
}
.top-nav{
    position: relative;
    top: 0;
    left: 0;
    right: 0;
    background-color: #fff;
    z-index: 11;
}
#detail{
    position: relative;
    z-index: 10;
    background-color: #fff;
    height: 100vh;
}
</style>