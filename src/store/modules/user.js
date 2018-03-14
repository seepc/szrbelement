import * as api from "@/api/login"


const user = {
  state: {
    userCode: '',
    userName: '',
    allRoutes:'',
    token:'',
    loginStatus:false
  },
  //提交修改状态
  mutations: {
    setUser(state, user) {
      state.userCode = user.userCode;
      state.userName = user.userName;
      state.allRoutes = user.routes;
      state.token = user.token;
      state.loginStatus = true;
    },
    logOut(state){
      state.userCode = '';
      state.userName = '';
      state.allRoutes = '';
      state.token = '';
      state.loginStatus = false;
    },
    setToken(state,token){
      state.token = token;;
    }

  },
  //请求用户密码验证
  actions: {
    LoginByPasswd({ commit }, userCheck) {
      api.login(userCheck).then((response) => {
          // console.log(response);
          if (response.code === 200) {
            // console.log(response.data);
            let user = response.data;
            commit('setUser', user);
          }
        })
        .catch(function(error) {
          // this.loading = false;
          console.log(error);
        });
    },
    LoginByToken({ commit }) {
      api.loginByToken().then((response) => {
          console.log(response);

          if (response.code === 200) {
            console.log(response.data);
            let user = response.data;
            commit('setUser', user);
          }
        })
        .catch(function(error) {
          // this.loading = false;
          console.log(error);
        });
    }
  }
}


export default user;
