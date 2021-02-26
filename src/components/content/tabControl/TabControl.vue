<template>
    <div class="tabControl">
        <!-- 只是文字不同时不需要使用插槽 -->
        <div v-for="(item,index) in titles" :key="item.index" class="tabControl-item" :class="{active:currentIndex===index}"
        @click="itemclick(index)">
            <span>{{item}}</span>
        </div>
    </div>
</template>

<script>
export default {
    name:'TabControl',
    props:{
        titles:{
            type:Array,
            default(){
                return []
            }
        }
    },
    data(){
        return {
            currentIndex:0
        }
    },
    methods:{
        itemclick:function(index){
            this.currentIndex = index;
            //把index传递给父组件
            this.$emit('tabClick',index);
        }
    }
}
</script>
<style scoped>
.tabControl{
    display: flex;
    text-align: center;
    font-size:15px;
    line-height: 40px;
    height: 40px;
}
.tabControl-item{
    flex:1;
}
.tabControl-item span{
    padding:5px
}
.active span{
    border-bottom: 3px solid var(--color-tint);
}
.active{
    color:var(--color-high-text)
}
</style>