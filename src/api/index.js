import request from '../utils/request'

//GET /screen/data
//GET /screen/map/scatter
//GET /screen/wordcloud
//GET /screen/map
//icode是慕课网的防盗版标识
const icode = '3036335EA06C16C0'
export function wordcloud(){
    return request({
        url:'/screen/wordcloud',
        method:'get',
        params:{icode}
    }) 
}
export function screenData(){
    return request({
        url:'/screen/data',
        method:'get',
        params:{icode}
    })
}
export function mapScatter(){
    return request({
        url:'/screen/map/scatter',
        method:'get',
        params:{icode}
    })
}
export function screenMap(){
    return request({
        url:'/screen/map',
        method:'get',
        params:{icode}
    })
}