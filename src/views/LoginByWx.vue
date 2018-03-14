<template>
  <div>
    {{msg}}
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  created() {
    let token = this.$route.query.token;
    if(!token){
        let WxQyUrl = 'https://open.work.weixin.qq.com/wwopen/sso/qrConnect?appid=wx800e0858e9c9c257&agentid=1000006&redirect_uri=http%3a%2f%2fcar.szpiccxxjsb.cn%2fcarMg%2fservice%2fwx%2ftoRacPageByPc&state=' +  new Date().getTime();
        window.location.href = WxQyUrl;
    }
    this.$store.commit('setToken', token);
    //提交状态
    this.$store.dispatch('LoginByToken', token);

  },
  computed: {
    ...mapGetters([
      'userCode',
      'allRoutes',
      'loginStatus',
      'token'
    ])
  },
  data() {
    return {
      msg: "正在登陆中"
    }
  },
  methods: {
    getUserCode() {
      if (this.$route.query.usercode) {
        this.$store.commit('setUserCode', this.$route.query.usercode);
        this.$router.replace("/first");
      } else {
        this.msg = "登陆失败,请退出重试!";
      }
      // alert(this.userCode);
    }
  },
  watch: {
    //监控vuex中的状态变化,登陆成功则添加路由并跳转到首页,进入login时必须将登陆状态重置
    token() {

      if (this.token === "") { }
    },
    loginStatus() {
      if (this.loginStatus) {
        // var routesObj = makeRoute(eval(response.data));
        // //添加路由,但不能在$router.options中体现,所以导航是要重新加载的
        // this.$route.addRoutes(routesObj);
        this.$router.replace({ path: '/' });
      }
    }
  }
}
</script>
