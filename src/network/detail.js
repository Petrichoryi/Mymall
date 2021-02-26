import {request} from './request'
//封装详情页面的数据请求
export function getDetail(iid){
    return request({
        url:'/detail',
        params:{
            iid
        }
    })
}
//封装更多推荐的数据请求
export function getRecommend(){
    return request({
        url:'/recommend'
    })
}
//封装商品信息类
export class Goods{
    constructor(iteminfo,columns,services){
        this.title = iteminfo.title;
        this.desc = iteminfo.desc;
        this.newPrice = iteminfo.price;
        this.oldPrice = iteminfo.oldPrice;
        this.discount = iteminfo.discountDesc;
        this.columns = columns;
        this.services = services;
        this.realPrice = iteminfo.lowNowPrice;

    }
}
//封装店铺信息类
export class Shop{
    constructor(shopInfo){
        //存储店铺信息：店铺logo、店铺名称、粉丝数、销量、相关评分、宝贝数
        this.logo = shopInfo.shopLogo;
        this.name = shopInfo.name;
        this.fans = shopInfo.cFans;
        this.sells = shopInfo.cSells;
        this.score = shopInfo.score;
        this.goodsCount = shopInfo.cGoods;


    }
}
//封装商品参数类
export class GoodsParam{
    constructor(info,rule){
        //images可能某些商品有值，某些商品没有值
        this.image = info.images?info.images[0]:'';
        this.infos = info.set;
        this.sizes = rule.tables;
    }
}