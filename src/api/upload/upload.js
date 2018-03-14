import fetch from '../fetch'
import qs from 'qs'



//删除图片api,其中bindId为完整的投保单号,uid为上传的数据序列号.
export function deleteImage(bindId,uid) {
  let uri = '/carMg/service/image/deleteImg?imageType=901&bindId='+bindId+'&serialno='+uid;
  return fetch({
    url: uri,
    method: 'get',
  });
}

//查询投保单api,传险种和投保单后7位即可.
export function getProposalno(bsType,proposalNo) {
  let uri = '/carMg/service/insure/proInfoQry?bsType='+bsType+'&proposalNo='+proposalNo;
  return fetch({
    url: uri,
    method: 'get'
  });
}


//根据任务号查找所有相关图片
export function showImgBind(bindId) {
  let uri = '/carMg/service/image/showImgBind?bindId='+bindId;
  return fetch({
    url: uri,
    method: 'get'
  });
}

//上传提交接口
export function proSubmit(taskId,dealtype) {
  let uri = '/carMg/service/insure/proSubmit?dealtype='+ dealtype + '&taskId=' + taskId;
  return fetch({
    url: uri,
    method: 'get'
  });
}

//获取任务单号
export function getTaskId(data) {
  console.log(data);
  let uri = '/carMg/service/insure/getTaskId';
  return fetch({
    url: uri,
    method: 'post',
    data:data
  });
}
