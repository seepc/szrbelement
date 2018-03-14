// import store from '@/store'
import Login from '@/views/Login.vue'
import LoginByWx from '@/views/LoginByWx.vue'
import Hello from '@/components/Hello.vue'

//模块分割例子,AMD 风格的 require,效果同上
const First = resolve => require(['@/views/pages/First.vue'], resolve);
const Home = resolve => require(['@/views/common/Home.vue'], resolve);
const User = resolve => require(['@/views/pages/permission/User.vue'], resolve);
const Role = resolve => require(['@/views/pages/permission/Role.vue'], resolve);

// const UploadPhotos = resolve => require(['@/views/pages/UploadPhotos.vue'], resolve);
// const DoubleCount = resolve => require(['@/views/pages/DoubleCount.vue'], resolve);
// const AddGroup = resolve => require(['@/views/pages/ty/AddGroup.vue'], resolve);
// const PushGroupTask = resolve => require(['@/views/pages/ty/PushGroupTask.vue'], resolve);
// const GroupOverList = resolve => require(['@/views/pages/ty/GroupOverList.vue'], resolve);
// const AddSales = resolve => require(['@/views/pages/sales/AddSales.vue'], resolve);
// const AddSalesList = resolve => require(['@/views/pages/sales/AddSalesList.vue'], resolve);


// '/login','/','/first'为默认路由必须存在,其他路由可为异步加载。
// hidden参数为true时,不自动组成导航条,暂时只控制一级菜单,要控制二级时请在router.addRoutes(routes)前操作
let routes = [{
    path: '/login',
    component: Login,
    name: '登陆',
    hidden: true,
    // beforeRouteEnter (to, from, next) {
    // // 登陆前预处理在渲染该组件的对应路由被 confirm 前调用
    // // 不！能！获取组件实例 `this`,因为当钩子执行前，组件实例还没被创建
    //    next(vm => {
    // // 通过 `vm` 访问组件实例
    //     vm.store.commit('logOut');
    //   })
    // }
  }, {
    path: '/loginByWx',
    component: LoginByWx,
    name: '企业微信登陆',
    hidden: true,
  },{
    path: '/',
    component: Home,
    name: '首页',
    redirect: '/first',
    hidden: true,
    mate: {
      icon: 'fa fa-home',
      index: 'first'
    }
    ,
    children: [
      { path: '/first', component: First, name: '主页' }
    ]
  },
];




//可以预设路由,通过import导入



//从服务器获取路由,进行拼接,所有模块不再以import的形式引入,只能通过require方式加载!
export const makeRoute = function(items) {
  let routes = [];
  for (var i = 0; i < items.length; i++) {
    // console.log(items[i]);
    items[i] = formatRoute(items[i]);
    if (items[i].children) {
      //递归处理子路由的component
      items[i].children = makeRoute(items[i].children);
    }
  }
  return items;
}

//格式化路由,使路component挂载在路由上,生成addRoutes可用的格式
const formatRoute = (item) => {
  let route = item;
  route.component = eval(route.component);
  return route;
}
export default routes;
