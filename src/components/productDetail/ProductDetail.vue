<template>
    <transition name="food-detail">
        <div class="food" v-show="showFlag" ref="foodView">
            <div class="food-wrapper">
                <!--  -->
                <div class="food-content">
                    <div class="img-wrapper">
                        <img class="food-img" alt="" :src="food.picture">
                        <span @click="closeView"
                        class="close-bt icon-close"></span>
                        <img class="share-bt" src="./img/share.png" alt="">
                        <img class="more-bt" src="./img/more.png" alt="">
                    </div>
                    <!--  -->
                     <div class="content-wrapper">
                    <h3 class="name">{{food.name}}</h3>
                    <p class="saled">{{food.month_saled_content}}</p>
                    <img class="product" v-show="food.product_label_picture" :src="food.product_label_picture" alt="">
                    <p class="price">
                        <span class="text">${{food.min_price}}</span>
                        <span class="unit">/{{food.unit}}</span>
                    </p>
                    <!-- 选规格s -->
                    <div class="cartcontrol-wrapper">
                         <app-cartcontrol :food="food"></app-cartcontrol>
                    </div>
                    <div @click="addproduct(food)"
                     class="buy" v-show="!food.count || food.count == 0">
                        选规格
                    </div>
                </div>
                </div>
                <!--  -->
               <app-split></app-split>
               <!-- 外卖评价 -->
               <div class="rating-wrapper">
                 <!-- 评价头部 -->
                 <div class="rating-title">
                   <div class="like-ratio">
                      <span class="title" v-if="food.rating">{{food.rating.title}}</span>
                      <span class="retio" v-if="food.rating">
                        (
                           
                          {{food.rating.like_ratio_desc}}
                          <!-- {{food.rating.like_ratio}} -->
                          <!-- <i>{{food.rating.like_ratio}}</i> -->
                        )
                      </span>
                   </div>
                   <div class="snd-title" v-if="food.rating">
                     <span class="text">{{food.rating.snd_title}}</span>
                     <span class="icon icon-keyboard_arrow_right"></span>
                   </div>
                 </div>
                 <!-- 用户评论信息-->
                 <ul class="rating-content" v-if="food.rating">
                   <li class="comment-item"
                   v-for="(comment,index) in food.rating.comment_list" :key="index">
                          <div class="comment-header">
                              <img :src="comment.user_icon" v-if="comment.user_icon">
                              <!-- 没有就显示下面的图片 -->
                              <img src="./img/anonymity.png" v-if="!comment.user_icon">
                          </div>
                          <div class="comment-main">
                              <div class="user">
                                  {{comment.user_name}}
                              </div>
                              <div class="time">
                                  {{comment.user_time}}
                              </div>
                              <div class="content">
                                  {{comment.comment_content}}
                              </div>
                          </div>
                   </li>
                 </ul>
               </div>
            </div>
        </div>
    </transition>
</template>
<script>
import Vue from 'vue'
//滚动组件内容超过就实现滚动
import BScroll from 'better-scroll'
import Cartcontrol from "../cartcontrol/Cartcontrol";
import Split from "../split/Split"
export default {
  data() {
    return {
      showFlag: false
    };
  },
  props: {
    food: {
      type: Object
    }
  },
  components: {
    "app-cartcontrol": Cartcontrol,
    "app-split":Split
  },
  methods: {
    //在父组件上触发这个方法
    showView() {
      //true之后显示这个组件
      this.showFlag = true;
      // 初始化
      this.$nextTick(()=>{
        if(!this.scroll){
          this.scroll = new BScroll(this.$refs.foodView,{
            click:true
          })
        }else{
          this.scroll.refresh()
        }
      })
    },
    closeView() {
      this.showFlag = false;
    },
    addproduct(){
        // console.log(food.count,'haha')
        //可以手动修改添加count的值可以
        //但是在上面v-show不会生效
        // this.food.count = 1;
        //通过引入vue,使用vue.set方法修改都能生效
        Vue.set(this.food,"count",1)
             console.log(this.food.count)
    }
  }
};
</script>
<style>
.food {
  position: fixed;
  left: 0;
  top: 0;
  bottom: 51px;
  background-color: white;
  width: 100%;
  z-index: 90;
}
/*动画*/
.food-detail-enter-active,
.food-detail-leave-active {
  transition: 1s;
}
.food-detail-enter,
.food-detail-leave-to {
  transform: translateX(100%);
}
.food .food-wrapper .food-content {
}
/*预留图片位置*/
.food .food-wrapper .food-content .img-wrapper {
  position: relative;
  width: 100%;
  height: 0;
  padding-top: 100%;
}
.food .food-wrapper .food-content .img-wrapper .food-img {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
}
.food .food-wrapper .food-content .img-wrapper .food-img {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
}
.food .food-wrapper .food-content .img-wrapper .close-bt {
  width: 30px;
  height: 30px;
  position: absolute;
  left: 10px;
  top: 10px;
  text-align: center;
  font-size: 30px;
  color: white;
  background: #7f7f7f;
  border-radius: 50%;
}
.food .food-wrapper .food-content .img-wrapper .share-bt,
.food .food-wrapper .food-content .img-wrapper .more-bt {
  width: 30px;
  height: 30px;
  position: absolute;
  top: 10px;
}
.food .food-wrapper .food-content .img-wrapper .share-bt {
  right: 50px;
}
.food .food-wrapper .food-content .img-wrapper .more-bt {
  right: 10px;
}

