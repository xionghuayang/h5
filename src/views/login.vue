<template>
  <div>
    <HelloWorld></HelloWorld>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "Home",
  components: {
    HelloWorld
  },
  created() {},
  mounted() {
    this.$toast("???????");
  },
  methods: {}
};
</script>

<style lang="sass">
</style>