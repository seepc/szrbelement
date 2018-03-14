<template>
  <div class="background-login">
    <dir class="login-div">
      <el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-position="left" label-width="0px" class="demo-ruleForm login-container">
        <h3 class="title">{{sysName}}</h3>
        <el-form-item prop="userCode">
          <el-input type="text" v-model="ruleForm2.userCode" auto-complete="off" placeholder="账号"></el-input>
        </el-form-item>
        <el-form-item prop="checkPass">
          <el-input type="password" v-model="ruleForm2.checkPass" auto-complete="off" placeholder="密码"></el-input>
        </el-form-item>
        <!--     <el-checkbox v-model="checked" checked class="remember">记住密码</el-checkbox> -->
        <el-form-item style="width:100%;">
          <!--       <el-button type="primary" style="width:100%;" @click.native.prevent="handleSubmit2" :loading="logining">登录</el-button> -->
          <el-button type="primary" style="width:100%;" @click.native.prevent="handleSubmit2" :loading="logining">登录</el-button>
          <!--<el-button @click.native.prevent="handleReset2">重置</el-button>-->
        </el-form-item>
      </el-form>
    </dir>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  created(){
    // console.log(this.$store.getters);
  },
  data() {
    return {
      sysName: '车险应用管理系统',
      logining: false,
      ruleForm2: {
        userCode: '',
        checkPass: ''
      },
      //表单有效验证
      rules2: {
        userCode: [
          { required: true, message: '请输入账号', trigger: 'blur' },
          //{ validator: validaePass }
        ],
        checkPass: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          //{ validator: validaePass2 }
        ]
      },
      checked: true,
      routeItems: []
    };
  },
  computed:{
    //vuex的getters引用,单独指定
    ...mapGetters([
        'allRoutes',
        'loginStatus'
      ])
  },
  methods: {
    handleSubmit2(ev) {
      // this.$store.commit('logOut');
      //提交到vuex的actions,如果请求成功,则在vuex保存state
      this.$store.dispatch('LoginByPasswd',this.ruleForm2);

    },
  },
  watch:{
    //监控vuex中的状态变化,登陆成功则添加路由并跳转到首页,进入login时必须将登陆状态重置
    loginStatus(){
        if(this.loginStatus){
          // var routesObj = makeRoute(eval(response.data));
          // //添加路由,但不能在$router.options中体现,所以导航是要重新加载的
          // this.$route.addRoutes(routesObj);
           this.$router.push({ path: '/' }); 
        }

    }
  }
}

</script>
<style scoped>
.background-login {
  /*background-color: #58B7FF;*/
  background-color: rgb(81, 206, 206);
  height: 100%;
  width: 100%;
  margin: 0px;
  text-align: center;
}

.login-div {
  display: block;
  margin: auto;
  padding-top: 180px;
}

.login-container {
  /*    position:absolute;*/
  /*box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02);*/
  -webkit-border-radius: 5px;
  border-radius: 5px;
  -moz-border-radius: 5px;
  background-clip: padding-box;
  margin: auto;
  width: 350px;
  padding: 35px 35px 15px 35px;
  background: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
  .title {
    margin: 0px auto 40px auto;
    text-align: center;
    color: #505458;
  }
  .remember {
    margin: 0px 0px 35px 0px;
  }
}

</style>
