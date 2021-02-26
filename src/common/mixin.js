import {debounce} from './utils.js'
import BackTop from 'components/content/backTop/BackTop'

export const itemImgListenerMixin = {
    data(){
        return{
            itemImgListener:null,
            newRefresh:null
        }
    },
    mounted(){
        //1.图片加载完成的事件监听
        this.newRefresh = debounce(this.$refs.scroll.refresh,100);
        //对监听的事件进行保存
        this.itemImgListener = ()=>{ 
            this.newRefresh();
        }
        this.$bus.$on("imgLoadEvent",this.itemImgListener)
        //window.console.log('kkk')
        }
        
}

export const backTopMixin={
    components:{
        BackTop
    },
    data(){
        return{
            isShowBackTop:false
        }
    },
    methods:{
        backClick(){
            this.$refs.scroll.scrollTo(0,0,500);
        },
        listenShowBackTop(position){
            //1.滚动位置超过1000px时，显示返回顶部按钮
            this.isShowBackTop = -position.y>1000;
        }
    }
}