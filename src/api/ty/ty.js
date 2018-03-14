import fetch from '../fetch'
import qs from 'qs'



//获取表格各字段名
export function getGroupInfoList(applicatname) {
  let uri = '/carMg/service/ty/getGroupInfoList?applicatname='  + applicatname;
  return fetch({
    url: uri,
    method: 'get'
  });
}
//生成团单号接口
export function saveGroupInfo(form) {
    let uri = '/carMg/service/ty/saveGroupInfo';
    return fetch({
        url: uri,
        method: 'post',
        data:form
    });
}

//获取已推送同业且有效的团单清单
export function getTyGroupList(applicatname) {
  let uri = '/carMg/service/ty/getTyGroupList?applicatname='  + applicatname;
  return fetch({
    url: uri,
    method: 'get'
  });
}

//获取已推送同业且有效的团单清单
export function getTyGroup(grouppolicies) {
  let uri = '/carMg/service/ty/getTyGroup?grouppolicies='  + grouppolicies;
  return fetch({
    url: uri,
    method: 'get'
  });
}

//生成团单号接口
export function getProList(form) {
  let uri = '/carMg/service/ty/getProList';
  return fetch({
    url: uri,
    method: 'post',
        data:form
    });
  }
  //生成团单号接口
  export function pushGroupTaskInfo(data) {
    let uri = '/carMg/service/ty/pushGroupTaskInfo';
    return fetch({
      url: uri,
      method: 'post',
      data:data
    });
}

//获取已推送同业且有效的团单清单
export function getGroupTaskList(grouppolicies) {
  let uri = '/carMg/service/ty/getGroupTaskList?grouppolicies='  + grouppolicies;
  return fetch({
    url: uri,
    method: 'get'
  });
}

