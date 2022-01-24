<template>
  <div>
    <div
      class="ma-auto"
      style="
        min-width: 250px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      "
    >
      <v-otp-input
        v-model="otp"
        :disabled="loading"
        @finish="onFinish"
        type="password"
      ></v-otp-input>
      <v-overlay absolute :value="loading">
        <v-progress-circular
          indeterminate
          color="primary"
        ></v-progress-circular>
      </v-overlay>
    </div>

    <v-snackbar v-model="snackbar" :color="snackbarColor" :timeout="2000">
      {{ text }}
    </v-snackbar>
  </div>
</template>

<script>
import { db } from "../firebase.js";
export default {
  data: () => ({
    loading: false,
    snackbar: false,
    snackbarColor: "default",
    otp: "",
    text: "",
    expectedOtp: "133707",
  }),
  methods: {
    async onFinish() {
      this.loading = true;

      await db
        .collection("passkey")
        .doc("key_data")
        .get()
        .then((doc) => {
          this.loading = false;
          if (doc.data().key === this.otp) {
            this.$router.push("/loading");
          } else {
            this.snackbarColor = "error";
            this.text = "Wrong Passkey";
            this.snackbar = true;
          }
        });
    },
  },
};
</script>
<style scoped>
.position-relative {
  position: relative;
}
</style>
