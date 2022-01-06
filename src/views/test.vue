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
              <v-list-item-icon>
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-item-icon>

              <v-list-item-content>
                <v-list-item-title style="font-family: 'Roboto'">{{
                  item.title
                }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-navigation-drawer>
      </v-card>
    </template>
    <v-main style="width: 100%">
      <stocks v-if="false" id="stock-comp" class="mt-4 pb-6" />
      <cryptos v-if="false" id="crypto-comp" class="mt-4 pb-6" />
      <insurances v-if="true" id="crypto-comp" class="mt-4 pb-6" />
    </v-main>
  </v-app>
</template>
<script>
import stocks from "../components/stocks.vue";
import cryptos from "../components/cryptos.vue";
import insurances from "../components/insurances.vue";
export default {
  components: {
    stocks,
    cryptos,
    insurances
  },
  data() {
    return {
      drawer: true,
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
};
</script>

<style scoped>
#toggler {
  float: right;
  zoom: 0.8;
  margin-top: 20px;
}
#stock-comp,
#crypto-comp {
  width: 100vw;
}

@media (max-width: 992px) {
  #stock-comp,
  #crypto-comp {
    width: 80vw;
  }
}
</style>
