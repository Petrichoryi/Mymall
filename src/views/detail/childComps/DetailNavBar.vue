<template>
    <div>
        <nav-bar>
            <div slot="left" class="back">
                <img src="~assets/img/common/back.svg" @click="backClick"/>
            </div>
            <div slot="center" class="title">
                <div v-for="(item,index) in titles" :key="index" 
                class="title-item" :class="{active:currentIndex===index}" @click="titleClick(index)">
                    {{item}}
                </div>
            </div>
        </nav-bar>
    </div>
</template>
<script>
import NavBar from 'components/common/navbar/NavBar'
export default {
  components: { NavBar },
  data(){
      return{
          titles:['商品','参数','评论','推荐'],
          currentIndex:0
      }
  },
  methods:{
      //返回上一页
      backClick(){
          this.$router.back();
      },
      //点击的标题应用样式
      titleClick(index){
          //window.console.log(index);
          this.currentIndex = index;
          this.$emit('titleClick',index);
      }
  }
}
</script>
<style scoped>
.title{
    display: flex;
    font-size: 13px;
}
.title-item{
    flex:1;
}
.back{
    margin-top:6px
}
.active{
    color:var(--color-high-text);
}
</style>