<template>
    <div class="toast" v-show="isShow">
        {{message}}
    </div>
</template>

<script>
export default {
    // props:{
    //     show:{
    //         type:Boolean,
    //         default(){
    //             return true
    //         }
    //     },
    //     msg:{
    //         type:String,
    //         default(){
    //             return ''
    //         }
    //     }
    // }
    data(){
        return{
            isShow:false,
            message:""
        }
    },
    methods:{
        show(message,duration=2000){
            this.message=message;
            this.isShow=true;
            setTimeout(() => {
                this.message="";
                this.isShow=false;
            }, duration);

        }
    }
}
</script>
<style scoped>
.toast{
    position: fixed;
    top: 50%;
    left: 50%;
    color: #fff;
    transform: translate(-50%,-50%);
    padding: 8px 10px;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 99
}
</style>