// import axios from 'axios';

// let key = '13b5e2ab1179baf1e5bbbd2d3024912b';
// let area = '中国';
// let level = 3;
// let url = `https://restapi.amap.com/v3/config/district?keywords=${area}subdistrict=${level}&key=${key}`;
// let url = 'https://restapi.amap.com/v3/config/district?keywords=%E4%B8%AD%E5%9B%BD&subdistrict=3&key=13b5e2ab1179baf1e5bbbd2d3024912b'
// let serve = axios.create({
//   baseURL: ''
// });

// serve(url).then(res => {
//   console.log(res);
//   let province = res.data.districts[0].districts.map(item => {
//     let obj = {};
//     obj.text = item.name || ''; // 省
//     obj.children = item.districts.map(item => {
//       let obj = {};
//       obj.text = item.name || ''; // 市
//       obj.children = item.districts.map(item => {
//         let obj = {};
//         obj.text = item.name || ''; // 县
//         return obj;
//       })
//       return obj;
//     })
//     return obj;
//   });
//   // console.log(province);
//   provinceList = province;
// }).catch(res => {
//   console.log(res);
// })

// export default async function getData() {
//   let res = await serve(url);
//   // console.log(res);
//   let province = res.data.districts[0].districts.map(item => {
//     let obj = {};
//     obj.text = item.name || ''; // 省
//     obj.children = item.districts.map(item => {
//       let obj = {};
//       obj.text = item.name || ''; // 市
//       obj.children = item.districts.map(item => {
//         let obj = {};
//         obj.text = item.name || ''; // 县
//         return obj;
//       })
//       return obj;
//     })
//     return obj;
//   });
//   // console.log(province, '===');
//   return province;
// }



