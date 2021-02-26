
import {
    ADD_COUNTER,
    ADD_TO_CART
}from './mutation-types'
export default{
    addCart(context,payload){
        //action可以返回一个promise
        return new Promise((resolve,reject)=>{
            let oldProduct = null;
            //查找之前数组中是否有该商品
            // for(let item of state.cartList){
            //     if(item.iid===payload.iid){
            //         oldProduct=item;
            //     }
            // }
            oldProduct = context.state.cartList.find(item=>item.iid==payload.iid)
            //有该商品则数量加1，没有则加入购物车并且数量置为1
            if(oldProduct){
            context.commit(ADD_COUNTER,oldProduct);
            resolve("商品的数量加1");
            }else{
            payload.count=1;
            context.commit(ADD_TO_CART,payload);
            resolve("添加新的商品到购物车");
            }
        })
        
    }
}