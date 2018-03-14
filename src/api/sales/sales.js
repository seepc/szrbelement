import fetch from '../fetch'
import qs from 'qs'




//保存新的销售人员
export function addNewSales(form) {
    let uri = '/carMg/service/ty/addNewSales';
    return fetch({
        url: uri,
        method: 'post',
        data:form
    });
}
//查询销售人员列表
export function getSalesPage(form,pageIndex,pageSize) {

    if (isNaN(pageIndex) == true) { pageIndex = 1; }
    if (isNaN(pageSize) == true) { pageSize = 20; }
    console.log("pageSize:" + pageSize);
    console.log("pageIndex:" + pageIndex);
    let uri = '/carMg/service/ty/getSalesPage?rows='+ pageSize +'&page=' + pageIndex;
    return fetch({
        url: uri,
        method: 'post',
        data:form
    });
}
//查询销售人员列表
export function updateSales(form) {
  let uri = '/carMg/service/ty/updateSales';
  return fetch({
      url: uri,
      method: 'post',
      data:form
  });
}
//查询销售人员列表
export function deleteSales(form) {
  let uri = '/carMg/service/ty/deleteSales';
  return fetch({
      url: uri,
      method: 'post',
      data:form
  });
}


