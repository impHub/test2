<template>
    <div class="header">
        <!-- {{poiInfo.name}} -->
        <!-- 顶部 -->
    <div class="top-wrapper">
        <div class="back-wrapper">
            <span class="icon-arrow_lift"></span>
        </div>
        <!--  -->
      <div>
        <form class="search-wrapper">
            <span class="search-icon"></span>
            <input type="text" class="search-bar" placeholder="搜索店内商品">
        </form>
      </div>
      <!--  -->
      <div class="more-wrapper">
          <a href="#" class="spelling-bt">拼单</a>
          <div class="more-bt">
              <i class="s-radius"></i>
              <i class="s-radius"></i>
              <i class="s-radius"></i>
          </div>
      </div>
    </div>
   <!-- 中 -->
    <div class="content-wrapper">
        <div class="icon" :style="head_bg">

        </div>
        <div class="name">
            <h3>{{poiInfo.name}}</h3>
        </div>
        <div class="collect">
            <img src="./img/star.png" alt="">
            <span>收藏</span>
        </div>
    </div>


        <!-- 背景图片        5.通过v-bind绑定接收这个值传到style中          -->
<div class="bg-wrapper" :style="head_pic_url">
    <!-- <img :src="poiInfo.head_pic_url" /> -->
</div>
        <!-- 底部 -->
        <div class="bulletin-wrapper">
            <img v-if="poiInfo.discounts2" :src="poiInfo.discounts2[0].icon_url" class="icon">
            <span class="text" v-if="poiInfo.discounts2">{{poiInfo.discounts2[0].info}}</span>
            <div class="detail" v-if="poiInfo.discounts2" @click="showBulletin">
                {{poiInfo.discounts2.length}}个活动
                <span class="icon-leyboard_arrow_right"></span>
                <!-- <span v-if="poiInfo">{{poiInfo.msg}}哈哈</span> -->
            </div>
        </div>
        <!-- 公告详情弹窗 -->
        <transition name="bulletin-detail">
        <div class="bulletin-detail" v-show="isShow">
            <div class="detail-wrapper" :style="detail_bg">
                <div class="main-wrapper" :style="detail_bg">
                    <div class="icon" :style="head_bg"></div>
                    <h3 class="name">{{poiInfo.name}}</h3>  
                     <!-- 星级评价 -->
                     <div class="score">
                    <app-star :score="poiInfo.wm_poi_score"></app-star>
                    <span>{{poiInfo.wm_poi_score}}</span>
                     </div>

                      <p class="tip">
                          {{poiInfo.min_price_tip}}
                          <i>|</i>
                          {{poiInfo.shipping_fee_tip}}
                          <i>|</i>
                      </p>
                      <p class="time">
                          配送时间:{{poiInfo.shipping_time}}
                      </p>
                </div>
               
                <div class="close-wrapper">
                    <span class="icon-close" @click="colseBulletin"></span>
                </div>

            </div>
        </div>
        </transition>
    </div>
</template>
<script>
import Star from "../star/Star.vue";
export default {
  data() {
    return {
      isShow: false
    };
  },
  components: {
    "app-star": Star
  },
  props: {
    // 3.在header组件接收传过来的值
    poiInfo: {
      // type:Object,
      // default:{ }
    }
  },
  methods: {
    showBulletin() {
      this.isShow = true;
    },
    colseBulletin() {
      this.isShow = false;
    }
  },
  computed: {
    head_pic_url() {
      // alert('我执行了')
      // console.log(this.poiInfo.head_pic_url,888)
      //4.利用computed来监听这个值,每当当改变返回这个值
      // console.log(this.poiInfo,9090)
      return "background-image: url(" + this.poiInfo.head_pic_url + ")";
    },
    head_bg() {
      return "background-image: url(" + this.poiInfo.pic_url + ")";
    },
    detail_bg() {
      return "background-image: url(" + this.poiInfo.poi_back_url + ")";
    }
  }
};
</script>
<style scopes lang="less">
@import url(../../common/css/icon.css);
.header {
  // border: 1px solid;
  height: 128px;
  padding-top: 20px;
  .top-wrapper {
    // border: 2px solid;
    position: relative;
    .back-wrapper {
      // border: 1px solid;
      width: 50px;
      height: 31px;
      text-align: center;
      position: absolute;
      left: 0;
      top: 0;
      line-height: 31px;
      span {
        display: inline-block;
        color: white;
      }
    }
    .search-wrapper {
      // border: 2px solid;
      width: 100%;
      height: 31px;
      // background-color: pink;
      padding: 0 104px 0 50px;
      box-sizing: border-box;
      .search-icon {
        background: url("./img/search.png") no-repeat 11px center;
        //    border: 2px solid;
        width: 28px;
        height: 31px;
        background-size: 13px 13px;
        position: absolute;
      }
      .search-bar {
        border: 0;
        height: 31px;
        width: 100%;
        box-sizing: border-box;
        background-color: #cdcdcc;
        padding-left: 28px;
        outline: none;
        border-radius: 20px;
      }
    }
    .more-wrapper {
      width: 65px;
      height: 24px;
      // background-color: orange;
      position: absolute;
      right: 0;
      top: 0;
      padding: 7px 15px 0 24px;
      .spelling-bt {
        // border: 1px solid;
        width: 30px;
        height: 17px;
        color: white;
        line-height: 17px;
        text-align: center;
        display: inline-block;
        font-size: 10px;
        text-decoration: none;
      }
      .more-bt {
        // border: 1px solid;
        float: right;
        width: 20px;
        height: 24px;
        margin-left: 13px;
        margin-top: 6px;
        .s-radius {
          // border: 1px solid;
          width: 3px;
          height: 3px;
          border-radius: 50%;
          border: 1px solid white;
          display: block;
          float: left;
          margin-right: 1px;
        }
      }
    }
  }
  // 背景图片样式
  .bg-wrapper {
    width: 100%;
    height: 150px;
    position: absolute;
    left: 0;
    top: 0;
    z-index: -1;
    background-size: 100% 135%;
    background-position: center -12px;
  }
  .content-wrapper {
    // border: 1px solid white;
    padding: 17px 10px 11px;
    height: 50px;
    .icon {
      width: 50px;
      height: 50px;
      background-size: 135% 100%;
      background-position: center;
      border-radius: 5px;
      float: left;
      // display: inline-block;
    }
    .name {
      float: left;
      padding: 18px 0 0 12px;
      h3 {
        font-size: 16px;
        color: white;
      }
    }
    .collect {
      // border: 1px solid white;
      width: 25px;
      height: 37px;
      float: right;
      text-align: center;
      padding-top: 6px;
      img {
        height: 20px;
        width: 20px;
      }
      span {
        display: inline-block;
        margin-top: 7px;
        color: white;
        font-size: 11px;
      }
    }
  }
  .bulletin-wrapper {
    height: 16px;
    padding: 0 10px;
    .icon {
      width: 16px;
      height: 16px;
      float: left;
      margin-right: 6px;
    }
    .text {
      color: white;
      line-height: 16px;
      font-size: 11px;
      float: left;
    }
    .detail {
      color: white;
      float: right;
      font-size: 11px;
      line-height: 16px;
      span {
        font-size: 16px;
        line-height: 16px;
        float: right;
      }
    }
  }
}
/* 公告内容样式 */
.header .bulletin-wrapper {
  height: 16px;
  padding: 0 10px;
}

