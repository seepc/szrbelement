import fetch from './fetch'
import qs from 'qs'

export function login(userdata) {
    // console.log(userdata);
  // var data = qs.stringify(userdata);	
  return fetch({
    //本地模拟返回登陆json,在没有后台服务器时使用,如果跳过登陆,路由要直接在route文件中添加
    // url: '/static/login.json',   
    // method: 'get'

  	//正式环境登陆
    url: '/carMg/service/umapi/login',
    method: 'post',
    data:userdata,

  });
}


export function loginByToken() {
  // console.log(userdata);
// var data = qs.stringify(userdata);	
return fetch({
  //本地模拟返回登陆json,在没有后台服务器时使用,如果跳过登陆,路由要直接在route文件中添加
  // url: '/static/login.json',   
  // method: 'get'

  //正式环境登陆
  url: '/carMg/service/umapi/loginByToken',
  method: 'post',

});
}
