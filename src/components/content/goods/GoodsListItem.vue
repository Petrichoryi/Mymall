<template>
    <div class="goods-item" @click="itemClick">
        <img v-lazy="showImage" @load="imgLoad">
        <div class="goods-info">
            <p>{{goodsitem.title}}</p>
            <span class="price">{{goodsitem.price}}</span>
            <span class="collect">{{goodsitem.cfav}}</span>
        </div>
        
    </div>
</template>
<script>
export default {
    name:'GoodsListItem',
    props:{
        goodsitem:{
            type:Object,
            default(){
                return {}
            }
        }
    },
    computed:{
        showImage(){
            return this.goodsitem.image|| this.goodsitem.show.img;
        }
    },
    methods:{
        imgLoad:function(){
            //问题：在详情页进行图片加载也会向Home.vue触发事件
            //解决方法1.判断路由发出不同的事件
            // if(this.$route.path.indexOf('/home')){
            //     //使用事件总线发布消息
            //     this.$bus.$emit('homeImgLoadEvent')
            // }else if(this.$route.path.indexOf('/detail')){
            //     this.$bus.$emit('detailImgLoadEvent')
            // }

            //解决方法2 mixin,在首页加载图片时触发了事件总线，离开时便取消该监听
            this.$bus.$emit('imgLoadEvent')

            
        },
        itemClick:function(){
            this.$router.push('/detail/'+this.goodsitem.iid)
            //使用query方式
            // this.$router.push({
            //     path:'/detail',
            //     query:{
            //         iid:this.goodsitem.iid
            //     }
            // })
        }
    }
}
</script>

<style scoped>
.goods-item{
    padding-bottom: 40px;
    position: relative;
    width: 45%;
}
.goods-item img{
    border-radius: 5px;
    width: 100%;
}
.goods-info{
    font-size:12px;
    position: absolute;/*子元素的绝对定位参照最近设置了相对定位的父元素 */
    left: 0;
    right: 0;
    bottom: 5px;
    /* overflow: hidden;使文字在一行进行显示，超出部分使用省略号表示 */
    text-align: center;

}
.goods-info p{
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 3px;
}
.goods-info .price{
    color:var(--color-high-text);
    margin-right: 20px;
}
.goods-info .collect{
    position: relative;
}
/* 使用伪元素添加收藏的符号 */
.goods-info .collect::before{
    content:'';
    position: absolute;/*相对于collect绝对定位*/
    top:-1px;
    left:-15px;
    width: 14px;
    height: 14px;
    background:url("~assets/img/common/collect.svg") 0 0/14px 14px;
}

</style>