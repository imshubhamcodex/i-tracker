<template>
  <div>
    <div style="margin-bottom: 30px">
      <v-row>
        <v-col cols="12" md="2">
          <span class="title ml-3 mr-5"> CRYPTOS&nbsp; </span>
        </v-col>
      </v-row>
      <div id="crypto-add-button">
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
      <div id="crypto-search-box">
        <v-textarea
          append-icon="mdi-book-search-outline"
          class="mx-2"
          label="Search cryptos"
          rows="1"
          outlined
          :auto-grow="false"
          row-height="10"
          v-model="searchQuery"
          @keyup="searchcrypto"
          :rules="[rules.ticker]"
        ></v-textarea>
      </div>
    </div>
    <div id="crypto-div">
      <v-row>
        <v-col
          v-for="(crypto, index) in updatedcryptoList"
          :key="crypto.ticker + index"
          cols="12"
          md="4"
        >
          <v-card
            class="crypto-cards"
            max-width="344"
            outlined
            elevation="2"
            shaped
          >
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title class="text-h6 mb-1">
                  <span class="text-h6">{{ crypto.ticker }}</span>
                  <span
                    class="subtitle-2 text--secondary mt-n1 overline"
                    style="float: right"
                    ><v-icon
                      color="green"
                      small
                      style="zoom: 0.5; margin-right: 10px"
                      >mdi-checkbox-blank-circle </v-icon
                    >{{
                      new Date().toLocaleDateString().replaceAll("/", "-")
                    }}</span
                  >
                </v-list-item-title>
                <v-list-item-subtitle class="pt-5">
                  <v-row>
                    <v-col cols="6" md="6">
                      <p class="overline">Annual % Rate</p>
                      <p class="font-weight-bold">{{ crypto.apr }}</p>
                    </v-col>

                    <v-col cols="6" md="6">
                      <p class="overline">FIXED DEPOSIT</p>
                      <p class="font-weight-bold">{{ crypto.fixedDeposit }}</p>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="6" md="6">
                      <p class="overline">INVESTED</p>
                      <p class="font-weight-bold">{{ crypto.invested }}</p>
                    </v-col>
                    <v-col cols="6" md="6">
                      <p class="overline">Portfolio Wt.</p>
                      <span class="font-weight-bold">
                        {{
                          (
                            (Number(crypto.invested) * 100) /
                            Number(totalInvested)
                          ).toFixed(1)
                        }}
                        %
                      </span>
                      <v-progress-linear
                        color="light-blue"
                        height="10"
                        :size="10"
                        :value="
                          (Number(crypto.invested) * 100) /
                          Number(totalInvested)
                        "
                        striped
                        rounded
                        style="
                          width: 57px;
                          float: right;
                          margin-top: 2px;
                          margin-right: 35px;
                        "
                      >
                      </v-progress-linear>
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
              >
                <v-icon dark> mdi-delete </v-icon>
              </v-btn>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </div>
    <cryptoDialog
      :openDialog="openDialog"
      :cryptoData="cryptoData"
      @addcrypto="closeBox"
    />
  </div>
  <!-- use grid and card box modal also put option to add cryptos-->
</template>

<script>
import gsap from "gsap";
import cryptoDialog from "./cryptoDialog.vue";
export default {
  components: {
    cryptoDialog,
  },
  data: () => ({
    openDialog: false,
    rules: {
      ticker: (v) =>
        !!(v || "").match(/^[ A-Za-z_@./#&]*$/) ||
        "Please enter a valid ticker",
    },
    totalInvested: 100000,
    searchQuery: null,
    cryptoData: null,
    updatedcryptoList: [],
    cryptos: [
      {
        ticker: "BTC",
        apr: 130,
        invested: 130,
        fixedDeposit: 0,
      },
      {
        ticker: "BTC",
        apr: 130,
        invested: 130,
        fixedDeposit: 0,
      },
      {
        ticker: "BTC",
        apr: 130,
        invested: 130,
        fixedDeposit: 0,
      },
      {
        ticker: "BTC",
        apr: 130,
        invested: 130,
        fixedDeposit: 0,
      },
      {
        ticker: "BTC",
        apr: 130,
        invested: 130,
        fixedDeposit: 0,
      },
    ],
  }),
  methods: {
    closeBox(payload) {
      if (payload !== null) {
        this.updatedcryptoList = this.updatedcryptoList.filter((crypto) => {
          return crypto.ticker !== payload.ticker;
        });
        this.updatedcryptoList.unshift(payload);
        this.cryptos = this.cryptos.filter((crypto) => {
          return crypto.ticker !== payload.ticker;
        });
        this.cryptos.unshift(payload);
      }
      this.openDialog = false;
    },
    openBox(option, index) {
      if (option === "add") {
        this.openDialog = true;
        this.cryptoData = null;
      } else if (option === "edit") {
        this.cryptoData = this.updatedcryptoList[index];
        this.openDialog = true;
      }
    },
    searchcrypto() {
      this.updatedcryptoList = this.cryptos.filter((crypto) => {
        return crypto.ticker
          .toLowerCase()
          .includes(this.searchQuery.toLowerCase());
      });

      if (this.updatedcryptoList.length === 0) {
        this.updatedcryptoList = this.cryptos;
      }
    },
  },
  mounted() {
    this.updatedcryptoList = this.cryptos;

    let tl = gsap.timeline();

    tl.fromTo(
      "#crypto-add-button",
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
      ".crypto-cards",
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

#crypto-div {
  margin-top: 50px;
  margin-left: 16px;
}
#crypto-search-box {
  width: 320px;
  float: right;
  margin-top: -40px;
  margin-right: 30px;
}
#crypto-add-button {
  float: right;
  margin-right: 90px;
  margin-top: -30px;
}

@media (max-width: 420px) {
  #crypto-div {
    width: 330px;
    margin-left: 12px;
  }
  #crypto-search-box {
    width: 180px;
    margin-top: -40px;
    margin-right: 10px;
  }
  #crypto-add-button {
    margin-right: -10px;
    margin-top: -30px;
  }
}

@media (max-width: 370px) {
  #crypto-div {
    width: 288px;
    margin-left: 9px;
  }
  #crypto-search-box {
    width: 150px;
    margin-top: -40px;
    margin-right: 10px;
  }
}
</style>