.header .bulletin-wrapper .icon {
  width: 16px;
  height: 16px;
  float: left;
  margin-right: 6px;
}

.header .bulletin-wrapper .text {
  font-size: 11px;
  color: white;
  float: left;
  line-height: 16px;
}

.header .bulletin-wrapper .detail {
  color: white;
  float: right;
  font-size: 11px;
  line-height: 16px;
}

.header .bulletin-wrapper .detail span {
  font-size: 16px;
  line-height: 16px;
  float: right;
}

/* 公告详情 样式 */
.header .bulletin-detail {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  background: rgba(98, 98, 98, 0.8);
  z-index: 999;
}

.header .bulletin-detail .detail-wrapper {
  width: 100%;
  height: 100%;
  padding: 43px 20px 125px;
  box-sizing: border-box;
}

.header .bulletin-detail .detail-wrapper .main-wrapper {
  width: 100%;
  height: 100%;
  background-size: 100% 100%;
  border-radius: 10px;
  text-align: center;
}

.header .bulletin-detail .detail-wrapper .main-wrapper .icon {
  width: 60px;
  height: 60px;
  background-size: 135% 100%;
  background-position: center;
  border-radius: 5px;
  display: inline-block;
  margin-top: 40px;
}

.header .bulletin-detail .detail-wrapper .main-wrapper .name {
  font-size: 15px;
  color: white;
  margin-top: 13px;
}

.header .bulletin-detail .detail-wrapper .main-wrapper .score {
  height: 10px;
  margin-top: 6px;
  text-align: center;
  font-size: 0;
}

.header .bulletin-detail .detail-wrapper .main-wrapper .score .star {
  display: inline-block;
  margin-right: 7px;
}

.header .bulletin-detail .detail-wrapper .main-wrapper .score span {
  display: inline-block;
  font-size: 10px;
  color: white;
}

.header .bulletin-detail .detail-wrapper .main-wrapper .tip {
  font-size: 11px;
  color: #bababc;
  margin-top: 8px;
}

.header .bulletin-detail .detail-wrapper .main-wrapper .tip i {
  margin: 0 7px;
}

.header .bulletin-detail .detail-wrapper .main-wrapper .time {
  font-size: 11px;
  color: #bababc;
  margin-top: 13px;
}

.header .bulletin-detail .detail-wrapper .main-wrapper .discounts {
  margin-top: 20px;
  padding: 0 20px;
}

.header .bulletin-detail .detail-wrapper .main-wrapper .discounts p {
  padding-top: 20px;
  border-top: 1px solid #bababc;
}

.header .bulletin-detail .detail-wrapper .main-wrapper .discounts img {
  width: 16px;
  height: 16px;
  vertical-align: middle;
}

.header .bulletin-detail .detail-wrapper .main-wrapper .discounts span {
  font-size: 11px;
  line-height: 16px;
  color: white;
}

.header .bulletin-detail .detail-wrapper .close-wrapper {
  padding-top: 20px;
  height: 40px;
  text-align: center;
}

.header .bulletin-detail .detail-wrapper .close-wrapper span {
  width: 40px;
  height: 40px;
  line-height: 40px;
  border-radius: 50%;
  font-size: 14px;
  color: white;
  display: inline-block;
  background: rgba(118, 118, 118, 0.7);
  border: 1px solid rgba(140, 140, 140, 0.9);
}

/* 动画效果 */
// 进入 时
.bulletin-detail-enter-active,
// 离开 时的过度动画
.bulletin-detail-leave-active {
  transition: 1s all;
}
//已经进入,之后已经离开
.bulletin-detail-enter,
.bulletin-detail-leave-to {
  opacity: 0;
}
//进入成功,已经离开
.bulletin-detail-enter-to,
.bulletin-detail-leave {
  opacity: 1;
}
</style>
