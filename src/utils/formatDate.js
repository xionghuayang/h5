export default function formatDate(date, methods = " ") {
  let arr = date.split(' ');
  let dateArr = arr[0].split('-');
  let time = arr[1].substr(0, 5);
  let str = dateArr[0] + '年' + dateArr[1] + '月' + dateArr[2] + '日 ' + methods + "  " + time;
  // console.log(str);
  return str;

}