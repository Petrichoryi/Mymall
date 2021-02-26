<template>
    <div class="tab-bar-item" @click="itemClick">
        <div v-if='!isActive'>
            <slot name="item-icon"></slot>
        </div>
        <div v-else>
            <slot name="item-icon-active"></slot>
        </div>
        <div :style="activeStyle">
            <slot name='item-text'></slot>
        </div>
    </div>
</template>
<script>
export default {
    props:{
        path:String,
        activeColor:{
            type:String,
            default:'red'
        }
    },
    computed:{
        //tabbar颜色动态控制,判断当前活跃的路由是否等于path的值
        isActive(){
            return this.$route.path.indexOf(this.path)!=-1
        },
        //判断当前路由是否处于活跃，如果是则添加指定的颜色
        activeStyle(){
            return this.isActive?{color:this.activeColor}:{}
        }

    },
    methods:{   
        itemClick(){
            this.$router.push(this.path)
        }
    }
}
</script>
<style>
.tab-bar-item{
    flex: 1;
    height: 49px;
    width: 49px;
    text-align: center;
    font-size: 14px;
}
.tab-bar-item img{
    height: 24px;
    width: 24px;
    margin-top:3px;
    vertical-align: middle;
    margin-bottom: 2px;
}
.active{
    color:red
}
</style>