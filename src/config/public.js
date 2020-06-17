import Vue from 'vue';
// import $request from "@/config/request.js";// 导入我们的api接口
/*
* 公共方法管理
*
* */
/**
 * @return any... { Object }
 * @description 保证缓存数据的实时性
 */

const _getUserMsg = () => {
    return localStorage.getItem("loginMsg") ? JSON.parse(localStorage.getItem("loginMsg")) : ''
}
/**
 * @return bzClientInfo|| $user  { Object }
 * @description 获取token和rowid
 */

const getToken = () => {
    let loginMsg = JSON.parse(localStorage.getItem("loginMsg"))
    let bzClientInfo = {};
    if (loginMsg) {
        bzClientInfo.token = loginMsg.token;//用户的token
        bzClientInfo.rowid = loginMsg.userId;//用户的rowid
        bzClientInfo.roleId = loginMsg.roleId//用户的身份
    }
    return bzClientInfo
}
Vue.prototype.$user = getToken
const _isMobile = () => {
    // 区分手机端(true)和电脑端(false)   使用 "this.$public._isMobile()"
    let flag = navigator.userAgent.match(
        /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
    );
    return flag;
}
/**
 * @return Promise { Object }
 * @description 获取最新的用户信息
 */
const loginByToken = (obj) => {
    let p = getToken();
    if(obj) p = obj;
    return new Promise((resolve, reject) => {
        $request.post("app/home/loginByToken",p).then(res => {
            resolve(res)
        }).catch(err => {
            reject(err)
        })
    });
}

// 获取当前日期
const getCurentTime = () => {
    let now = new Date();
    let hh = now.getHours();            //时
    let mm = now.getMinutes();          //分
    let clock = '';
    if (hh < 10)
        clock += "0";
    clock += hh + ":";
    if (mm < 10) clock += '0';
    clock += mm;
    return (clock);
}
// 从字符串中提取数字  或者提取字符串中的汉字
const strTakeNum = (val, type) => {
    if(typeof val !== 'string') return '你所传入的非字符串'
    if (type) {
        if (val != null && val != "") {
            let reg = /[\u4e00-\u9fa5]/g;
            return val.match(reg).join("");
        } else return "";
    } else {
        console.log(val);
        return val.replace(/[^0-9]/ig, "");
    }
}

const loading = null;

export default {
    _getUserMsg,
    _isMobile,
    loginByToken,
    loading,
    getCurentTime,
    strTakeNum
}

