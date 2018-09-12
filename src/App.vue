<template>
  <div id="app">
      <!-- 头部 -->
      <!-- 3.通过v-bind绑定当前poiInfo,以poiInfo关键字传到header组件中 -->
  <header-vue v-bind:poiInfo="poiInfo"></header-vue>
  <!-- 导航 -->
  <nav-vue :commentNum="commentNum"></nav-vue>
  <!-- 内容 -->
  <!-- <div class="content"> -->
    <!-- 避免切换路由重新渲染 -->
    <keep-alive>
    <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
import Header from "./components/header/Header.vue";
import Nav from "./components/nav/Nav.vue";
export default {
  name: "App",
  data() {
    return {
      // 2.传到poiInfo
      poiInfo: {},
      commentNum:0,
    };
  },
  created() {
    this.$axios.get("/api/goods").then(res => {
      // console.log(res)
      // 1,通过get获取到数据
      this.poiInfo = res.data.data.poi_info;
     
      // console.log(this.poiInfo);
    });
    //请求ratings
    this.$axios.get("/api/ratings").then(res => {
  
        this.commentNum = res.data.data.comment_num;
        console.log(this.commentNum,1212)
        
    });
  },
  components: {
    HeaderVue: Header,
    NavVue: Nav
  }
};
</script>

<style>
</style>
