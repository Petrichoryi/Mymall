<template>
  <div>
    <nav-bar class="p-navBar"><div slot="center">我的商城</div></nav-bar>
    <user-info></user-info>
    <account-info></account-info>
    <normal-list-view :list-data="orderList"/>
    <normal-list-view :list-data="serviceList"/>
  </div>
</template>

<script>
import NavBar from '@/components/common/navbar/NavBar'
import UserInfo from '@/views/profile/childComps/UserInfo'
import AccountInfo from '@/views/profile/childComps/AccountInfo'
import NormalListView from '@/views/profile/childComps/NormalListView'
 export default {
    name: "Profile",
    components:{
      NavBar,
      UserInfo,
      AccountInfo,
      NormalListView
    },
    data(){
        return{
            orderList:[
                {icon:'message.svg',info:'我的消息'},
                {icon:'pointer.svg',info:'积分商城'},
                {icon:'vip.svg',info:'会员卡'},
            ],
            serviceList:[
                {icon:'cart.svg',info:'我的购物车'},
                {icon:'shopping.svg',info:'下载购物App'}
            ]

        }
    }
  }
</script>

<style scoped>
.p-navBar{
  background-color: var(--color-tint);
  color:white;
  font-size:19px;
  border-bottom: 1px solid white;
}
</style>