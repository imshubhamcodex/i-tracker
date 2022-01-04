<template>
  <div class="home">
    <loader class="load" />
  </div>
</template>

<script>
import loader from "../components/loader.vue";
export default {
  components: {
    loader,
  },
};
// @ is an alias to /src
</script>

<style scoped>
.load {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
</style>
