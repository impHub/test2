<template> 
    <div class="goods">
        <!-- !!!!!!!分类列表!!!!!!! -->
        <div class="menu-wrapper" ref="menuScroll">
            <ul>
                <!-- 专场 -->
                <li 
                class="menu-item" 
                :class="{'current':currentIndex === 0}" 
             @click="selectMenu(0)"
                 >
                    <p class="text">
                        <img  :src="container.tag_icon" v-if="container.tag_icon">
                        {{container.tag_name}}
                    </p>
                </li>
                <!--  -->
                <li class="menu-item" :class="{'current':currentIndex === index +1}"
                v-for="(item,index) in goods" :key="index"
                @click="selectMenu(index+1)"
                 >
                    <p class="text">
                        <img  :src="item.icon" v-if="item.icon">
                        {{item.name}}
                    </p>
                    <i class="num" v-show="calculateCount(item.spus)">
                        {{calculateCount(item.spus)}}
                    </i>
                </li>
            </ul>
        </div>
        <!-- ***********商品列表*********** -->
        <div class="foods-wrapper" ref="foodScroll">
            <ul>
                <!-- 专场 -->
                <li class="container-list food-list-hook">
                    <div v-for="(item,index) in container.operation_source_list" :key="index">
                        <img :src="item.pic_url">
                    </div>
                </li>
                <!-- 具体分类 -->
                <li class="food-list food-list-hook" v-for="(item,index) in goods" :key="index">
                    <h3 class="title">{{item.name}}</h3>
                    <!-- 具体商品列表 -->
                    <ul>
                        <li @click="showDetail(food)"
                        class="food-item" v-for="(food,index) in item.spus" :key="index">
                            <div class="icon" :style="head_bg(food.picture)"></div>
                            <div class="content">
                                <h3 class="name">{{food.name}}</h3>
                                <p v-if="food.description" class="desc">{{food.description}}</p>
                                <div class="extra">
                                    <span class="saled">
                                        {{food.month_saled_content}}
                                    </span>
                                    <span class="saled">
                                        {{food.praise_content}}
                                    </span>
                                </div>
                                <img class="product" :src="food.product_label_picture" alt="">
                                <p class="price">
                                    <span class="text">${{food.min_price}}</span>
                                    <span class="text">/{{food.unit}}</span>
                                </p>
                            </div>
                            <div class="cartcontrol-wrapper">
                               <app-cartcontrol :food="food"></app-cartcontrol>
                            </div>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
        <!-- 购物车 -->
        <app-shopcart :poiInfo="poiInfo" :selectFoods="selectFoods"></app-shopcart>
        <!-- 商品详情 -->
        <app-productdetail :food="selectFood" ref="foodView"></app-productdetail>
    </div>
