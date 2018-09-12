<template>
    <div class="cartcontrol">
       <transition name="move">
            <div @click.stop.prevent="decreaseCart" v-show="food.count"
        class="cart-decrease icon-remove_circle_outline">
        </div>
        
       </transition>
       <div class="cart-count" v-show="food.count">{{food.count}}</div>
       <!--     阻止从父级点击事件传过来的冒泡 -->
        <div @click.stop.prevent="increaseCart"
        class="cart-add icon-add_circle">
            <i class="bg"></i>
        </div>
    </div>
</template>
<script>
import Vue from 'vue'
export default {
    data(){
        return {}
    },
    props:{
        food:{
            type:Object
        }
    },
    methods:{
        decreaseCart(){
          if(this.food.count >=1){
               this.food.count--
          }
           
            // console.log(this.food.count)
        },
        increaseCart(){
            if(!this.food.count){
                Vue.set(this.food,"count",1)
            }else{
                this.food.count++
            }
            // console.log(this.food.count)
        }
    }
}
</script>
<style lang='less'>
@import url(../../common/css/icon.css);
    .cartcontrol{
        font-size: 0;
        // border: 1px solid;
        .cart-decrease{
            display: inline-block;
            width: 26px;
            height: 26px;
            font-size: 26px;
            color: #b4b4b4;
            
        }
        .cart-count{
            display: inline-block;
            width: 25px;
            text-align: center;
            font-size: 12px;
            line-height: 26px;
            vertical-align: top;
        }
        .cart-add{
            display: inline-block;
            width:26px;
            height: 26px;
            color:#ffd161;
            font-size: 26px;
            position: relative;
            .bg{
                width: 20px;
                height: 20px;
                border-radius: 50%;
                background-color: black;
                position: absolute;
                left: 3px;
                top: 3px;
                z-index: -1;
            }
        }
    }
    .move-leave-active
    // 加号动画卡顿
    // .move-enter-active
    {
        transition: all 0.5s linear;
    }
    .move-enter-active,.move-leave-active{
        transform: translateX(20px) rotate(180deg);
    }
</style>
