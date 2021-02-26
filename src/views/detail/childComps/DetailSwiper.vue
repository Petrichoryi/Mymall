<template>
    <swiper class="myswiper">
        <swiper-item v-for="item in topImages" :key="item.index">
            <img :src="'http:'+item"/>
        </swiper-item>
    </swiper>

</template>
<script>
import {Swiper,SwiperItem} from 'components/common/swiper'
export default {
    name:'DetailSwiper',
    components:{Swiper,SwiperItem},
    props:{
        topImages:{
            type:Array,
            default(){
                return []
            }
        }
    }
}
</script>
<style scoped>
.myswiper{
    height: 300px;
}
</style>