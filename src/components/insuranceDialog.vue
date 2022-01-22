<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="text-h5">Add Insurances</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6" md="6">
                <v-textarea
                  append-icon="mdi-ticket-outline"
                  class="mx-2"
                  rows="1"
                  label="NAME*"
                  required
                  auto-grow
                  outlined
                  row-height="15"
                  :readonly="this.insuranceData === null ? false : true"
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
                  label="MATURITY*"
                  required
                  auto-grow
                  outlined
                  row-height="15"
                  v-model="maturity"
                  :rules="[rules.number, rules.required]"
                ></v-textarea>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-textarea
                  append-icon="mdi-currency-inr"
                  class="mx-2"
                  rows="1"
                  label="PREMIUM*"
                  required
                  auto-grow
                  outlined
                  row-height="15"
                  v-model="premium"
                  :rules="[rules.required, rules.number]"
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
                  :rules="[rules.required, rules.number]"
                ></v-textarea>
              </v-col>
              <v-col cols="12" sm="12" md="12">
                <v-textarea
                  append-icon="mdi-currency-inr"
                  class="mx-2"
                  rows="1"
                  label="POLICY No.*"
                  required
                  auto-grow
                  outlined
                  row-height="15"
                  v-model="policy_number"
                  :rules="[rules.required]"
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
  props: ["openDialog", "insuranceData"],
  data: () => ({
    dialog: false,
    ticker: null,
    premium: null,
    invested: null,
    maturity: null,
    policy_number: null,
    rules: {
      ticker: (v) =>
        !!(v || "").match(/^[ A-Za-z_@./#&]*$/) || "Please enter a valid input",
      length: (len) => (v) =>
        (v || "").length >= len || `Invalid character length, required ${len}`,
      number: (v) =>
        !!(v || "").toString().match(/^[0-9.]*$/) ||
        "Please enter a valid input",
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
        this.$emit("addinsurance", null);
      } else {
        if (
          this.ticker !== null &&
          this.maturity !== null &&
          this.premium !== null &&
          this.invested !== null &&
          this.policy_number !== null
        ) {
          if (
            this.ticker.match(/^[ A-Za-z_@./#&]*$/) &&
            this.maturity.toString().match(/^[0-9.]*$/) &&
            this.premium.toString().match(/^[0-9.]*$/) &&
            this.invested.toString().match(/^[0-9.]*$/)
          ) {
            console.log("saving");
            this.$emit("addinsurance", {
              ticker: this.ticker,
              premium: this.premium,
              maturity: this.maturity,
              invested: this.invested,
              policy_number: this.policy_number,
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
    insuranceData: function () {
      if (this.insuranceData !== null) {
        this.ticker = this.insuranceData.ticker;
        this.premium = this.insuranceData.premium;
        this.maturity = this.insuranceData.maturity;
        this.invested = this.insuranceData.invested;
        this.policy_number = this.insuranceData.policy_number;
      } else {
        this.ticker = null;
        this.premium = null;
        this.maturity = null;
        this.invested = null;
        this.policy_number = null;
      }
    },
  },
};
</script>
