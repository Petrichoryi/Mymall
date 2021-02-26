<template>
<div>
    <swiper>
        <swiper-item v-for="item in banners" :key="item.index">
        <a :href="item.link">
            <img :src='item.image' @load="imageLoad">
        </a>
        </swiper-item>
    </swiper>
</div>

</template>

<script>
import {Swiper,SwiperItem} from 'components/common/swiper/index.js'

export default {
     components: {Swiper,SwiperItem},

     props:{
         banners:{
            type:Array,
            default(){
            return []
            }
         }
     },
     data(){
         return{
            isLoad:false
         }
     },
     methods:{
         imageLoad(){
             //只需要向父组件发出一次事件通知
             if(!this.isLoad){
                 this.$emit('swiperImageLoad');
                 this.isLoad = true;
             }
             
         }
     }
}
</script>