import fetch from '../fetch'
import qs from 'qs'



//获取表格各字段名
export function qrytitle() {
  let uri = '/carMg/service/toolqry/qrytitle?modeID=M00000002';
  return fetch({
    url: uri,
    method: 'get'
  });
}

//根据查询条件获取内容
export function qrydata(page,rows,data) {
  let uri = '/carMg/service/toolqry/qrydata?modeID=M00000002&page=' + page + '&rows=' + rows ;
  return fetch({
    url: uri,
    method: 'post',
    data: data
  });
}

//根据查询条件下载
export function qrydataDown(data) {
  let uri = '/carMg/service/toolqry/qrydata?modeID=M00000002&downExc=1&' +data;
  return fetch({
    url: uri,
    method: 'get'
  });
}

//查询任务号的所有图片
export function showImgBind(bindId) {
  let uri = '/carMg/service/image/showImgBind?bindId='+bindId;
  return fetch({
    url: uri,
    method: 'get'
  });
}

//根据支公司代码查询支公司信息
export function qryComCode(comcode) {
  let uri = '/carMg/service/dict/qryComCode?comcode=' + comcode;
  return fetch({
    url: uri,
    method: 'get'
  });
}

//根据车行名称查询车行信息
export function qryCompany(resourcename) {
  let uri = '/carMg/service/dict/qryCompany?resourcename=' + resourcename;
  return fetch({
    url: uri,
    method: 'get'
  });
}

//任务单审核
export function auditTask(auditflag,taskId) {
  let uri = '/carMg/service/insure/auditTask?auditflag='+ auditflag +'&taskId=' + taskId;
  return fetch({
    url: uri,
    method: 'get'
  });
}
