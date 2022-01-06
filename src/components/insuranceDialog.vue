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
                  label="TYPE*"
                  required
                  auto-grow
                  outlined
                  row-height="15"
                  v-model="type"
                  :rules="[rules.ticker, rules.length(3), rules.required]"
                ></v-textarea>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-textarea
                  append-icon="mdi-percent-outline"
                  class="mx-2"
                  rows="1"
                  label="PREMIUM*"
                  required
                  auto-grow
                  outlined
                  row-height="15"
                  v-model="premium"
                  :rules="[rules.length(1), rules.required, rules.number]"
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
                  :rules="[rules.length(2), rules.required, rules.number]"
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
    type: null,
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
        this.$emit("addinsurance", null);
      } else {
        if (
          this.ticker !== null &&
          this.type !== null &&
          this.premium !== null &&
          this.invested !== null
        ) {
          if (
            this.ticker.match(/^[ A-Za-z_@./#&]*$/) &&
            this.type.match(/^[ A-Za-z_@./#&]*$/) &&
            this.premium.match(/^[0-9.]*$/) &&
            this.invested.match(/^[0-9.]*$/)
          ) {
            console.log("saving");
            this.$emit("addinsurance", {
              ticker: this.ticker,
              premium: this.premium,
              type: this.type,
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
    insuranceData: function () {
      if (this.insuranceData !== null) {
        this.ticker = this.insuranceData.ticker;
        this.premium = this.insuranceData.premium;
        this.type = this.insuranceData.type;
        this.invested = this.insuranceData.invested;
      } else {
        this.ticker = null;
        this.premium = null;
        this.type = null;
        this.invested = null;
      }
    },
  },
};
</script>
