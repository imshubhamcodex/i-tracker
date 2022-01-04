<template>
  <v-app>
    <div id="app">
      <router-view />
    </div>
  </v-app>
</template>
<script>
export default {
  created() {
    // Set the correct theme based on the current dark mode
    if (localStorage.getItem("theme") == "dark") {
      this.$vuetify.theme.dark = true;
    } else {
      this.$vuetify.theme.light = true;
    }
  },
  watch: {
    "$vuetify.theme.dark": function (val) {
      if (val) {
        localStorage.setItem("theme", "dark");
      } else {
        localStorage.setItem("theme", "light");
      }
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
