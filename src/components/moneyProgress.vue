<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="300px">
      <v-card>
        <v-card-title>
          <span class="text-h5">Money</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="12" md="12">
                <v-textarea
                  append-icon="mdi-currency-inr"
                  class="mx-2"
                  rows="1"
                  label="Target*"
                  required
                  auto-grow
                  outlined
                  row-height="15"
                  v-model="money_target"
                  :rules="[rules.required, rules.number]"
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
  props: ["openDialogMoney"],
  data: () => ({
    dialog: false,
    money_target: 0,
    rules: {
      number: (v) =>
        !!(v || "").toString().match(/^[0-9.]*$/) ||
        "Please enter a valid input",
      required: (v) => !!v || "This field is required",
    },
  }),
  methods: {
    closeDialog(option) {
      if (option == "close") {
        console.log("closing");
        this.$emit("editMoneyProgress", null);
      } else {
        console.log("saving");
        this.$emit("editMoneyProgress", {
          money_target: Number(this.money_target),
        });
      }
    },
  },
  watch: {
    openDialogMoney: function () {
      this.dialog = !this.dialog;
    },
  },
};
</script>
