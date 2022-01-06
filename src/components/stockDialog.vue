<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="text-h5">Add Stocks</span>
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
                  :readonly="this.stockData === null ? false : true"
                  v-model="ticker"
                  @keyup="tickerChange"
                  :rules="[rules.ticker, rules.length(3), rules.required]"
                ></v-textarea>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-textarea
                  append-icon="mdi-chart-pie"
                  class="mx-2"
                  rows="1"
                  label="QUANTITY*"
                  required
                  auto-grow
                  outlined
                  row-height="15"
                  v-model="quantity"
                  :rules="[rules.number, rules.length(1), rules.required]"
                ></v-textarea>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-textarea
                  append-icon="mdi-percent-outline"
                  class="mx-2"
                  rows="1"
                  label="DIVIDEND*"
                  required
                  auto-grow
                  outlined
                  row-height="15"
                  v-model="dividend"
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
                  label="AVG. BUY PRICE*"
                  required
                  auto-grow
                  outlined
                  row-height="15"
                  v-model="avgBuyPrice"
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
  props: ["openDialog", "stockData"],
  data: () => ({
    dialog: false,
    ticker: null,
    quantity: null,
    dividend: null,
    invested: null,
    avgBuyPrice: null,
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
        this.$emit("addStock", null);
      } else {
        if (
          this.ticker !== null &&
          this.quantity !== null &&
          this.dividend !== null &&
          this.invested !== null &&
          this.avgBuyPrice !== null
        ) {
          if (
            this.ticker.match(/^[ A-Za-z_@./#&]*$/) &&
            this.quantity.match(/^[0-9.]*$/) &&
            this.invested.match(/^[0-9.]*$/) &&
            this.dividend.match(/^[0-9.]*$/) &&
            this.avgBuyPrice.match(/^[0-9.]*$/)
          ) {
            this.$emit("addStock", {
              ticker: this.ticker,
              quantity: this.quantity,
              dividend: this.dividend,
              invested: this.invested,
              avgBuyPrice: this.avgBuyPrice,
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
    stockData: function () {
      if (this.stockData !== null) {
        this.ticker = this.stockData.ticker;
        this.quantity = this.stockData.quantity;
        this.dividend = this.stockData.dividend;
        this.invested = this.stockData.invested;
        this.avgBuyPrice = this.stockData.avgBuyPrice;
      } else {
        this.ticker = null;
        this.quantity = null;
        this.dividend = null;
        this.invested = null;
        this.avgBuyPrice = null;
      }
    },
  },
};
</script>
