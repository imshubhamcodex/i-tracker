<template>
  <div id="parent-div" style="width: 96%">
    <v-row>
      <v-col cols="12" md="6" class="pl-5">
        <div style="display: flex" @click="openInvestedDialogBox">
          <div>
            <v-btn
              elevation="0"
              style="background-color: rgba(0, 255, 255, 0.1)"
              fab
            >
              <v-icon style="color: cyan">mdi-wallet</v-icon>
            </v-btn>
          </div>
          <div>
            <p class="ml-4 text-button">Invested amount</p>
            <h2 class="mt-n5 ml-4 text-subtitle-2">₹ {{ all_invested }}</h2>
          </div>
        </div>
      </v-col>
      <v-col cols="12" md="6" class="pl-5">
        <div @click="openBox" style="display: flex" id="wallet-div">
          <div>
            <v-btn
              elevation="0"
              style="background-color: rgba(255, 0, 0, 0.1)"
              fab
            >
              <v-icon style="color: red">mdi-wallet</v-icon>
            </v-btn>
          </div>
          <div>
            <p class="ml-4 text-button">Wallet amount</p>
            <h2 class="mt-n5 ml-4 text-subtitle-2">
              ₹ {{ this.$store.state.walletMoney }}
            </h2>
          </div>
        </div>
      </v-col>
    </v-row>
    <br />
    <div class="" id="invest-trend-div">
      <canvas id="investement-trend" height="270"></canvas>
    </div>
    <br />
    <br />
    <div>
      <v-row>
        <v-col cols="12" md="3">
          <canvas id="investement-trend1" height="220"></canvas>
        </v-col>
        <v-col cols="12" md="3">
          <canvas id="investement-trend2" height="220"></canvas>
        </v-col>
        <v-col cols="12" md="3">
          <canvas id="investement-trend3" height="220"></canvas>
        </v-col>
        <v-col cols="12" md="3">
          <canvas
            @click="openMoneyBox"
            id="investement-trend4"
            height="220"
          ></canvas>
        </v-col>
      </v-row>
    </div>
    <wallet :openDialog="openDialog" @editWalletMoney="closeBox" />
    <!-- modal to edit wallet money-->
    <editMoneyProgress
      :openDialogMoney="openDialogMoney"
      @editMoneyProgress="closeMoneyBox"
    /><!-- modal to edit progress bar-->
    <InvestedDialog
      :openInvestedDialog="openInvestedDialog"
      :stocks_invested="stocks_invested"
      :crypto_invested="crypto_invested"
      :insurance_invested="insurance_invested"
      @closeInvestedDialog="closeInvestedDialog"
    />
  </div>
</template>

