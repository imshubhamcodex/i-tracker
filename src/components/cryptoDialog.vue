<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="text-h5">Add cryptos</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6" md="6">
                <v-textarea
                  append-icon="mdi-ticket-outline"
                  class="mx-2"
                  rows="1"
                  label="TICKER NAME*"
                  required
                  auto-grow
                  outlined
                  row-height="15"
                  :readonly="this.cryptoData === null ? false : true"
                  v-model="ticker"
                  @keyup="tickerChange"
                  :rules="[rules.ticker, rules.length(3), rules.required]"
                ></v-textarea>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-textarea
                  append-icon="mdi-percent-outline"
                  class="mx-2"
                  rows="1"
                  label="Annual % Rate*"
                  required
                  auto-grow
                  outlined
                  row-height="15"
                  v-model="apr"
                  :rules="[rules.number, rules.length(1), rules.required]"
                ></v-textarea>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-textarea
                  append-icon="mdi-currency-inr"
                  class="mx-2"
                  rows="1"
                  label="INVESTED*"
                  required
                  auto-grow
                  outlined
                  row-height="15"
                  v-model="invested"
                  :rules="[rules.number, rules.length(1), rules.required]"
                ></v-textarea>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-textarea
                  append-icon="mdi-currency-inr"
                  class="mx-2"
                  rows="1"
                  label="Fixed Deposit*"
                  required
                  auto-grow
                  outlined
                  row-height="15"
                  v-model="fixedDeposit"
                  :rules="[rules.number, rules.length(1), rules.required]"
                ></v-textarea>
              </v-col>
            </v-row>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="closeDialog('close')">
            Close
          </v-btn>
          <v-btn color="blue darken-1" text @click="closeDialog('save')">
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  props: ["openDialog", "cryptoData"],
  data: () => ({
    dialog: false,
    ticker: null,
    apr: null,
    fixedDeposit: null,
    invested: null,
    rules: {
      ticker: (v) =>
        !!(v || "").match(/^[ A-Za-z_@./#&]*$/) || "Please enter a valid input",
      length: (len) => (v) =>
        (v || "").length >= len || `Invalid character length, required ${len}`,
      number: (v) =>
        !!(v || "").match(/^[0-9.]*$/) || "Please enter a valid input",
      required: (v) => !!v || "This field is required",
    },
  }),
  methods: {
    tickerChange() {
      this.ticker = this.ticker.toUpperCase();
    },
    closeDialog(option) {
      if (option == "close") {
        console.log("closing");
        this.$emit("addcrypto", null);
      } else {
        if (
          this.ticker !== null &&
          this.apr !== null &&
          this.fixedDeposit !== null &&
          this.invested !== null
        ) {
          if (
            this.ticker.match(/^[ A-Za-z_@./#&]*$/) &&
            this.apr.match(/^[0-9.]*$/) &&
            this.fixedDeposit.match(/^[0-9.]*$/) &&
            this.invested.match(/^[0-9.]*$/)
          ) {
            this.$emit("addcrypto", {
              ticker: this.ticker,
              apr: this.apr,
              fixedDeposit: this.fixedDeposit,
              invested: this.invested,
            });
          }
        }
      }
    },
  },

  watch: {
    openDialog: function () {
      this.dialog = !this.dialog;
    },
    cryptoData: function () {
      if (this.cryptoData !== null) {
        this.ticker = this.cryptoData.ticker;
        this.apr = this.cryptoData.apr;
        this.fixedDiposit = this.cryptoData.fixedDiposit;
        this.invested = this.cryptoData.invested;
      } else {
        this.ticker = null;
        this.apr = null;
        this.fixedDiposit = null;
        this.invested = null;
      }
    },
  },
};
</script>
