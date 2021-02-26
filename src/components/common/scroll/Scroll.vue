<template>
    <div class="wrapper" ref="wrapper">
        <div>
            <slot></slot>
        </div>
    </div>
</template>
<script>
import BScroll from 'better-scroll'
export default {
    name:'Scroll',
    data(){
        return{
            scroll:null
        }
    },
    props:{
        probeType:{
            type:Number,
            default(){
                return 0
            }
        },
        //传入是否发生上拉事件
        pullUpLoad:{
            type:Boolean,
            default(){
                return false
            }
        }
    },
    mounted(){
        //创建BScroll对象
        this.scroll = new BScroll(this.$refs.wrapper,{
            pullUpLoad:this.pullUpLoad,
            click:true,
            probeType:this.probeType
        })
        //监听滚动的位置
        if (this.probeType===2||this.probeType===3){
            this.scroll.on('scroll',(position)=>{
            //把当前滚动的位置传给父组件
            this.$emit('scrolling',position);
        })
        }
        
        //监听上拉事件
        if(this.pullUpLoad){
            this.scroll.on('pullingUp',()=>{
            //window.console.log('haaaaa');
            this.$emit('pullingUp');
        })
        }
        
      
    },

    methods:{
        scrollTo(x,y,time=300){
        this.scroll&&this.scroll.scrollTo(x,y,time);
        },
        refresh(){
            //window.console.log('...');
            this.scroll&&this.scroll.refresh();
        },
        //完成上拉加载更多，可多次进行上拉加载
        finishPullUp(){
            this.scroll.finishPullUp();
        }
    }
    
}
</script>