<script>
import Chart from "chart.js/auto";
import wallet from "./wallet.vue";
import editMoneyProgress from "./moneyProgress.vue";
import InvestedDialog from "./investedDialog.vue";
export default {
  components: {
    wallet,
    editMoneyProgress,
    InvestedDialog,
  },
  data() {
    return {
      openInvestedDialog: false,
      openDialog: false,
      openDialogMoney: false,
      wallet_money: 0,
      total_money: 0,
      progress: null,
      all_invested: 0,
      stocks_invested: 0,
      crypto_invested: 0,
      insurance_invested: 0,
      stocks_len:0,
      crypto_len:0,
      colorArr: [
        "#4a5355",
        "#ccc2c7",
        "#8dabba",
        "#1b5776",
        "#f0abcb",
        "#2ca388",
        "#7fa0f4",
        "#ff80ed",
        "#bb1587",
        "#7bf600",
        "#0488d0",
        "#d5a6bd",
        "#510a60",
        "#110a60",
        "#ffa54c",
        "#b87e7e",
        "cyan",
        "red",
        "blue",
        "green",
        "yellow",
        "purple",
        "orange",
        "pink",
      ],
    };
  },
  methods: {
    openInvestedDialogBox() {
      this.openInvestedDialog = true;
    },
    closeInvestedDialog() {
      this.openInvestedDialog = false;
    },
    closeMoneyBox(payload) {
      this.openDialogMoney = false;
      if (payload != null) {
        this.total_money = payload.money_target;
        this.$store.commit("updateTargetMoney", payload);
      }
      this.progress.destroy();
      this.progressDoughnut();
    },
    openMoneyBox() {
      this.openDialogMoney = true;
    },
    openBox() {
      this.openDialog = true;
    },
    closeBox(money) {
      this.openDialog = false;
      if (money != null) {
        this.$store.commit("updateWalletMoney", money);
      }
    },
    chooseColor(num, type) {
      if (type === "stock") {
        return this.colorArr.slice(0, num);
      } else {
        return this.colorArr.reverse().slice(0, num);
      }
    },
    investTrend(x, y) {
      const ctx = document.getElementById("investement-trend").getContext("2d");

      new Chart(ctx, {
        type: "line",
        data: {
          labels: x,
          datasets: [
            {
              label: "Investment Trend",
              data: y,
              fill: true,
              borderColor: "#2196f3", // Add custom color border (Line)
              backgroundColor: "#E0FFFF", // Add custom color background (Points and Fill)
              borderWidth: 1, // Specify bar border width
            },
          ],
        },
        options: {
          responsive: window.innerWidth > 420 ? true : false, // Instruct chart js to respond nicely.
          maintainAspectRatio: false, // Add to prevent default behaviour of full-width/height
        },
      });
    },

    allStocks(x, y) {
      const label = x;
      const data = {
        labels: label,
        datasets: [
          {
            backgroundColor: this.chooseColor(this.stocks_len, "stock"),
            data: y,
            hoverBorderColor: "black",
          },
        ],
      };
      const config = {
        type: "pie",
        data: data,
        options: {
          responsive: false,
          plugins: {
            legend: {
              display: true,
              labels: {
                color: "black",
              },
              position: "top",
            },
          },
        },
      };
      new Chart(document.getElementById("investement-trend1"), config);
    },

    allCryptos(x, y) {
      const label = x;
      const data = {
        labels: label,
        datasets: [
          {
            backgroundColor: this.chooseColor(this.crypto_len, "crypto"),
            data: y,
            hoverBorderColor: "black",
          },
        ],
      };
      const config = {
        type: "pie",
        data: data,
        options: {
          responsive: false,
          plugins: {
            legend: {
              display: true,
              position: "top",
            },
          },
        },
      };
      new Chart(document.getElementById("investement-trend2"), config);
    },
    stocksVsCrypto(stocks, cryptos) {
      const label = ["Stocks", "Cryptos"];
      const data = {
        labels: label,
        datasets: [
          {
            backgroundColor: ["#AE89EC", "#C7EC89"],
            data: [stocks, cryptos],
            hoverBorderColor: ["black", "black"],
          },
        ],
      };
      const config = {
        type: "pie",
        data: data,
        options: {
          responsive: false,
          plugins: {
            legend: {
              display: true,
              position: "top",
            },
          },
        },
      };
      new Chart(document.getElementById("investement-trend3"), config);
    },

    progressDoughnut() {
      const label = ["Completed", "Left"];
      const data = {
        labels: label,
        datasets: [
          {
            backgroundColor: ["cyan", "#ECF0F1"],
            data: [
              this.all_invested,
              Number(this.total_money) - this.all_invested,
            ],
            hoverBorderColor: ["black", "black"],
          },
        ],
      };
      const config = {
        type: "doughnut",
        data: data,
        options: {
          responsive: false,
          plugins: {
            legend: {
              display: true,
              position: "top",
            },
          },
        },
      };
      this.progress = new Chart(
        document.getElementById("investement-trend4"),
        config
      );
    },
  },
  mounted() {
    this.total_money = this.$store.state.targetMoney;
    let investedTrend = this.$store.state.investedTrend;
    let investedTrend_x = [];
    let investedTrend_y = [];

    investedTrend.forEach((element) => {
      investedTrend_x.push(element.date);
      investedTrend_y.push(element.amount);
    });

    let stocks = this.$store.state.stocks;
    this.stocks_len = stocks.length;
    let stocks_x = [];
    let stocks_y = [];

    let total_invested_in_stocks = 0;

    stocks.forEach((element) => {
      total_invested_in_stocks += Number(element.invested);
    });

    this.stocks_invested = total_invested_in_stocks;

    stocks.forEach((element) => {
      stocks_x.push(element.ticker);
      stocks_y.push(
        (
          (Number(element.invested) * 100) /
          Number(total_invested_in_stocks)
        ).toFixed(2)
      );
    });

    let cryptos = this.$store.state.cryptos;
    this.crypto_len = cryptos.length;
    let cryptos_x = [];
    let cryptos_y = [];

    let total_invested_in_cryptos = 0;

    cryptos.forEach((element) => {
      total_invested_in_cryptos +=
        Number(element.invested) + Number(element.fixedDeposit);
    });

    this.crypto_invested = total_invested_in_cryptos;

    cryptos.forEach((element) => {
      cryptos_x.push(element.ticker);
      cryptos_y.push(
        (
          ((Number(element.invested) + Number(element.fixedDeposit)) * 100) /
          Number(total_invested_in_cryptos)
        ).toFixed(2)
      );
    });

    let insurances = this.$store.state.insurances;

    let total_invested_in_insurance = 0;

    insurances.forEach((element) => {
      total_invested_in_insurance += Number(element.invested);
    });

    this.insurance_invested = total_invested_in_insurance;

    this.all_invested =
      total_invested_in_insurance +
      total_invested_in_stocks +
      total_invested_in_cryptos;

    this.investTrend(investedTrend_x, investedTrend_y);
    this.allStocks(stocks_x, stocks_y);
    this.allCryptos(cryptos_x, cryptos_y);
    this.stocksVsCrypto(
      (
        (total_invested_in_stocks * 100) /
        (total_invested_in_stocks + total_invested_in_cryptos)
      ).toFixed(2),
      (
        (total_invested_in_cryptos * 100) /
        (total_invested_in_stocks + total_invested_in_cryptos)
      ).toFixed(2)
    );

    this.progressDoughnut();
  },
};
</script>

<style scoped>
#wallet-div {
  float: right;
}

@media (max-width: 420px) {
  #wallet-div {
    float: left;
  }
}
</style>
