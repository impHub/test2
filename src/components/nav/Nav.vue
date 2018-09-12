<template>
    <div class="nav">
      
      <router-link :to='{name:"good"}' class="nav-item">
            点餐
       <i class="line"></i>
          </router-link>
        <router-link to='/ratings' class="nav-item" >
        评价({{commentNum}})
    <i class="line"></i>
        </router-link>
        <router-link to='/seller' class="nav-item">
        商家
         <i class="line"></i>
        </router-link>
    </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  props:{
    commentNum:{
      type:Number,
      //默认为0,当穿过来是undf时走默认值
      default:0
    }
  }
  
};
</script>
<style lang="less">
.nav {
  display: flex;
  width: 100%;
  height: 40px;
  line-height: 40px;
  border-bottom: 1px solid #e4e4e4;
  .nav-item {
    position: relative;
    flex: 1;
    text-align: center;
    text-decoration: none;
    color: #666;
  }
  // 选中的样式
  .active {
    color: #ffbb22;
    .line {
      width: 20px;
      height: 2px;
      display: inline-block;
      background-color: #fb2;
      position: absolute;
      left: 50%;
      bottom: 0;
      margin-left: -10px;
    }
  }
}
</style>