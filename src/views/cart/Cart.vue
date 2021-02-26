<template>
<div class="cart">
    <!-- 1.导航 -->
    <nav-bar class="nav-bar">
        <div slot="center">购物车({{cartLength}})</div>
    </nav-bar>
    <!-- 2.购物车列表 -->
    <scroll class="content" ref="scroll">
        <cart-list/>
    </scroll>
    
    <!-- 3.底部汇总 -->
    <cart-bottom-bar class="bottom"/>
</div>

</template>
<script>
import NavBar from 'components/common/navbar/NavBar.vue'
import cartList from './childComs/cartList.vue'
import Scroll from 'components/common/scroll/Scroll.vue'
import cartBottomBar from './childComs/cartBottomBar'

import {mapGetters} from 'vuex'
import CartBottomBar from './childComs/cartBottomBar.vue'
    
export default {
    components:{NavBar,cartList,Scroll,cartBottomBar, CartBottomBar},
    computed:{
        //将store中的getters映射到局部计算属性
        ...mapGetters(['cartLength'])
    },
    activated(){
        this.$refs.scroll.refresh()
    }
}
</script>
<style scoped>
.nav-bar{
    background-color: var(--color-tint);
    color: white;
    font-weight: 700;
}
.content{
    position: absolute;
    top: 44px;
    bottom: 89px;
    left: 0;
    right: 0;
    overflow: hidden;
}
.cart{
    height: 100vh;
    position: relative
}
.bottom{
    height: 40px;
    width: 100%;
    background-color:rgb(233, 233, 233);

}
</style>