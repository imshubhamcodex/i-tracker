<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="290">
      <v-card>
        <v-card-title class="text-h5"> Invested money </v-card-title>

        <v-container>
          <v-row>
            <v-col cols="12" sm="12" md="12">
              <v-textarea
                append-icon="mdi-currency-inr"
                class="mx-2"
                rows="1"
                label="STOCKS"
                required
                auto-grow
                outlined
                row-height="15"
                v-model="stocks_invested"
                readonly
              ></v-textarea>
            </v-col>
            <v-col cols="12" sm="12" md="12">
              <v-textarea
                append-icon="mdi-currency-inr"
                class="mx-2"
                rows="1"
                label="CRYPTOS"
                required
                auto-grow
                outlined
                row-height="15"
                v-model="crypto_invested"
                readonly
              ></v-textarea>
            </v-col>
            <v-col cols="12" sm="12" md="12">
              <v-textarea
                append-icon="mdi-currency-inr"
                class="mx-2"
                rows="1"
                label="INSURANCES"
                required
                auto-grow
                outlined
                row-height="15"
                v-model="insurance_invested"
                readonly
              ></v-textarea>
            </v-col>
          </v-row>
        </v-container>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn color="green darken-1" text @click="closeDialog">
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  props: [
    "openInvestedDialog",
    "stocks_invested",
    "crypto_invested",
    "insurance_invested",
  ],
  data: () => ({
    dialog: false,
    money: 0,
  }),
  methods: {
    closeDialog() {
      this.$emit("closeInvestedDialog");
    },
  },
  watch: {
    openInvestedDialog: function () {
      this.dialog = !this.dialog;
    },
  },
};
</script>
