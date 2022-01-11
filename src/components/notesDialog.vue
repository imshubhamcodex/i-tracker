<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="800px">
      <v-card>
        <v-card-title>
          <span class="text-h5">Add notes</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="12" md="12">
                <v-textarea
                  append-icon="mdi-ticket-outline"
                  class="mx-2"
                  rows="1"
                  label="TITLE*"
                  required
                  auto-grow
                  outlined
                  row-height="15"
                  :readonly="this.noteData === null ? false : true"
                  v-model="title"
                  @keyup="titleChange"
                  :rules="[rules.title, rules.length(3), rules.required]"
                ></v-textarea>
              </v-col>
              <v-col cols="12" sm="12" md="12">
                <v-textarea
                  append-icon="mdi-chart-pie"
                  class="mx-2"
                  rows="1"
                  label="BODY*"
                  required
                  auto-grow
                  outlined
                  row-height="15"
                  v-model="body"
                  :rules="[rules.required]"
                ></v-textarea>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-textarea
                  append-icon="mdi-account"
                  class="mx-2"
                  rows="1"
                  label="SOURCE*"
                  required
                  auto-grow
                  outlined
                  row-height="15"
                  v-model="source"
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
  props: ["openDialog", "noteData"],
  data: () => ({
    dialog: false,
    title: null,
    source: null,
    body: null,
    rules: {
      title: (v) =>
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
    titleChange() {
      this.title = this.title.toUpperCase();
    },
    closeDialog(option) {
      if (option == "close") {
        console.log("closing");
        this.$emit("addnote", null);
      } else {
        if (this.title !== null && this.body !== null && this.source !== null) {
          if (
            this.title.match(/^[ A-Za-z_@./#&]*$/) &&
            this.source.match(/^[ A-Za-z_@./#&]*$/)
          ) {
            console.log("saving");
            this.$emit("addnote", {
              title: this.title,
              body: this.body,
              source: this.source,
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
    noteData: function () {
      if (this.noteData !== null) {
        this.title = this.noteData.title;
        this.body = this.noteData.body;
        this.source = this.noteData.source;
      } else {
        this.title = null;
        this.body = null;
        this.source = null;
      }
    },
  },
};
</script>
