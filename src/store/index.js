import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    notes: [
      {
        id: 1,
        title: "note1",
        body: "note1 content",
        source: "abc.com",
        date: "1/11/2022",
      },
      {
        id: 2,
        title: "note2",
        body: "note1 content",
        source: "def.com",
        date: "1/11/2022",
      },
    ],
    insurances: [
      {
        ticker: "Medi",
        invested: 1000,
        type: "Health",
        premium: 100,
        date: "1/11/2022",
      },
      {
        ticker: "Auto",
        invested: 1100,
        type: "Car",
        premium: 110,
        date: "1/11/2022",
      },
    ],
    cryptos: [
      {
        ticker: "BTC",
        apr: 130,
        invested: 50,
        fixedDeposit: 200,
        date: "1/11/2022",
      },
      {
        ticker: "ETH",
        apr: 130,
        invested: 100,
        fixedDeposit: 200,
        date: "1/11/2022",
      },
    ],

    stocks: [
      {
        ticker: "NMDC",
        quantity: 150,
        dividend: 1230,
        invested: 300,
        avgBuyPrice: 1030,
        date: "1/11/2022",
      },
      {
        ticker: "HCLTECH",
        quantity: 150,
        dividend: 1230,
        invested: 1000,
        avgBuyPrice: 1030,
        date: "1/11/2022",
      },
    ],
    investedTrend: [
      {
        amount: 1000,
        date: "1/9/2022",
      },
      {
        amount: 200,
        date: "1/10/2022",
      },
      {
        amount: 2000,
        date: "1/11/2022",
      },
      {
        amount: 1000,
        date: "1/12/2022",
      },
      {
        amount: 500,
        date: "1/13/2022",
      },
    ],

    walletMoney: 1000,
  },
  mutations: {
    addStocks(state, payload) {
      state.stocks = state.stocks.filter((stock) => {
        return stock.ticker !== payload.ticker;
      });
      payload.date = new Date().toLocaleDateString();
      state.stocks.unshift(payload);

      // upadte invested trend
      let date_found = false;
      state.investedTrend.forEach((trend) => {
        if (trend.date === payload.date) {
          trend.amount = Number(payload.invested) + Number(trend.amount);
          date_found = true;
        }
      });
      if (!date_found) {
        state.investedTrend.push({
          amount: Number(payload.invested),
          date: payload.date,
        });
      }
    },

    addCryptos(state, payload) {
      state.cryptos = state.cryptos.filter((crypto) => {
        return crypto.ticker !== payload.ticker;
      });
      payload.date = new Date().toLocaleDateString();
      state.cryptos.unshift(payload);

      // upadte invested trend
      let date_found = false;
      state.investedTrend.forEach((trend) => {
        if (trend.date === payload.date) {
          trend.amount =
            Number(payload.invested) +
            Number(payload.fixedDeposit) +
            Number(trend.amount);
          date_found = true;
        }
      });
      if (!date_found) {
        state.investedTrend.push({
          amount: Number(payload.invested) + Number(payload.fixedDeposit),
          date: payload.date,
        });
      }
    },

    addInsurances(state, payload) {
      state.insurances = state.insurances.filter((insurance) => {
        return insurance.ticker !== payload.ticker;
      });
      payload.date = new Date().toLocaleDateString();
      state.insurances.unshift(payload);

      // upadte invested trend
      let date_found = false;
      state.investedTrend.forEach((trend) => {
        if (trend.date === payload.date) {
          trend.amount = Number(payload.invested) + Number(trend.amount);
          date_found = true;
        }
      });
      if (!date_found) {
        state.investedTrend.push({
          amount: Number(payload.invested),
          date: payload.date,
        });
      }
    },
  },
});
