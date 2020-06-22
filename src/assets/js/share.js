import $request from "@/config/request.js";// 导入我们的api接口
import wx from "weixin-js-sdk";
class Share {
    url;
    sharePara = {
        title: '',
        imgScr: '',
        desc: '',
        link:''
    };

    constructor() {
        this.url = location.href;
    }
    init(sharePara) {
        // 接收的数据格式  必须为一个对象   需要包含属性 标题：title  缩略图：imgScr   简介desc
        this.sharePara = sharePara;
        console.log(this.sharePara);
        $request.post("app/rsWeChatPay/getSignature", { url: this.url }).then(res => {
            let signInfo = res.data;
            wx.config({
                debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                appId: 'wx2aec8d2e0a62811f', // 必填，公众号的唯一标识
                timestamp: signInfo.timestamp, // 必填，生成签名的时间戳
                nonceStr: signInfo.nonceStr, // 必填，生成签名的随机串
                signature: signInfo.signature, // 必填，签名
                jsApiList: [
                    "onMenuShareAppMessage", //微信分享
                    "onMenuShareTimeline", //微信分享
                    "updateAppMessageShareData"//微信分享
                ]
            });
        });
        let title = this.sharePara.title;
        let link = this.sharePara.link ? this.sharePara.link : this.url;
        let imgScr = this.sharePara.imgScr;
        let desc = this.sharePara.desc;
        wx.ready(function () {
            wx.onMenuShareTimeline({
                title: title, // 分享标题
                link: link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                desc: desc,
                imgUrl: imgScr, // 分享图标
                success: function (res) { },
                complete: function (e) { }
            }),
                wx.updateAppMessageShareData({
                    title: title, // 分享标题
                    desc: desc,
                    link: link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                    imgUrl: imgScr, // 分享图标
                    success: function () { }
                });
            wx.onMenuShareAppMessage({
                title: title, // 分享标题
                desc: desc,
                link: link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                imgUrl: imgScr, // 分享图标
                success: () => { }
            });
        });
    }

}

export default Share