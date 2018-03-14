import fetch from '../fetch'
import qs from 'qs'

//批量查询查勘信息
export function getCheckInfo(pageIndex, size, fm) {

    if (isNaN(pageIndex) == true) { pageIndex = 1; }
    if (isNaN(size) == true) { size = 20; }
    let uri = '/api/service/check/queryCheckInfo?pageSize=' + size + '&pageIndex=' + pageIndex;
    return fetch({
        url: uri,
        method: 'post',
        data: fm
    });
}

export function sendMsgManual(fm) {
    let uri = '/api/service/check/sendMsgManual';
    return fetch({
        url: uri,
        method: 'post',
        data: fm
    });
}

//批量查询查勘信息
export function getCheckSelftaskPage(pageIndex, size, fm) {
    
        if (isNaN(pageIndex) == true) { pageIndex = 1; }
        if (isNaN(size) == true) { size = 20; }
        let uri = '/api/service/check/queryCheckSelftaskPage?rows=' + size + '&page=' + pageIndex;
        return fetch({
            url: uri,
            method: 'post',
            data: fm
        });
    }