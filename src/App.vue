<template>
  <v-app>
    <div id="app">
      <router-view />
    </div>
  </v-app>
</template>
<script>
import { db } from "./firebase";
export default {
  created() {
    // Set the correct theme based on the current dark mode
    if (localStorage.getItem("theme") == "dark") {
      this.$vuetify.theme.dark = true;
    } else {
      this.$vuetify.theme.light = true;
    }

    //Set store state
    db.collection("stocks")
      .doc("stocks_info")
      .get()
      .then((doc) => {
        this.$store.commit("setStocks", doc.data().stocks);
      });

    db.collection("cryptos")
      .doc("cryptos_info")
      .get()
      .then((doc) => {
        this.$store.commit("setCryptos", doc.data().cryptos);
      });

    db.collection("insurances")
      .doc("insurances_info")
      .get()
      .then((doc) => {
        this.$store.commit("setInsurances", doc.data().insurances);
      });

    db.collection("notes")
      .doc("notes_info")
      .get()
      .then((doc) => {
        this.$store.commit("setNotes", doc.data().notes);
      });

    db.collection("walletMoney")
      .doc("walletMoney_info")
      .get()
      .then((doc) => {
        this.$store.commit("setWalletMoney", doc.data().walletMoney);
      });

    db.collection("targetMoney")
      .doc("targetMoney_info")
      .get()
      .then((doc) => {
        this.$store.commit("setTargetMoney", doc.data().targetMoney);
      });

      db.collection("investedTrend")
      .doc("investedTrend_info")
      .get()
      .then((doc) => {
        this.$store.commit("setInvestedTrend", doc.data().investedTrend);
      });
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
