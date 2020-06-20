import $request from "@/config/request.js";// 导入我们的api接口
import formatDate from "./formatDate";
export default async function formatCourse(url, data = {}) {
  let res = await $request.post(url, data);
  // console.log(res);
  if (res.code !== 200) return this.$toast("数据获取失败");
  let arr = res.data.records ? res.data.records : res.data;
  let allList = arr.map(item => {
    let {
      liveCurriculaId,
      courseSize,
      liveCurriculaCourseSize,
      recordSize,
      liveCurriculaRecordSize,
      teacherName,
      liveCurriculaTeacher,
      creaTime,
      imagePrefix,
      liveCurriculaTitle,
      liveCurriculaCover,
      liveCurriculaOriginalPrice,
      liveCurriculaPresentPrice
    } = item;
    return {
      id: liveCurriculaId,
      title: liveCurriculaTitle,
      imgSrc: imagePrefix + liveCurriculaCover,
      isShowPrice: true,
      isPrice: liveCurriculaPresentPrice === 0 ? false : true,
      priceInfo: "公开课",
      price: liveCurriculaPresentPrice,
      orginPrice: liveCurriculaOriginalPrice,
      info: {
        tName: teacherName || liveCurriculaTeacher,
        allNum: courseSize || liveCurriculaCourseSize,
        num: recordSize || liveCurriculaRecordSize,
        time: formatDate(creaTime)
      }
    };
  });
  return allList;
}