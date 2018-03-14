import fetch from '../fetch'
import qs from 'qs'


//查询角色列表api
export function getUmRolePage(pageIndex,fm) {
  if (isNaN(pageIndex) == true) { pageIndex = 1; }
  let uri = '/carMg/service/umapi/queryUmRolePage?rows=20&page=' + pageIndex;
  return fetch({
    url: uri,
    method: 'post',
    data: fm
  });
}

//保存权限菜单模型api
export function saveRoleAndModule(data) {

  let uri = '/carMg/service/umapi/saveRoleAndModule';
  return fetch({
    url: uri,
    method: 'post',
    data: data,
  });
}


//获取已有菜单列表api
export function getAllModuleTree() {
  let uri = '/carMg/service/umapi/queryUmModuleTree';
  return fetch({
    url: uri,
    method: 'get',
  });
}


//获取已有菜单列表api
export function getRoleModule(roleid) {
  let uri = '/carMg/service/umapi/queryUmRoleModule?roleid=' + roleid;
  return fetch({
    url: uri,
    method: 'get',
  });
}

//查询角色列表api
export function getUmRoleUserPage(roleid) {
  let uri = '/carMg/service/umapi/queryUmRoleUser?roleid=' + roleid;
  return fetch({
    url: uri,
    method: 'get'
  });
}


//查询删除用户角色关联
export function delUmRoleUser(urid) {
  let uri = '/carMg/service/umapi/delUmRoleUser?urid=' + urid;
  return fetch({
    url: uri,
    method: 'get'
  });
}


//添加用户角色关联
export function addUmRoleUser(usercode,roleid) {
  let uri = '/carMg/service/umapi/addUmRoleUser?usercode=' + usercode + '&roleid=' + roleid;
  return fetch({
    url: uri,
    method: 'get'
  });
}

