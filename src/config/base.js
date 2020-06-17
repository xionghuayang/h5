/*
* 接口域名管理
*
* */
const base = {
    bzBaseURL:"https://www.baizezaixian.com/baizeyikao_system",//线上接口地址
    // bzTestURL:"http://192.168.3.4:9000",//线下接口地址
    bzTestURL:"https://www.baizezaixian.com/baizeyikao_system",//测试环境线下接口地址
    // 注释其中一个 否则视为覆盖
    // bzSocketURL:"ws://192.168.3.4:9000/websocket",//线下socket地址
    // bzSocketURL:"ws://94.191.76.216/baizeyikao_system/websocket",//线上socket地址ip
    bzSocketURL:"wss://www.baizezaixian.com/baizeyikao_system/websocket",//线上socket地址

};

export default base;