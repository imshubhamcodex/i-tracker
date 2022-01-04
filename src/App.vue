<template>
  <v-app>
    <div id="app">
      <router-view />
      <div id="toggler">
        <v-switch
          v-model="$vuetify.theme.dark"
          hint="Vuetify theme"
          inset
          label="Vuetify Theme Dark"
          persistent-hint
        ></v-switch>
      </div>
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
  text-align: center;
}

#toggler {
  position: absolute;
  top: 0;
  left: 20px;
}
</style>
