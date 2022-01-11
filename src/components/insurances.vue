<template>
  <div>
    <div style="margin-bottom: 30px">
      <v-row>
        <v-col cols="12" md="2">
          <span class="title ml-3 mr-5"> INSURANCES&nbsp; </span>
        </v-col>
      </v-row>
      <div id="insurance-add-button">
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
      <div id="insurance-search-box">
        <v-textarea
          append-icon="mdi-book-search-outline"
          class="mx-2"
          label="Search insurances"
          rows="1"
          outlined
          :auto-grow="false"
          row-height="10"
          :rules="[rules.ticker]"
          v-model="searchQuery"
          @keyup="searchinsurance"
        ></v-textarea>
      </div>
    </div>
    <div id="insurance-div">
      <v-row>
        <v-col
          v-for="(insurance, index) in updatedinsuranceList"
          :key="insurance.ticker + index"
          cols="12"
          md="4"
        >
          <v-card
            class="insurance-cards"
            max-width="344"
            outlined
            elevation="2"
            shaped
          >
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title class="text-h6 mb-1">
                  <span class="text-h6">{{ insurance.ticker }}</span>
                  <span
                    class="subtitle-2 text--secondary mt-n1 overline"
                    style="float: right"
                    ><v-icon
                      color="green"
                      small
                      style="zoom: 0.5; margin-right: 10px"
                      >mdi-checkbox-blank-circle </v-icon
                    >{{ insurance.date }}</span
                  >
                </v-list-item-title>
                <v-list-item-subtitle class="pt-5">
                  <v-row>
                    <v-col cols="6" md="6">
                      <p class="overline">INVESTED</p>
                      <p class="font-weight-bold">{{ insurance.invested }}</p>
                    </v-col>
                    <v-col cols="6" md="6">
                      <p class="overline">TYPE</p>
                      <p class="font-weight-bold">{{ insurance.type }}</p>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="6" md="6">
                      <p class="overline">Premium</p>
                      <p class="font-weight-bold">{{ insurance.premium }}</p>
                    </v-col>
                    <v-col cols="6" md="6">
                      <p class="overline">Portfolio Wt.</p>
                      <span class="font-weight-bold">
                        {{
                          (
                            (Number(insurance.invested) * 100) /
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
                          (Number(insurance.invested) * 100) /
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
    <insuranceDialog
      :openDialog="openDialog"
      :insuranceData="insuranceData"
      @addinsurance="closeBox"
    />
  </div>
  <!-- use grid and card box modal also put option to add insurances-->
</template>

<script>
import gsap from "gsap";
import insuranceDialog from "./insuranceDialog.vue";
export default {
  components: {
    insuranceDialog,
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
    insuranceData: null,
    updatedinsuranceList: [],
    insurances: [],
  }),
  methods: {
    closeBox(payload) {
      if (payload !== null) {
        // this.updatedinsuranceList = this.updatedinsuranceList.filter(
        //   (insurance) => {
        //     return insurance.ticker !== payload.ticker;
        //   }
        // );
        // this.updatedinsuranceList.unshift(payload);
        // this.insurances = this.insurances.filter((insurance) => {
        //   return insurance.ticker !== payload.ticker;
        // });
        // this.insurances.unshift(payload);

        this.$store.commit("addInsurances", payload);
        this.calcTotalInv();
        this.updatedinsuranceList = this.$store.state.insurances;
        this.stocks = this.$store.state.insurances;
      }
      this.openDialog = false;
    },
    openBox(option, index) {
      if (option === "add") {
        this.openDialog = true;
        this.insuranceData = null;
      } else if (option === "edit") {
        this.insuranceData = this.updatedinsuranceList[index];
        this.openDialog = true;
      }
    },
    searchinsurance() {
      this.updatedinsuranceList = this.insurances.filter((insurance) => {
        return insurance.ticker
          .toLowerCase()
          .includes(this.searchQuery.toLowerCase());
      });

      if (this.updatedinsuranceList.length === 0) {
        this.updatedinsuranceList = this.insurances;
      }
    },
    calcTotalInv() {
      this.totalInvested = 0;
      this.$store.state.insurances.forEach((insurance) => {
        this.totalInvested += Number(insurance.invested);
      });
    },
  },
  mounted() {
    this.insurances = this.$store.state.insurances;
    this.updatedinsuranceList = this.insurances;

    this.insurances.forEach((insurance) => {
      this.totalInvested += Number(insurance.invested);
    });

    let tl = gsap.timeline();

    tl.fromTo(
      "#insurance-add-button",
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
      ".insurance-cards",
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

#insurance-div {
  margin-top: 50px;
  margin-left: 16px;
}
#insurance-search-box {
  width: 320px;
  float: right;
  margin-top: -40px;
  margin-right: 30px;
}
#insurance-add-button {
  float: right;
  margin-right: 90px;
  margin-top: -30px;
}

@media (max-width: 420px) {
  #insurance-div {
    width: 330px;
    margin-left: 12px;
  }
  #insurance-search-box {
    width: 160px;
    margin-top: -40px;
    margin-right: 5px;
  }
  #insurance-add-button {
    margin-right: -10px;
    margin-top: -30px;
  }
}

@media (max-width: 370px) {
  #insurance-div {
    width: 288px;
    margin-left: 6px;
  }
  #insurance-search-box {
    width: 130px;
    margin-top: -40px;
    margin-right: 0px;
  }
}
</style>
