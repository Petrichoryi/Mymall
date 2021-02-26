<template>
    <div v-if="Object.keys(Goods).length!==0">
        <div class="title">
            {{Goods.title}}
        </div>
        <div class="info-price">
            <span>{{Goods.newPrice}}</span>
            <span>{{Goods.oldPrice}}</span>
            <span>{{Goods.discount}}</span>
        </div>
        <div class="info-other">
            <div v-for="index in Goods.columns.length" :key="index" class="info-other-item">
                {{Goods.columns[index-1]}}
            </div>
        </div>
        <div class="info-service">
            <div v-for="item in Goods.services" :key="item.index" class="info-service-item">
                <img :src="'http:'+item.icon"/>
                <span>{{item.name}}</span>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props:{
        Goods:{
            type:Object,
            default(){
                return {}
            }
        }
    }
}
</script>
<style scoped>
.title{
    margin: 7px 0 9px;  
    font-weight: bold;
    font-size: 14px;
}
.info-price span:nth-child(1){
    color: var(--color-high-text);
    font-weight: bold;
    font-size: 20px;
    padding-right: 7px;;
}
.info-price span:nth-child(2){
    font-size: 13px;
    color: #999;
    text-decoration: line-through;
    padding-right: 7px;
}
.info-price span:nth-child(3){
    background-color: var(--color-high-text);
    color:white;
    border:1px red solid;
    border-radius: 50px;
    position: relative;
    top: -6px;
    font-size: 12px;
    padding: 2px;
}

.info-other{
    margin-top: 12px;
    display: flex;
    justify-content: space-between;
    font-size:10px ;
    color: var(--color-text);
    padding: 0 3px;
}
.info-service{
    margin-top: 7px;
    height: 60px;
    border-top:#ededed 1px solid;
    border-bottom:#ededed 4px solid;
    border-left: none;
    border-right:none;
    display: flex;
    font-size: 2px;
    justify-content: space-around;
    align-items: center;
    color: #333;
}
.info-service-item img{
    width: 12px;
    height: 12px;
    vertical-align: middle;
}
</style>