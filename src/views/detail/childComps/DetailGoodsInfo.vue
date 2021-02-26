<template>
    <div v-if="Object.keys(detailInfo).length!==0">
        <div class="info-text-wrap">
            <div class="text-top-style"></div>
            <div class="desc info-text-desc">{{detailInfo.desc}}</div>
            <div class="text-bot-style"></div>
        </div>
        <div class="img-list-wrap" v-for="item in detailInfo.detailImage" :key="item.index">
			<div class="desc">{{item.key}}</div>
			<div v-for="(item, index) in item.list" :key="index">
				<img :src="'http:'+item" alt="" class="img" @load="imgLoad">
			</div>
		</div>
    </div>
</template>
<script>
export default {
    props:{
        detailInfo:{
            type:Object,
            default(){
                return {}
            }
        }    
    },
    data(){
            return{
                counter:0,
                imgLength:0
            }
    },
    methods:{
        imgLoad(){
            //图片全部加载完再进行Betterscroll高度的刷新
            // if(++this.counter===this.imgLength){
            //     this.$emit('imgLoad');
            // }

            //每加载一次向父组件触发事件，父组件利用防抖函数进行刷新
            this.$emit('imgLoad');
        } 
    },
    watch:{
        detailInfo(){
            this.imgLength = this.detailInfo.detailImage[0].list.length
        }
    }
}
</script>
<style scoped>
.info-text-wrap{
    position: relative;
}
.text-top-style{
    width: 60px;
    height: 1px;
    background-color: #333;
    margin-left: 4px;
}
.text-top-style::before{
    position: absolute;
    left: 4px;
    top: -2.5px;
    display: block;
    content: '';
    width: 5px;
    height: 5px;
    background-color: #333;
}
.text-bot-style {
    width: 60px;
    height: 1px;
    background-color: #333;
    position: absolute;
    right: 4px;
    bottom: 0;
    }
.text-bot-style::after{
    position: absolute;
    right: 0;
    top: -2.5px;
    display: block;
    content: '';
    width: 5px;
    height: 5px;
    background-color: #333;
}
.desc {
    font-size: 14px;
    padding-bottom: 6px;
    line-height: 20px;
    margin: 4px 0;
    text-indent: 10px;
}
.img {
    width: 100%;
}
</style>