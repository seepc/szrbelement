const getters = {
  userCode:state => state.user.userCode,
  userName:state => state.user.userName,
  allRoutes:state => state.user.allRoutes,
  loginStatus:state => state.user.loginStatus,
  token:state => state.user.token

};

export default getters