</template>
<script>
import BScroll from 'better-scroll'
import Shopcart from '../shopcart/Shopcart'
import Cartcontrol from '../cartcontrol/Cartcontrol'
import ProductDetail from '../productDetail/ProductDetail'
export default {
    components:{
        'app-shopcart':Shopcart,
        'app-cartcontrol':Cartcontrol,
        'app-productdetail':ProductDetail
    },
  data() {
    return {
      container: {},
      goods: [],
      poiInfo:{},
      listHeight:[],
      menuScroll:{},
      foodScroll:{},
      scrollY:0,
      selectFood:{},
    };
  },
  methods:{
      head_bg(imgName){
          return "background-image: url(" + imgName + ")";
      },
      initScrooll(){
          //new之后就可以实现滚动了
        this.menuScroll = new BScroll(this.$refs.menuScroll,{
            click:true,
            probeType:3
        });
         this.foodScroll = new BScroll(this.$refs.foodScroll,{
             click:true,
             probeType:3
         })
        //   console.log('hahah')
        //监听滚动
        this.foodScroll.on('scroll',(pos) =>{
        //   console.log(pos.y)
        
          this.scrollY = Math.abs(Math.round(pos.y));
        //   console.log(this.scrollY)
        })
      },

      calculateHeight(){
          //获取元素
          let foodlist = this.$refs.foodScroll.getElementsByClassName('food-list-hook');
        //   console.log(foodlist.length,'9090');
        let height = 0;
        this.listHeight.push(height);
        for(let i = 0; i < foodlist.length; i++){
            let item = foodlist[i];
            height += item.clientHeight;
            this.listHeight.push(height)
            // console.log(item,foodlist.length)
        }
        
        // console.log(this.listHeight)
      },
       selectMenu(index){
            let foodlist = this.$refs.foodScroll.getElementsByClassName('food-list-hook');
            let element = foodlist[index];
            // console.log(element)
            // 滚动到对应元素位置           250毫秒
            this.foodScroll.scrollToElement(element,500)
       },
       calculateCount(spus){
           let count = 0;
           spus.forEach((food)=>{
               if(food.count >0){
                   count += food.count
               }
           })
        //    console.log(spus,999)
           return count
       },
    //   具体商品点击事件
       showDetail(food){
        //    console.log('showDetail')
           this.selectFood = food;
           //通过在字组件上绑定的red="foodView"找到子组件上的
            //showView方法从而去触发   
           this.$refs.foodView.showView();
       }
  },
  //计算属性不能接受参数
  computed:{
   currentIndex(){
       for(let i = 0; i <this.listHeight.length; i++){
        //    console.log(this.listHeight.length)
        // console.log(1)
           //获取商品区间的范围
           let height1 = this.listHeight[i];
           let height2 = this.listHeight[i+1];
           //是否在上述区间中
        //    console.log(height1,height2)
            if(!height2 || (this.scrollY >= height1 && this.scrollY < height2)){
                // console.log(i)
                    // console.log(height1,height2)
                return i;
            }
              
            
       }
         return 0;
   },
   selectFoods(){
    //    alert('hewq')
       let foods = []
       this.goods.forEach((myfoods)=>{
        //    console.log(myfoods.spus,9090)
           myfoods.spus.forEach((food)=>{
            //    console.log(food.count,9090)
               if(food.count>0){
                   foods.push(food)
               }
           })
       })
    //    console.log(foods,9090)
       return foods;
   }
  },
  created() {
    this.$axios.get("/api/goods").then(res => {
    //   console.log(res.data.data.food_spu_tags);
      this.container = res.data.data.container_operation_source;
      this.goods = res.data.data.food_spu_tags;
      this.poiInfo = res.data.data.poi_info;
      console.log(this.poiInfo)
    //DOM已经更新再执行的方法
    this.$nextTick(()=>{
            //执行滚动方法
      this.initScrooll();
      //计算分类的区间高度
      this.calculateHeight();
      //监听滚动的位置
      //根据滚动位置确认下标
      //通过下标实现点击左侧,滚动右侧
    })
    });
  }
};
</script>
<style scoped lang= 'less'>
@import url(../../common/css/icon.css);
.goods {
    /* display: flex;
  position: absolute;
  top: 190px;
  bottom: 51px;
  overflow: hidden;
  width: 100%; */
    /* height: 100%; */
    /* border: 10px solid; */
  display: flex;
  position: absolute;
  top: 190px;
  /* bottom: 0; */
  bottom: 51px;
  overflow: hidden;
  width: 100%;
  .menu-wrapper {
    flex: 0 0 85px;
    background-color: #f4f4f4;
    .menu-item{
        position: relative;
        /* background-color: red; */
        /* flex: 1; */
          padding: 16px 23px 15px 10px;
          border-bottom: 1px solid #e4e4e4;
          .text{
              font-size: 13px;
              line-height: 17px;
              color: #333;
              vertical-align: middle;
              -webkit-line-clamp:2;
              display: -webkit-box;
              -webkit-box-orient: vertical;
              overflow: hidden;
              img{
                  width: 15px;
                  height:15px;
                  vertical-align: middle;
              }
          }
      }
  }
  .foods-wrapper {
    flex: 1;
    /* background-color: peru; */
    .container-list{
        padding: 11px 11px 0 11px;
        border-bottom: 1px solid #e4e4e4;
        img{
            width: 100%;
            margin-bottom: 11px;
            border-radius: 5px;
        }
    }
  }
  
}
/* 具体分类商品布局 */ 
.goods .foods-wrapper .food-list{
	padding: 11px;
}



.goods .foods-wrapper .food-list .title{
	height: 13px;
	font-size: 13px;
	background: url(./img/btn_yellow_highlighted@2x.png) no-repeat left center;
	background-size: 2px 10px;
	padding-left: 7px;
	margin-bottom: 12px;
}




.goods .foods-wrapper .food-list .food-item{
	display: flex;
	margin-bottom: 25px;
  position: relative;
  .cartcontrol-wrapper{
      position: absolute;
      right: 0;
      bottom: 0;
  }
}

.goods .foods-wrapper .food-list .food-item  .icon{
	flex: 0 0 63px;
	background-position: center;
	background-size: 120% 100%;background-repeat: no-repeat;
	margin-right: 11px;
	height: 75px;
}
.goods .foods-wrapper .food-list .food-item .content{
	flex: 1;
}

/* 具体内容样式 */ 
.goods .foods-wrapper .food-list .food-item .content .name{
	font-size: 16px;
	line-height: 21px;
	color: #333333;
	margin-bottom: 10px;
	padding-right: 27px;
}

.goods .foods-wrapper .food-list .food-item .content .desc{
	font-size: 10px;
	line-height: 19px;
	color: #bfbfbf;
	margin-bottom: 8px;
	
	/* 超出部分显示省略号*/
	-webkit-line-clamp: 1;
	display: -webkit-box;
	-webkit-box-orient: vertical;
	overflow: hidden;
}

.goods .foods-wrapper .food-list .food-item .content .extra{
	font-size: 10px;
	color: #BFBFBF;
	margin-bottom: 7px;
}
.goods .foods-wrapper .food-list .food-item .content .extra .saled{
	margin-right: 14px;
}
.goods .foods-wrapper .food-list .food-item .content .product{
	height: 15px;
	margin-bottom: 6px;
}
.goods .foods-wrapper .food-list .food-item .content .price{
	font-size: 0;
}
.goods .foods-wrapper .food-list .food-item .content .price .text{
	font-size: 14px;
	color: #fb4e44;
}
.goods .foods-wrapper .food-list .food-item .content .price .unit{
	font-size: 12px;
	color: #BFBFBF;
}
/*当前选中*/
.goods .menu-wrapper .menu-item.current{
    background-color:white;
    font-weight:bold;
    margin-top:-1px;
}
.goods .menu-wrapper .menu-item:first-child.current{
    margin-top:1px;
}
.goods .menu-wrapper .menu-item .num{
	position: absolute;
	right: 5px;
	top: 5px;
	width: 13px;
	height: 13px;
	border-radius: 50%;
	color: white;
	background: red;
	text-align: center;
	font-size: 7px;
	line-height: 13px;
}
</style>