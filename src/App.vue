<template>
  <div id="app">
    <!-- 详情页面不保持状态 -->
    <keep-alive exclude="Detail">
      <router-view/>
    </keep-alive>
    
    <main-tab-bar/>
  </div>
</template>

<script>
import MainTabBar from 'components/content/mainTabbar/MainTabBar'

export default {
  components: { MainTabBar },
  name: 'app'
}
</script>
<style>
@import "assets/css/base.css";
</style>