export default async function (that) {
  // let p = this.$user();
  console.log(that.$route.query, '-----shareUrl');
  let { rowid, oneId, threeId } = that.$route.query;
  if (rowid) {
    localStorage.setItem("shareUrl", location.href);
  }
  let res = await that.$public.loginByToken();
  let uId = '';
  if (res.code == 200) {
    localStorage.removeItem("shareUrl");
    uId = res.data.userId;
    if (rowid && (rowid + '') !== (uId + '')) {
      // 存在分享rid, 当前用户uid
      let p = that.$user();
      p.receiveUser = uId;
      p.shareUser = rowid;
      p.liveCurriculaId = oneId;
      p.liveCurriculaCourseId = threeId;
      that.$request.post("/app/live/live_share", p).then(res => {
        console.log(res, '====share-21');
      }).catch(err => {
        console.log(err, '====share-23');
      });
      // console.log(res);
    }
  }
  return uId;
}