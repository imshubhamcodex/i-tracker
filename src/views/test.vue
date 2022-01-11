<template>
  <v-app>
    <v-app-bar app clipped-left>
      <v-app-bar-nav-icon @click="mini = !mini"></v-app-bar-nav-icon>
      <span class="title ml-3 mr-5"> FinTech&nbsp; </span>
      <v-spacer></v-spacer>

      <v-row align="center" justify="center">
        <v-col cols="12" sm="12" md="12">
          <div id="toggler">
            <v-switch
              v-model="$vuetify.theme.dark"
              hint=""
              inset
              label="Night Mode"
              persistent-hint
            ></v-switch>
          </div>
        </v-col>
      </v-row>
    </v-app-bar>

    <template>
      <v-card>
        <v-navigation-drawer
          v-model="drawer"
          :mini-variant.sync="mini"
          app
          clipped
          permanent
        >
          <v-list-item class="px-2">
            <v-list-item-avatar>
              <v-img
                src="https://randomuser.me/api/portraits/men/85.jpg"
              ></v-img>
            </v-list-item-avatar>

            <v-list-item-title style="font-family: 'Roboto'"
              >Gaurav Kumar</v-list-item-title
            >

            <v-btn icon @click.stop="mini = !mini">
              <v-icon>mdi-chevron-left</v-icon>
            </v-btn>
          </v-list-item>

          <v-divider></v-divider>

          <v-list dense>
            <v-list-item
              style="margin-top: 15px"
              v-for="item in items"
              :key="item.title"
              link
            >
              <v-list-item-icon @click="openSection(item.title)">
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-item-icon>

              <v-list-item-content @click="openSection(item.title)">
                <v-list-item-title style="font-family: 'Roboto'">{{
                  item.title
                }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-navigation-drawer>
      </v-card>
    </template>
    <v-main id="main-div" style="width: 100%">
      <overview v-if="overview" id="overview-comp" class="mt-4 pb-6" />
      <stocks v-if="stocks" id="stock-comp" class="mt-4 pb-6" />
      <cryptos v-if="cryptos" id="crypto-comp" class="mt-4 pb-6" />
      <insurances v-if="insurances" id="insurances-comp" class="mt-4 pb-6" />
      <notes v-if="notes" id="notes-comp" class="mt-4 pb-6" />
    </v-main>
  </v-app>
</template>
<script>
import overview from "../components/overview.vue";
import stocks from "../components/stocks.vue";
import cryptos from "../components/cryptos.vue";
import insurances from "../components/insurances.vue";
import notes from "../components/notes.vue";
export default {
  components: {
    stocks,
    cryptos,
    insurances,
    overview,
    notes,
  },
  data() {
    return {
      drawer: true,
      overview: true,
      stocks: false,
      cryptos: false,
      insurances: false,
      notes: false,
      items: [
        { title: "OVERVIEW", icon: "mdi-chart-pie" },
        { title: "STOCKS", icon: "mdi-briefcase" },
        { title: "CRYPTO", icon: "mdi-bitcoin" },
        { title: "INSURANCE", icon: "mdi-medical-bag" },
        { title: "NOTES", icon: "mdi-note-multiple" },
      ],
      mini: true,
    };
  },
  methods: {
    openSection(section) {
      this.mini = true;
      if (section === "OVERVIEW") {
        this.overview = true;
        this.stocks = false;
        this.cryptos = false;
        this.insurances = false;
        this.notes = false;
      } else if (section === "STOCKS") {
        this.overview = false;
        this.stocks = true;
        this.cryptos = false;
        this.insurances = false;
        this.notes = false;
      } else if (section === "CRYPTO") {
        this.overview = false;
        this.stocks = false;
        this.cryptos = true;
        this.insurances = false;
        this.notes = false;
      } else if (section === "INSURANCE") {
        this.overview = false;
        this.stocks = false;
        this.cryptos = false;
        this.insurances = true;
        this.notes = false;
      } else if (section === "NOTES") {
        this.overview = false;
        this.stocks = false;
        this.cryptos = false;
        this.insurances = false;
        this.notes = true;
      }
    },
  },
};
</script>

<style scoped>
#toggler {
  float: right;
  zoom: 0.8;
  margin-top: 20px;
}
#stock-comp,
#crypto-comp,
#insurances-comp,
#overview-comp,
#notes-comp {
  width: 100vw;
}

@media (max-width: 992px) {
  #stock-comp,
  #crypto-comp,
  #insurances-comp,
  #overview-comp,
  #notes-comp {
    width: 80vw;
  }
}
</style>
