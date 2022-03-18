import axios from 'axios'

//返回一个函数
const service = axios.create({
    baseURL:'https://apis.imooc.com',
    timeout:5000
})
//添加响应拦截器
service.interceptors.response.use(
    res => {
        if(res.status===200 && res.data){
            console.log(res.data)
            return res.data
        } else {
            return Promise.reject(new Error('请求失败'))
        }
    },
    err => {
        return Promise.reject(err)
    }
)
export default service