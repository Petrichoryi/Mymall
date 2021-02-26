<template>
    <div class="bottom-bar">
        <div class="bottom-left">
            <!-- 把isChecked传入子组件 -->
            <check-box class="check" :isChecked="isSelectedAll" @click.native="checkClick"/>
            <span>全选</span>
        </div>
        <div class="countAll">合计:￥{{calPrice}}</div>
        <div class="calculate" @click="calcNone">去结算({{calLen}})</div>
    </div>

</template>
<script>
import checkBox from 'components/content/checkBox/checkBox.vue'
import {mapGetters} from 'vuex'
export default {
    components:{checkBox},
 
    computed:{
        ...mapGetters(['cartList']),
        calPrice:function(){
            var sum=0;
            for(let item of this.cartList){
                if(item.checked){
                    sum+=1*item.price*item.count;
                } 
            }
             sum = parseFloat(sum).toFixed(2);
            return sum;
        },
        calLen:function(){
            var l=0;
            for(let item of this.cartList){
                if(item.checked){
                l+=item.count;
                }
            }
            return l;
        },
        isSelectedAll(){
            for(let item of this.cartList){
                //有一个没选中则取消全选
                if(!item.checked){
                    return false;
                }
                
            }
            return true;
        }

        
    },
    methods:{
        checkClick(){
            //商品被全部选中
            if(this.isSelectedAll){
                this.cartList.forEach(item => item.checked=false);
            }
            //部分被选中或者全部没选中
            else{
                this.cartList.forEach(item=>item.checked=true)
            }
        },
        calcNone(){
            if(this.calLen==0){
                //未添加商品到购物车则弹出弹窗
                //window.console.log('ff');
                this.$toast.show("请选择商品！")
            }
        }
    }
    
}
</script>
<style scoped>
.bottom-bar{
    position: fixed;
    bottom: 49px;
    display: flex;
    align-items: center;
}
.bottom-left{
    display: flex;
    align-items: center;
    width:100px;
    height: 100%;
}
.check{
    margin-left: 10px;
    margin-right: 10px;
    height: 20px;
    width: 20px;
}
.calculate{
    width: 80px;
    height:100%;
    text-align: center;
    line-height: 40px;
    font-size: 14px;
    background-color: red;
    color: white;
   
}
.countAll{
    flex: 1;
}
</style>