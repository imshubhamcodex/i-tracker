<template>
  <div>
    <div style="margin-bottom: 30px">
      <v-row>
        <v-col cols="12" md="2">
          <span class="title ml-3 mr-5"> Notes&nbsp; </span>
        </v-col>
      </v-row>
      <div id="note-add-button">
        <v-btn
          @click="openBox('add', -1)"
          style="zoom: 0.8"
          fab
          dark
          small
          color="teal"
        >
          <v-icon dark> mdi-plus </v-icon>
        </v-btn>
      </div>
      <div id="note-search-box">
        <v-textarea
          append-icon="mdi-book-search-outline"
          class="mx-2"
          label="Search notes"
          rows="1"
          outlined
          :auto-grow="false"
          row-height="10"
          :rules="[rules.title]"
          v-model="searchQuery"
          @keyup="searchnote"
        ></v-textarea>
      </div>
    </div>
    <div id="note-div">
      <v-row>
        <v-col
          v-for="(note, index) in updatednoteList"
          :key="note.title + index"
          cols="12"
          md="4"
        >
          <v-card
            class="note-cards"
            max-width="344"
            outlined
            elevation="2"
            note-cards
            shaped
          >
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title class="text-h6 mb-1">
                  <span class="text-h6">{{ note.title }}</span>
                  <span
                    class="subtitle-2 text--secondary mt-n1 overline"
                    style="float: right"
                    ><v-icon
                      color="green"
                      small
                      style="zoom: 0.5; margin-right: 10px"
                      >mdi-checkbox-blank-circle </v-icon
                    >{{ note.date }}</span
                  >
                </v-list-item-title>
                <v-list-item-subtitle class="pt-5">
                  <v-row>
                    <v-col cols="12" md="12">
                      <p class="overline">body</p>
                      <v-textarea
                        v-model="note.body"
                        row-height="10"
                        readonly
                      ></v-textarea>
                    </v-col>
                    <v-col cols="12" md="12">
                      <p class="overline">source</p>
                      <p class="text--secondary">{{ note.source }}</p>
                    </v-col>
                  </v-row>
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>

            <div style="width: 100%" class="pb-3 pl-4 pr-4">
              <v-btn
                class="mx-2"
                fab
                dark
                small
                color="green"
                style="zoom: 0.8"
                @click="openBox('edit', index)"
              >
                <v-icon dark> mdi-pencil </v-icon>
              </v-btn>
              <v-btn
                class="mx-2"
                fab
                dark
                small
                color="red"
                style="float: right; zoom: 0.8"
                @click="deleteNote(note)"
              >
                <v-icon dark> mdi-delete </v-icon>
              </v-btn>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </div>
    <noteDialog
      :openDialog="openDialog"
      :noteData="noteData"
      @addnote="closeBox"
    />
  </div>
  <!-- use grid and card box modal also put option to add notes-->
</template>

<script>
import gsap from "gsap";
import noteDialog from "./notesDialog.vue";
export default {
  components: {
    noteDialog,
  },
  data: () => ({
    openDialog: false,
    rules: {
      title: (v) =>
        !!(v || "").match(/^[ A-Za-z_@./#&]*$/) || "Please enter a valid title",
    },
    totalsource: 100000,
    searchQuery: null,
    noteData: null,
    updatednoteList: [],
    notes: [],
  }),
  methods: {
    deleteNote(payload) {
      this.$store.commit("deleteNote", payload);
      this.notes = this.$store.state.notes;
      this.updatednoteList = this.notes;
    },
    closeBox(payload) {
      if (payload !== null) {
        // this.updatednoteList = this.updatednoteList.filter((note) => {
        //   return note.title !== payload.title;
        // });
        // this.updatednoteList.unshift(payload);
        // this.notes = this.notes.filter((note) => {
        //   return note.title !== payload.title;
        // });
        // this.notes.unshift(payload);
        this.$store.commit("addNotes", payload);
        this.notes = this.$store.state.notes;
        this.updatednoteList = this.notes;
      }
      this.openDialog = false;
    },
    openBox(option, index) {
      if (option === "add") {
        this.openDialog = true;
        this.noteData = null;
      } else if (option === "edit") {
        this.noteData = this.updatednoteList[index];
        this.openDialog = true;
      }
    },
    searchnote() {
      this.updatednoteList = this.notes.filter((note) => {
        return note.title
          .toLowerCase()
          .includes(this.searchQuery.toLowerCase());
      });

      if (this.updatednoteList.length === 0) {
        this.updatednoteList = this.notes;
      }
    },
  },
  mounted() {
    this.notes = this.$store.state.notes;
    this.updatednoteList = this.notes;

    let tl = gsap.timeline();

    tl.fromTo(
      "#note-add-button",
      {
        duration: 1,
        scale: 0,
        rotation: 0,
        opacity: 0,
        ease: "power3.inOut",
      },
      { duration: 1, scale: 1, rotation: 360, opacity: 1, ease: "power3.inOut" }
    );
  },
  updated() {
    let tl = gsap.timeline();
    tl.fromTo(
      ".note-cards",
      {
        duration: 1,
        opacity: 0,
        ease: "power3.inOut",
        scale: 1.06,
      },
      { duration: 1, scale: 1, opacity: 1, ease: "power3.inOut", stagger: 0.1 }
    );
  },
};
</script>

<style scoped>
.v-progress-circular {
  margin: 1rem;
}

#note-div {
  margin-top: 50px;
  margin-left: 16px;
}
#note-search-box {
  width: 320px;
  float: right;
  margin-top: -40px;
  margin-right: 30px;
}
#note-add-button {
  float: right;
  margin-right: 90px;
  margin-top: -30px;
}

@media (max-width: 420px) {
  #note-div {
    width: 330px;
    margin-left: 12px;
  }
  #note-search-box {
    width: 160px;
    margin-top: -40px;
    margin-right: 5px;
  }
  #note-add-button {
    margin-right: -10px;
    margin-top: -30px;
  }
}

@media (max-width: 370px) {
  #note-div {
    width: 288px;
    margin-left: 6px;
  }
  #note-search-box {
    width: 130px;
    margin-top: -40px;
    margin-right: 0px;
  }
}
</style>
