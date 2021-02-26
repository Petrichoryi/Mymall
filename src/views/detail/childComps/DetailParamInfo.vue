<template>
    <div v-if="Object.keys(paramInfo).length!==0" class="params-wrap">
    <div v-for="(item, index) in paramInfo.sizes" :key="'div1'+index">
        <div v-for="(list, index) in item" class="flex" :key="'div2'+index">
            <div v-for="(listitem, index) in list" class="rule-list-item" :key="'div3'+index">
                {{listitem}}
            </div>
        </div>
    </div>
    <div v-for="(info, index) in paramInfo.infos" :key="index" class="info-list-wrap">
        <div class="info-list-tit">{{info.key}}</div>
        <div>{{info.value}}</div>
    </div>

    <div class="info-img" v-if="paramInfo.image.length!==0">
        <img :src="pramInfo.image" alt=""/>

    </div>
    </div>
</template>
<script>
export default {
    props:{
        paramInfo:{
            type:Object,
            default(){
                return {}
            }
        }
    }
}
</script>
<style scoped>
.flex{
    display: flex;
}
.params-wrap {
    border-top: 4px solid #ececec;
    border-bottom: 4px solid #ececec;
}
.rule-list-item {
    font-size: 12px;
    width: 20%;
    border-bottom: 1px solid #ececec;
    padding: 10px 4px;
}
.info-list-wrap {
    font-size: 14px;;
    border-bottom: 1px solid #ececec;
    padding: 10px 4px;
    line-height: 20px;
    display: flex;
    
}
.info-list-wrap div:nth-child(2){
    color: var(--color-high-text);
}
.info-list-tit {
        width: 18%;
    }
.info-img{
    width: 100%;
}
</style>