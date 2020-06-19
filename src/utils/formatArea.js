import area from './area.js';

// console.log(area);

let proviceArr = [];
// 处理省
let pObj = area.province_list;
for (let k in pObj) {
  if (pObj[k].length > 7) {
    pObj[k] = pObj[k].substr(0, pObj[k].length - 3);
  }
  let obj = {
    code: k,
    text: pObj[k],
    children: []
  }
  proviceArr.push(obj);
}
// 处理市
let cObj = area.city_list;
for (let k in cObj) {

}
let arr = proviceArr.map(item => {
  let str = item.code.substr(0, 2);
  // let arr = [];
  for (let k in cObj) {
    if (cObj[k].length > 7) {
      cObj[k] = cObj[k].substr(0, cObj[k].length - 3);
    }
    if (k.startsWith(str)) {
      item.children.push({ code: k, text: cObj[k], children: [] })
    }
  }
  // console.log(str);
  return item;
})
// 处理县
let cList = area.county_list;
arr.forEach(item => {
  item.children.map(item1 => {
    let str = item1.code.substr(0, 4);
    for (let k in cList) {
      if (cList[k].length > 7) {
        cList[k] = cList[k].substr(0, cList[k].length - 3);
      }
      if (k.startsWith(str)) {
        item1.children.push({ code: k, text: cList[k] })
      }
    }
  })
})
// console.log(arr);
export default arr;
