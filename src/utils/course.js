import $request from "@/config/request.js";// 导入我们的api接口
import formatDate from "./formatDate";
export default async function formatCourse(url, data = {}) {
  let res = await $request.post(url, data);
  console.log(res);
  if (res.code !== 200) return this.$toast("数据获取失败");
  let arr = res.data.records ? res.data.records : res.data;
  let allList = arr.map(item => {
    let {
      liveCurriculaId, // 一级id
      courseSize, // 我的课程节数
      liveCurriculaCourseSize, // 列表课程节数
      recordSize, // 我的课程回放
      liveCurriculaRecordSize, // 列表 课程节数
      teacherName, // 我的课程教师
      liveCurriculaTeacher, // 列表课程教师
      creaTime, // 创建时间
      imagePrefix, // 图片前缀
      liveCurriculaTitle,  // 课程标题
      liveCurriculaCover, // 图片路径
      liveCurriculaOriginalPrice, // 原价
      liveCurriculaPresentPrice, // 现价
      liveCurriculaConsult, // 咨询手机号
      isLiveCurriculaUser, // 是否拥有该课程（列表）
      liveCurriculaUser, // 删除课程id （列表）
      liveCurriculaUserId, // 删除课程id （我的）
      liveCurriculaDetails, // 课程详情
      status, // 课程状态 1 直播中 0 已结束
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
      phoneNum: liveCurriculaConsult,
      isHaveCourse: isLiveCurriculaUser,
      removeId: liveCurriculaUserId || liveCurriculaUser.liveCurriculaUserId,
      info: {
        tName: teacherName || liveCurriculaTeacher,
        allNum: courseSize || liveCurriculaCourseSize,
        num: recordSize || liveCurriculaRecordSize || 0,
        time: formatDate(creaTime)
      },
      courseInfo: liveCurriculaDetails,
      status
    };
  });
  return allList;
}