<template>
  <div class="sidebar">
    <el-menu :default-active="onRoutes" 
      unique-opened router>
      <template v-for="item in items">
        <template v-if="item.children ">
          <el-submenu :index="item.path" theme="dark">
            <template slot="title"><i :class="item.icon"></i>{{ item.name }}</template>
            <template v-for="(subItem,i) in item.children" >
              <el-menu-item v-if="subItem.showtype !== 'hide'" :key="i" :index="subItem.path">{{ subItem.name }}
              </el-menu-item>
            </template>
          </el-submenu>
        </template>
        <template v-else>
          <el-menu-item :index="item.path">
            <i :class="item.icon"></i>{{ item.name }}
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  created() {
    //免登陆预处理,测试用,正式环境需要注释这个部分
    // this.$store.dispatch('LoginByPasswd','');
    //  this.getRoutes();
    // console.log(this.$router.options.routes);
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      items: "allRoutes"
    }),
    onRoutes() {
      // console.log(this.$route.path.replace('/', ''));
      return this.$route.path;
    }
    // items() {
    //   var tt = this.$router.options.routes.filter(item => { return item.hidden != true; });
    //   // var tt = this.routeItems;
    //   return tt;
    // }
  },
  watch: {},
  methods: {
    getRoutes() {
      let url = "static/routes.json";
      this.$axios({
        method: "get",
        url: url
        // data: data,
        // responseType:'arraybuffer',
      })
        .then(response => {
          // console.log(response.data);
          // this.routeItems = eval(response.data);;
          // this.$router.addRoutes(this.routeItems);
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    pushRoutes() {
      // this.$router.addRoutes(this.routeItems);
      // this.routeItems =
    }
  }
};
</script>
<style scoped>
/**菜单颜色**/
.el-menu {
  background-color: #eef5f6;
}
/*焦点*/
.el-menu-item:focus {
  background-color: #d1e3e5;
}
/*鼠标悬浮*/
.el-menu-item:hover {
  /* background-color: #E4EEF1; */
  background-color: #d1e3e5;
}
.el-menu-item {
  background-color: #e4eef1;
}
/*一级菜单鼠标悬浮*/
.el-submenu__title:hover {
  background-color:#d1e3e5 !important;
}
/*一级菜单鼠标悬浮*/
.el-submenu__title:focus, .el-submenu__title:hover {
  background-color:#d1e3e5 !important; 
}


.sidebar {
  display: block;
  position: absolute;
  width: 250px;
  left: 0;
  top: 60px;
  bottom: 0;
  background: #2e363f;
}

.sidebar > ul {
  height: 100%;
}
</style>
