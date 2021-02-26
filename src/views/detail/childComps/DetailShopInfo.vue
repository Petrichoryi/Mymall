<template>
    <div>
        <div class="logo-info">
            <div><img :src="'http:'+shop.logo"/></div>
            <div>{{shop.name}}</div>
        </div>
        <div class="other-info">
            <div class="left-info">
                <div class="sell-text">
                    <span>{{shop.sells}}</span><br>
                    <span>总销量</span>
                </div>
                <div class="goods-text">
                    <span>{{shop.goodsCount}}</span><br>
                    <span>全部宝贝</span>
                </div>
            </div>
            <div class="right-info">
                <table>
                    <tr v-for="(item,index) in shop.score" :key="index">
                        <td>{{item.name}}</td>
                        <td class="score" :class="{'score-better':item.isBetter}">{{item.score}}</td>
                        <td class="better" :class="{'better-score':item.isBetter}">
                            <span>{{item.isBetter?'高':'低'}}</span>
                        </td>
                    </tr>
                </table>
            </div>
        </div>
        <div class="bottom">
            <div class="shop-bottom">进店逛逛</div>
        </div>
        
        
    </div>
</template>
<script>
export default {
    props:{
        shop:{
            type:Object,
            default(){
                return {}
            }
        }
    }
}
</script>
<style scoped>
.logo-info{
    margin:25px 0;
    display: flex;
}
.logo-info div:nth-child(1){
    height: 60px;
    width: 60px;
    border-radius: 30px;
    border:1px solid #999;
    overflow: hidden;
    margin-left: 10px;
}
.logo-info div img{
    height: 100%;
    width: 100%;
}
.logo-info div:nth-child(2){
    height: 60px;
    line-height: 60px;
    margin-left: 13px;
    font-size: 18px;
}
.other-info{
    height: 70px;
    display: flex;
    font-size: 13px;
}
.other-info .left-info{
    display: flex;
}
.other-info .left-info div{
    
    margin-left:20px;
    height: 50px;
    text-align: center;

}
.other-info .left-info div:nth-child(2){
    padding-right: 34px;
    border-right:solid rgb(221, 219, 219) 1px;

}
.other-info .left-info .sell-text span:nth-child(1){
    color: red;
    line-height: 30px;
   
}
.other-info .left-info .goods-text span:nth-child(1){
    color: red;
    line-height: 30px;
}
.other-info .right-info{
    margin-top:-10px;
    padding-left: 20px;
}
.other-info .right-info table tr{
    line-height: 20px;
}
.other-info .right-info table tr td{
    padding-right: 7px;
}
.other-info .right-info table tr td:nth-child(3){
    padding-right: 0px !important;
}
.bottom .shop-bottom{
    height: 30px;
    background-color: rgb(228, 228, 228);
    line-height: 30px;
    text-align: center;
    width: 130px;
    border-radius: 10px;
    margin: 0 auto;
    font-size: 14px;
    margin-bottom: 25px;
}
.other-info .right-info table tr td span{
    text-align: center;
    display: inline-block;
}
.score-better{
    color: red !important;
}
.better-score{
    color: white;
    background-color: red !important;
}
.score{
    color: green;
}
.better{
    color: white;
    background-color:green
}
.bottom{
    margin-bottom: 20px;
    border-bottom: 4px solid #ededed;
}
</style>