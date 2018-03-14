import fetch from '../fetch'
import qs from 'qs'

//批量查询用户api
export function getUmUserPage(pageIndex, fm) {

  if (isNaN(pageIndex) == true) { pageIndex = 1; }
  let uri = '/carMg/service/umapi/queryUmUserPage?rows=20&page=' + pageIndex;
  return fetch({
    url: uri,
    method: 'post',
    data: fm
  });
}
//查询用户api
export function getUmUser(usercode) {

  let uri = '/carMg/service/umapi/queryUmUser?usercode=' + usercode;
  return fetch({
    url: uri,
    method: 'get',
  });
}

//保存用户api
export function saveUmUser(data) {

  let uri = '/carMg/service/umapi/saveUmUser';
  return fetch({
    url: uri,
    method: 'post',
    data: data,
  });
}


//获取支公司api
export function getUmComPage() {
  let uri = '/carMg/service/umapi/queryUmComPage';
  return fetch({
    url: uri,
    method: 'get',
  });
}


//获取用户所有角色
export function getUmUserrole(usercode) {
  let uri = '/carMg/service/umapi/queryUmRoleUser?usercode=' + usercode;
  return fetch({
    url: uri,
    method: 'get',
  });
}



//查询角色列表api
export function getUmRolePage() {
  let uri = '/carMg/service/umapi/queryUmRolePage?rows=2000&page=1';
  return fetch({
    url: uri,
    method: 'get',
  });
}


//查询角色列表api
export function refreshUmUserRole(data) {
  let uri = '/carMg/service/umapi/refreshUmUserRole';
  return fetch({
    url: uri,
    method: 'post',
    data:data
  });
}