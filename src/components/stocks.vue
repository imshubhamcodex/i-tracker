<template>
  <div>
    <div style="margin-bottom: 30px">
      <v-row>
        <v-col cols="12" md="2">
          <span class="title ml-3 mr-5"> STOCKS&nbsp; </span>
        </v-col>
      </v-row>
      <div id="stock-add-button">
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
      <div id="stock-search-box">
        <v-textarea
          append-icon="mdi-book-search-outline"
          class="mx-2"
          label="Search stocks"
          rows="1"
          outlined
          :auto-grow="false"
          row-height="10"
          v-model="searchQuery"
          @keyup="searchStock"
          :rules="[rules.ticker]"
        ></v-textarea>
      </div>
    </div>
    <div id="stock-div">
      <v-row>
        <v-col
          v-for="(stock, index) in updatedStockList"
          :key="stock.ticker + index"
          cols="12"
          md="4"
        >
          <v-card
            class="stock-cards"
            max-width="344"
            outlined
            elevation="2"
            shaped
          >
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title class="text-h6 mb-1">
                  <span class="text-h6">{{ stock.ticker }}</span>
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
                    <v-col cols="4" md="4">
                      <p class="overline">QUANTITY</p>
                      <p class="font-weight-bold">{{ stock.quantity }}</p>
                    </v-col>
                    <v-col cols="4" md="4">
                      <p class="overline">DIVIDEND</p>
                      <p class="font-weight-bold">{{ stock.dividend }}</p>
                    </v-col>
                    <v-col cols="4" md="4">
                      <p class="overline">INVESTED</p>
                      <p class="font-weight-bold">{{ stock.invested }}</p>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="6" md="6">
                      <p class="overline">AVG. BUY PRICE</p>
                      <p class="font-weight-bold">{{ stock.avgBuyPrice }}</p>
                    </v-col>
                    <v-col cols="6" md="6">
                      <p class="overline">Portfolio Wt.</p>
                      <span class="font-weight-bold">
                        {{
                          (
                            (Number(stock.invested) * 100) /
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
                          (Number(stock.invested) * 100) / Number(totalInvested)
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
                @click="deleteStock(stock)"
              >
                <v-icon dark> mdi-delete </v-icon>
              </v-btn>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </div>
    <stockDialog
      :openDialog="openDialog"
      :stockData="stockData"
      @addStock="closeBox"
    />
  </div>
  <!-- use grid and card box modal also put option to add stocks-->
</template>

<script>
import gsap from "gsap";
import stockDialog from "../components/stockDialog.vue";
export default {
  components: {
    stockDialog,
  },
  data: () => ({
    openDialog: false,
    rules: {
      ticker: (v) =>
        !!(v || "").match(/^[ A-Za-z_@./#&]*$/) ||
        "Please enter a valid ticker",
    },
    totalInvested: 0,
    searchQuery: null,
    stockData: null,
    updatedStockList: [],
    stocks: [],
  }),
  methods: {
    deleteStock(payload) {
      this.$store.commit("deleteStock", payload);
      this.calcTotalInv();
      this.updatedStockList = this.$store.state.stocks;
      this.stocks = this.$store.state.stocks;
    },
    closeBox(payload) {
      if (payload !== null) {
        // this.updatedStockList = this.updatedStockList.filter((stock) => {
        //   return stock.ticker !== payload.ticker;
        // });
        // this.updatedStockList.unshift(payload);
        // this.stocks = this.stocks.filter((stock) => {
        //   return stock.ticker !== payload.ticker;
        // });
        // this.stocks.unshift(payload);

        this.$store.commit("addStocks", payload);
        this.calcTotalInv();
        this.updatedStockList = this.$store.state.stocks;
        this.stocks = this.$store.state.stocks;
      }
      this.openDialog = false;
    },
    openBox(option, index) {
      if (option === "add") {
        this.openDialog = true;
        this.stockData = null;
      } else if (option === "edit") {
        this.stockData = this.updatedStockList[index];
        this.openDialog = true;
      }
    },
    searchStock() {
      this.updatedStockList = this.stocks.filter((stock) => {
        return stock.ticker
          .toLowerCase()
          .includes(this.searchQuery.toLowerCase());
      });

      if (this.updatedStockList.length === 0) {
        this.updatedStockList = this.stocks;
      }
    },
    calcTotalInv() {
      this.totalInvested = 0;
      this.$store.state.stocks.forEach((stock) => {
        this.totalInvested += Number(stock.invested);
      });
    },
  },
  mounted() {
    this.stocks = this.$store.state.stocks;
    this.updatedStockList = this.stocks;
    this.calcTotalInv();

    let tl = gsap.timeline();

    tl.fromTo(
      "#stock-add-button",
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
      ".stock-cards",
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

#stock-div {
  margin-top: 50px;
  margin-left: 16px;
}
#stock-search-box {
  width: 320px;
  float: right;
  margin-top: -40px;
  margin-right: 30px;
}
#stock-add-button {
  float: right;
  margin-right: 90px;
  margin-top: -30px;
}

@media (max-width: 420px) {
  #stock-div {
    width: 330px;
    margin-left: 12px;
  }
  #stock-search-box {
    width: 200px;
    margin-top: -40px;
    margin-right: 10px;
  }
  #stock-add-button {
    margin-right: -10px;
    margin-top: -30px;
  }
}

@media (max-width: 370px) {
  #stock-div {
    width: 288px;
    margin-left: 6px;
  }
  #stock-search-box {
    width: 150px;
    margin-top: -40px;
    margin-right: 10px;
  }
}
</style>
