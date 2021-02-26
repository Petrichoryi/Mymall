<template>
  <div class="category">
    <nav-bar class="c-navBar">
      <div slot="center">商品分类</div>
    </nav-bar>
    <scroll class="content">

        
    </scroll>
    <category-content :sideNavList="sideNavList"
                     :cateContentList="cateContentList"
                     @itemChange="changeEvent"
                     />
                  
  </div>
</template>

<script>
import NavBar from '@/components/common/navbar/NavBar'
import CategoryContent from './childComps/CategoryContent.vue'
import { getCategory, getSubCategory } from 'network/category.js'
import Scroll from 'components/common/scroll/Scroll.vue'


  export default {
    name: "Category",
    components:{
      NavBar,CategoryContent,Scroll,
        
    },
    data(){
        return{
            sideNavList:[],
            cateContentList:[],
            maitKey:3627
        }
    },
    created(){
        getCategory().then(res=>{
            //window.console.log(res)
            this.sideNavList = res.data.data.category.list
        }),
        getSubCategory(this.maitKey).then(res=>{
            //window.console.log(res)
            this.cateContentList = res.data.data.list
        })
    },
    methods:{
        changeEvent(item){
            this.maitKey = item.maitKey;
            //点击不同的标题获取不同的maitKey值，更新对应的商品
            getSubCategory(this.maitKey).then(res=>{
            //window.console.log(res)
            this.cateContentList = res.data.data.list
        })
        }
    }
  }
</script>

<style scoped>
.c-navBar{
  background-color:var(--color-tint);
  color: white;
  font-size: 16px;
}
.content{
    position: absolute;
    top: 44px;
    bottom: 49px;
   
    left: 0;
    right: 0;
    overflow: hidden;
}
</style>