import axios from 'axios'
import qs from "qs"
// import router from '@/router'
// import store from '@/store'//引入store
import base from "@/config/base.js";// 导入我们的接口域名
import { Toast } from 'vant';
if (process.env.NODE_ENV === 'development') {
    // 开发环境中  使用线上/线下接口
    // axios.defaults.baseURL = base.bzBaseURL;
    axios.defaults.baseURL = base.bzTestURL;
} else {
    axios.defaults.baseURL = base.bzBaseURL
}
// 线上环境 ： 开发环境
// axios.defaults.baseURL = process.env.NODE_ENV === 'production' ? base.bzBaseURL : base.bzTestURL;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
axios.defaults.timeout = 10000;

// 添加请求拦截器携带token 和 rowid
// axios.interceptors.request.use(function (config) {
//     /**
//      * @description 在发送请求之前做些什么
//      * @lf : 这里可以添加token 和rowid 
//      * @lf : 由于白泽的这个项目后端没有设置支持跨域请求头token字段  所以并未在这携带token  需要开发者在页面中获取 并作为FormData手动进行传递 
//      * @description 
//      */
//     // if (store.state.token) {
//     //     config.headers.common['token'] = store.state.token
//     //     config.headers.common['rowid'] = store.state.rowid
//     // }
//     return config
// }, (error) => {
//     console.error(err)
//     return Promise.reject(error)
// })
// 相应拦截 服务器返回结果时候判断再返回
axios.interceptors.response.use(res => {
    if (res.status === 200) {
        if (res.data.code == 406) {
            Toast(res.data.message)
            localStorage.removeItem("loginMsg");
            setTimeout(() => {
                location.href = 'https://www.baizezaixian.com/H5/#/pages/login/login'
            }, 1000);
        }
        return res.data
    } else {
        console.log(res);
        return res
    }
}, err => {
    console.error(err)
});
const request = {
    post(url, data = {}) {
        // 判断用户传递的URL是否/开头,如果不是,加上/
        url = url.indexOf('/') == 0 ? url : '/' + url
        // 直接将data序列化
        return axios.post(url, qs.stringify(data))
    },
    get(url, data = {}) {
        url = url.indexOf('/') == 0 ? url : '/' + url
        return axios.get(url, qs.stringify(data))
    }
};
export default request