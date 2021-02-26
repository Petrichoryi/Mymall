<template>
<div>
    <cart-list-item v-for="(item,index) in cartList" :key="index" :itemInfo="item" />
    
</div>
    
</template>
<script>
import cartListItem from './cartListItem'
import {mapGetters} from 'vuex'
export default {
    name:"cartList",
    components:{cartListItem},
    computed: {
        //将store中的getters映射到局部计算属性
        ...mapGetters(['cartList'])
    }
}
</script>