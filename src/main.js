// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
// import router from './router'
import VueRouter from 'vue-router'
import Goods from './components/goods/Goods'
import Seller from './components/seller/Seller'
import Ratings from './components/ratings/Ratings'
import axios from 'axios'


Vue.config.productionTip = false;
Vue.prototype.$axios = axios;
Vue.use(VueRouter)

const routes = [
  
  {path:'/',redirect:'/goods'},
  {name:'good',path:'/goods',component:Goods},
  {path:'/seller',component:Seller},
  {path:'/ratings',component:Ratings},
]

const router = new VueRouter({
    routes,
    mode:'history',
    //给选中的路由加上class名
    linkActiveClass:'active'
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
