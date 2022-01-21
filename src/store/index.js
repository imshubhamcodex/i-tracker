import Vue from "vue";
import Vuex from "vuex";
import { db } from "../firebase.js";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    notes: [],
    insurances: [],
    cryptos: [],

    stocks: [],
    investedTrend: [],

    walletMoney: 0,
    targetMoney: 0,
  },
  mutations: {
    addStocks(state, payload) {
      let old_item = state.stocks.filter((stock) => {
        return stock.ticker === payload.ticker;
      });

      let amount_deducted = 0;

      if (old_item.length !== 0) {
        amount_deducted = Number(old_item[0].invested);
      }

      state.stocks = state.stocks.filter((stock) => {
        return stock.ticker !== payload.ticker;
      });
      payload.date = new Date().toLocaleDateString();
      state.stocks.unshift(payload);

      // upadte invested trend
      let date_found = false;
      state.investedTrend.forEach((trend) => {
        if (trend.date === payload.date) {
          trend.amount =
            Number(payload.invested) + Number(trend.amount) - amount_deducted;
          date_found = true;
        }
      });
      if (!date_found) {
        state.investedTrend.push({
          amount: Number(payload.invested) - amount_deducted,
          date: payload.date,
        });
      }

      // upload to firebase
      const stocks = state.stocks;
      db.collection("stocks").doc("stocks_info").set(
        {
          stocks,
        },
        { merge: true }
      );

      const investedTrend = state.investedTrend;
      db.collection("investedTrend").doc("investedTrend_info").set(
        {
          investedTrend,
        },
        { merge: true }
      );
    },

    addCryptos(state, payload) {
      let old_item = state.cryptos.filter((crypto) => {
        return crypto.ticker === payload.ticker;
      });

      let amount_deducted = 0;

      if (old_item.length !== 0) {
        amount_deducted = Number(old_item[0].invested);
      }

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
            Number(trend.amount) -
            amount_deducted;
          date_found = true;
        }
      });
      if (!date_found) {
        state.investedTrend.push({
          amount:
            Number(payload.invested) +
            Number(payload.fixedDeposit) -
            amount_deducted,
          date: payload.date,
        });
      }

      // upload to firebase
      const cryptos = state.cryptos;
      db.collection("cryptos").doc("cryptos_info").set(
        {
          cryptos,
        },
        { merge: true }
      );

      const investedTrend = state.investedTrend;
      db.collection("investedTrend").doc("investedTrend_info").set(
        {
          investedTrend,
        },
        { merge: true }
      );
    },

    addInsurances(state, payload) {
      let old_item = state.insurances.filter((insurance) => {
        return insurance.ticker === payload.ticker;
      });

      let amount_deducted = 0;

      if (old_item.length !== 0) {
        amount_deducted = Number(old_item[0].invested);
      }

      state.insurances = state.insurances.filter((insurance) => {
        return insurance.ticker !== payload.ticker;
      });
      payload.date = new Date().toLocaleDateString();
      state.insurances.unshift(payload);

      // upadte invested trend
      let date_found = false;
      state.investedTrend.forEach((trend) => {
        if (trend.date === payload.date) {
          trend.amount =
            Number(payload.invested) + Number(trend.amount) - amount_deducted;
          date_found = true;
        }
      });
      if (!date_found) {
        state.investedTrend.push({
          amount: Number(payload.invested) - amount_deducted,
          date: payload.date,
        });
      }

      // upload to firebase
      const insurances = state.insurances;
      db.collection("insurances").doc("insurances_info").set(
        {
          insurances,
        },
        { merge: true }
      );

      const investedTrend = state.investedTrend;
      db.collection("investedTrend").doc("investedTrend_info").set(
        {
          investedTrend,
        },
        { merge: true }
      );
    },

    addNotes(state, payload) {
      state.notes = state.notes.filter((note) => {
        return note.title !== payload.title;
      });
      state.notes.unshift(payload);

      // upload to firebase
      const notes = state.notes;
      db.collection("notes").doc("notes_info").set(
        {
          notes,
        },
        { merge: true }
      );
    },

    updateWalletMoney(state, payload) {
      state.walletMoney = payload;
      const walletMoney = state.walletMoney;
      db.collection("walletMoney").doc("walletMoney_info").set(
        {
          walletMoney,
        },
        { merge: true }
      );
    },

    // Delete section

    deleteStock(state, payload) {
      state.stocks = state.stocks.filter((stock) => {
        return stock.ticker !== payload.ticker;
      });

      // upload to firebase
      const stocks = state.stocks;
      db.collection("stocks").doc("stocks_info").set(
        {
          stocks,
        },
        { merge: true }
      );
    },

    deleteCrypto(state, payload) {
      state.cryptos = state.cryptos.filter((crypto) => {
        return crypto.ticker !== payload.ticker;
      });

      // upload to firebase
      const cryptos = state.cryptos;
      db.collection("cryptos").doc("cryptos_info").set(
        {
          cryptos,
        },
        { merge: true }
      );
    },

    deleteInsurance(state, payload) {
      state.insurances = state.insurances.filter((insurance) => {
        return insurance.ticker !== payload.ticker;
      });

      // upload to firebase
      const insurances = state.insurances;
      db.collection("insurances").doc("insurances_info").set(
        {
          insurances,
        },
        { merge: true }
      );
    },

    deleteNote(state, payload) {
      state.notes = state.notes.filter((note) => {
        return note.title !== payload.title;
      });

      // upload to firebase
      const notes = state.notes;
      db.collection("notes").doc("notes_info").set(
        {
          notes,
        },
        { merge: true }
      );
    },

    updateTargetMoney(state, payload) {
      state.targetMoney = Number(payload.money_target);

      // upload to firebase
      const targetMoney = state.targetMoney;
      db.collection("targetMoney").doc("targetMoney_info").set(
        {
          targetMoney,
        },
        { merge: true }
      );
    },

    // Set section

    setStocks(state, payload) {
      state.stocks = payload;
    },

    setCryptos(state, payload) {
      state.cryptos = payload;
    },

    setInsurances(state, payload) {
      state.insurances = payload;
    },

    setNotes(state, payload) {
      state.notes = payload;
    },

    setWalletMoney(state, payload) {
      state.walletMoney = payload;
    },

    setTargetMoney(state, payload) {
      state.targetMoney = payload;
    },

    setInvestedTrend(state, payload) {
      state.investedTrend = payload;
    }
  },
});
