<template>
  <div class="info">
    <!-- 卡片 -->
    <div class="toast">
      <p class="title">{{$route.query.orgName}}集训预报名</p>
      <p class="desc">有意向{{$route.query.orgName}}集训的同学可填写表单，填写后将会有老师与 您联系。为保证你可以与老师取得联系，请填写真实信息。</p>
    </div>
    <!-- 表单 -->
    <!-- 输入任意文本 -->
    <van-form class="form" @submit="onSubmit">
      <div class="form-item">
        <p class="title">1.请输入姓名</p>
        <van-field
          v-model="form.userName"
          class="field"
          :rules="[{ required: true, message: '请填写用户名' }]"
        />
      </div>
      <div class="form-item">
        <p class="title">2.请输入手机号</p>
        <van-field v-model="form.userPhone" class="field" @click="showNumber = true" readonly />
        <van-number-keyboard
          safe-area-inset-bottom
          v-model="form.userPhone"
          :show="showNumber"
          @blur="showNumber = false"
          :maxlength="11"
          @input="onInput"
        />
      </div>
      <div class="form-item">
        <p class="title">3.请选择日期</p>
        <!-- <van-field
          :value="form.creaTime"
          class="field"
          @click="show = true"
          readonly
          :right-icon="dateUrl"
        />-->
        <div class="input-date" @click="show = true">
          {{form.creaTime.substr(0, this.form.creaTime.length - 8)}}
          <img
            src="../assets/images/date.png"
            alt
          />
        </div>
        <van-calendar v-model="show" @confirm="onConfirm" />
      </div>
      <div class="form-item">
        <p class="title">4.请选择地区</p>
        <van-field v-model="form.userRegion" class="field" @click="showPicker = true" readonly />
        <van-popup v-model="showPicker" round position="bottom">
          <van-picker
            show-toolbar
            :columns="columns"
            @cancel="showPicker = false"
            @confirm="onConfirmPicker"
          />
        </van-popup>
      </div>
      <div class="form-item">
        <p class="title">5.请输入学校名称</p>
        <van-field v-model="form.userSchool" class="field" />
      </div>
      <!-- 提交@click="submit"  -->
      <van-button class="subBtn" native-type="submit">确定</van-button>
    </van-form>
  </div>
</template>
<script>
import provinceList from "../utils/formatArea.js";
export default {
  name: "info",
  created() {
    // 城市信息
    this.columns = provinceList;
  },
  mounted() {},
  data() {
    return {
      dateUrl: require("../assets/images/date.png"),
      form: {
        userName: "",
        userPhone: "",
        creaTime: "",
        userRegion: "",
        userSchool: ""
      },
      // 日历
      show: false,
      // 城市
      showPicker: false,
      // 城市列表
      columns: [],
      // 数字键盘
      showNumber: false
    };
  },
  methods: {
    // 格式化时间
    formatDate(date) {
      let month =
        date.getMonth() + 1 > 9
          ? date.getMonth() + 1
          : "0" + (date.getMonth() + 1);
      let day = date.getDate() > 9 ? date.getDate() : "0" + date.getDate();
      return `${date.getFullYear()}-${month}-${day} 00:00:00`;
    },
    // 修改时间
    onConfirm(creaTime) {
      this.show = false;
      this.form.creaTime = this.formatDate(creaTime);
      // console.log(this.form.creaTime.substr(0, this.form.creaTime.length - 8));
    },
    // 修改城市
    onConfirmPicker(value) {
      // console.log(value);
      let str = "";
      value.forEach(item => {
        if (item) {
          str += item + " ";
        }
      });
      this.form.userRegion = str.substr(0, str.length - 1);
      console.log(this.form.userRegion);
      this.showPicker = false;
    },
    // 数字键盘
    onInput(value) {
      console.log(value);
    },
    // 提交
    onSubmit() {
      console.log(this.form);
      for (let k in this.form) {
        if (!this.form[k]) return this.$toast("请将表单填写完整！");
      }
      let p = this.$user();
      let data = Object.assign(this.form, p);
      data.orgId = this.$route.query.orgId;
      data.userId = p.rowid;
      data.liveCurriculaId = this.$route.query.oneId;
      this.$request.post("/app/live/live_sign_up", data).then(res => {
        console.log(res);
        if (res.code == 200) {
          this.$toast.success("预约成功");
          setTimeout(() => {
            this.$router.go(-1);
          }, 1500);
        }
      });
    }
  }
};
</script>
<style scoped lang="scss">
.info {
  padding: 20px 29px 0 38px;
  box-sizing: border-box;
}
.toast {
  width: 683px;
  height: 225px;
  background: #fff;
  box-shadow: 0px 2px 20px 0px rgba(223, 223, 223, 0.5);
  border-radius: 40px;
  padding: 55px 40px;
  box-sizing: border-box;
  .title {
    height: 55px;
    font-size: 28px;
    font-weight: bold;
    color: #fed039;
  }
  .desc {
    font-size: 22px;
    color: #282828;
    line-height: 34px;
  }
}
.form {
  .form-item {
    height: 168px;
    margin-top: 40px;
    .van-cell {
      padding: 0;
    }
    .title {
      position: relative;
      display: inline-block;
      font-size: 28px;
      color: #252525;
      &:after {
        position: absolute;
        right: -16px;
        color: #ee0a24;
        font-size: 28px;
        width: 12px;
        height: 12px;
        content: "*";
      }
    }
    .field {
      width: 680px;
      height: 86px;
      line-height: 86px;
      background: #f5f5f5;
      border-radius: 20px;
      margin-top: 30px;
      padding-left: 32px;
    }
    .input-date {
      margin-top: 0.88rem;
      position: relative;
      width: 680px;
      height: 86px;
      background: #f5f5f5;
      border-radius: 20px;
      padding: 20px 32px;
      overflow: hidden;
      color: #323233;
      font-size: 28px;
      line-height: 48px;
      box-sizing: border-box;
      img {
        position: absolute;
        top: 24px;
        right: 23px;
        width: 40px;
        height: 40px;
      }
    }
  }
}

.subBtn {
  margin-top: 16px;
  width: 675px;
  height: 86px;
  background-color: #fed039;
  border-radius: 43px;
  font-size: 28px;
  color: #252525;
}
</style>