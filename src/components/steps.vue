<template>
  <div class="steps">
    <div class="dot"></div>

    <p class="content van-ellipsis">
      <slot></slot>
    </p>
  </div>
</template>
<script>
export default {
  name: "steps",
  methods: {}
};
</script>
<style scoped lang="scss">
.steps {
  display: flex;
  align-items: center;
  height: 22px;
  margin-bottom: 30px;
  background-color: #fff;
  .dot {
    width: 16px;
    height: 16px;
    background-color: #bbb;
    border-radius: 50%;
    margin-right: 12px;
    transform: scale(0.8);
  }
  .content {
    font-size: 22px;
    font-family: Hiragino Sans GB;
    font-weight: normal;
    color: rgba(82, 82, 82, 1);
  }
}
</style>