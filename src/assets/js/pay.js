import $request from "@/config/request.js";// 导入我们的api接口
import wx from "weixin-js-sdk"; //导入微信SDK
import { Toast } from 'vant'; //提示组件
class Pay {
    // 用户传入格式 { $user openid price liveCurriculaId }
    orderInfo = {
        appid: 'wx2aec8d2e0a62811f',
        trade_type: 'JSAPI',
        openid: this.getOpenid()
    };
    constructor(orderInfo) {
        this.orderInfo = Object.assign(this.orderInfo, orderInfo);
    }
    getPaySign() {
        return new Promise((resolve, reject) => {
            $request.post("/app/live/weChatPayPainting", this.orderInfo).then(res => {
                if (res.code == 200) {
                    this.payment(res.data).then(res => {
                        resolve(res)
                    }).catch(err => {
                        reject(err)
                    });
                }
            })
        });
    }
    payment(data) {
        return new Promise((resolve, reject) => {
            let [appId, timestamp, nonceStr, signature, packages, sign] = [data.appId, data.timeStamp, data.nonceStr, data.sign, data.package, data.sign];
            wx.config({
                debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                appId, // 必填，公众号的唯一标识
                timestamp, // 必填，生成签名的时间戳
                nonceStr, // 必填，生成签名的随机串
                signature, // 必填，签名，见附录1
                jsApiList: ['chooseWXPay'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
            });
            wx.invoke(
                'getBrandWCPayRequest', {
                appId: appId, //公众号名称，由商户传入
                timeStamp: timestamp, //时间戳，自1970年以来的秒数
                nonceStr: nonceStr, //随机串
                package: data.package,
                signType: 'MD5', //微信签名方式：
                paySign: sign //微信签名
            }, function (res) {
                if (res.err_msg == 'get_brand_wcpay_request:ok') {
                    // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
                    resolve(res)
                } else if (res.err_msg == 'get_brand_wcpay_request:cancel') {
                    reject(res)
                }
            }
            )
        });
    }
    getOpenid() {
        let openid = localStorage.getItem("openid");
        if (openid) return openid
        else {
            Toast.fail('获取支付参数失败，请重新登录！');
            let timer = setTimeout(() => {
                clearTimeout(timer);
                location.href = 'https://www.baizezaixian.com/H5/#/pages/login/login';
            }, 1500);
        }
    }
}

/**
  * @支付的用法
  * @首先页面导入   import Pay from "../assets/js/pay";
  * @调用支付
  *    @param:            {       $user,           price , liveCurriculaId } 
  *    @description-----> 用户登录的token 和 rowid  价格        直播课id
  *   @第一次下单 ：
      let _obj = this.$user();
      _obj.price=222,
      _obj.liveCurriculaId=4
      console.log(_obj);
      let wxPay = new Pay(_obj);
      wxPay.getPaySign().then(res=>{
        alert("then")
        alert(JSON.stringify(res))
      }).catch(err=>{
        alert("error")
        alert(JSON.stringify(err))
      })

      @待支付订单重新拉起支付
      let wxPay = new Pay({});
      @param:{data }  --->  预下单参数  重新拉起支付
      wxPay.payment(data).then(res=>{
        alert("then")
        alert(JSON.stringify(res))
      }).catch(err=>{
        alert("error")
        alert(JSON.stringify(err))
      })
 */

export default Pay