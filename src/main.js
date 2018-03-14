// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import axios from 'axios'
//import router from './router'
import ElementUI from 'element-ui'
import '../theme/green/element/index.css' //绿色主题,header和login的背景需要同时去修改颜色
// import 'element-ui/lib/theme-chalk/index.css'    //默认主题

import 'font-awesome/css/font-awesome.min.css'
import qs from 'qs'
import store from './store'
import routes from './router/index'
import { makeRoute } from './router'


Vue.use(ElementUI)
Vue.use(VueRouter)

Vue.prototype.$axios = axios;
Vue.prototype.$qs = qs;

Vue.config.productionTip = false;

const router = new VueRouter({
  routes
})
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';



router.beforeEach((to, from, next) => {
  
    //如果目标路由为登陆时,恢复用户原始状态
    if (to.path === '/login') {
      store.commit('logOut');
    }
    let allRoutes = store.getters.allRoutes;
    let loginStatus = store.getters.loginStatus;
  
    //登录成功时加载路由及模块
    if ((from.path === '/login' || from.path === '/loginByWx') && allRoutes !== '' && loginStatus) {
      console.log(store.getters.allRoutes);
      var routesObj = makeRoute(store.getters.allRoutes);
      router.addRoutes(routesObj);
    }
    //没有登录时自动跳转,开发环境免登陆时注释
    if ( (to.path !== '/login' && to.path !== '/loginByWx') && (allRoutes === '' || !loginStatus)) {
      // next({ path: '/loginByWx' })
      next({ path: '/login' })
    }else{
      //路由的next必须存在,否则无法进入下一页
      next();
    }
      // // // 路由的next必须存在,否则无法进入下一页,开发免登陆时放开
      // next();
  
  })
  


/* eslint-disable no-new */
// new Vue({
//   el: '#app',
//   router,
//   template: '<App/>',
//   components: { App }
// })

new Vue({
  el: '#app',
  template: '<App/>',
  router,
  store,
  components: { App }
  //render: h => h(App)
}).$mount('#app')