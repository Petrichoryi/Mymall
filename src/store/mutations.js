import {ADD_COUNTER,ADD_TO_CART} from './mutation-types'
export default{
    //mutations唯一的目的就是修改state中的状态
    //mutations中的每个方法尽可能完成单一的事件
    //已经存在的商品数目加1
    [ADD_COUNTER](state,payload){
        payload.count++;
    },
    //未存在的商品加入购物车
    [ADD_TO_CART](state,payload){
        //商品加入购物车添加默认不选中的属性
        payload.checked=false;
        state.cartList.push(payload);
    }
}