.food .food-wrapper .food-content .content-wrapper {
  padding: 0 0 16px 16px;
  position: relative;
}
.food .food-wrapper .food-content .content-wrapper .name {
  font-size: 15px;
  color: #333333;
  line-height: 30px;
  font-weight: bold;
}
.food .food-wrapper .food-content .content-wrapper .saled {
  font-size: 11px;
  color: #9d9d9d;
  margin-bottom: 6px;
}
.food .food-wrapper .food-content .content-wrapper .product {
  height: 15px;
  margin-bottom: 16px;
}
.food .food-wrapper .food-content .content-wrapper .price {
  font-size: 0;
}
.food .food-wrapper .food-content .content-wrapper .price .text {
  font-size: 17px;
  color: #fb4e44;
}
.food .food-wrapper .food-content .content-wrapper .price .unit {
  font-size: 11px;
  color: #9d9d9d;
}
.food .food-wrapper .food-content .cartcontrol-wrapper {
  position: absolute;
  right: 12px;
  bottom: 10px;
  padding: 2px;
}
.food .food-wrapper .food-content .buy {
  width: 64px;
  height: 30px;
  font-size: 12px;
  line-height: 30px;
  text-align: center;
  background: #ffd161;
  border-radius: 30px;
  position: absolute;
  right: 12px;
  bottom: 10px;
}


.food .food-wrapper .rating-wrapper {
  padding-left: 16px;
}
.food .food-wrapper .rating-wrapper .rating-title {
  padding: 16px 16px 16px 0;
}
.food .food-wrapper .rating-wrapper .rating-title .like-ratio {
  float: left;
  font-size: 0;
}
.food .food-wrapper .rating-wrapper .rating-title .like-ratio .title {
  font-size: 13px;
}
.food .food-wrapper .rating-wrapper .rating-title .like-ratio .ratio {
  font-size: 11px;
}
.food .food-wrapper .rating-wrapper .rating-title .like-ratio .ratio i {
  color: #fb4e44;
  font-size: 11px;
}

.food .food-wrapper .rating-wrapper .rating-title .snd-title {
  float: right;
  font-size: 0;
}
.food .food-wrapper .rating-wrapper .rating-title .snd-title .text,
.food .food-wrapper .rating-wrapper .rating-title .snd-title .icon {
  font-size: 13px;
  color: #9d9d9d;
  display: inline-block;
}
.food .food-wrapper .rating-wrapper .rating-title .snd-title .icon {
  margin-left: 12px;
}

.food .food-wrapper .rating-wrapper .comment-item {
  padding: 15px 14px 17px 0;
  border-bottom: 1px solid #f4f4f4;
  width: 100%;
  box-sizing: border-box;
  display: flex;
}
.food .food-wrapper .rating-wrapper .comment-item .comment-header {
  flex: 0 0 41px;
  margin-right: 10px;
}
.food .food-wrapper .rating-wrapper .comment-item .comment-header img {
  width: 41px;
  height: 41px;
  border-radius: 50%;
}

.food .food-wrapper .rating-wrapper .comment-item .comment-main {
  flex: 1;
  margin-top: 6px;
}
.food .food-wrapper .rating-wrapper .comment-item .comment-main .user {
  width: 50%;
  float: left;
  font-size: 12px;
  color: #333333;
}
.food .food-wrapper .rating-wrapper .comment-item .comment-main .time {
  width: 50%;
  float: right;
  text-align: right;
  font-size: 10px;
  color: #666666;
}
.food .food-wrapper .rating-wrapper .comment-item .comment-main .content {
  margin-top: 17px;
  font-size: 13px;
  line-height: 19px;
}
</style>
