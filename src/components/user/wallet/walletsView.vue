<template>
  <div>
    <div>
      <div class="wallets">
        <div class="wallet--details" style="gap: 20px">
          <div class="main--wallet-content">
            <div class="wallet--balance">
              <div class="d-flex align-items-center justify-content-between">
                <div>
                  <div class="d-flex align-items-center" style="gap: 10px">
                    <h5 class="text-white mb-1">Your Balance</h5>
                    <span @click="hideBalance" role="button">
                      <IconComponent
                        class="text-white"
                        style="font-size: 20px"
                        :icon="icon"
                      />
                    </span>
                  </div>
                  <h1 class="font-weight-bold text-white" v-if="fdc">
                    <span v-if="visible"
                      >{{ wallet_balances.FIDLE }}
                      <span class="currency-choice small">FIDLE</span></span
                    >
                    <span v-else> ********** </span>
                  </h1>
                  <h1 class="font-weight-bold text-white" v-else>
                    <span v-if="visible"
                      >{{ wallet_balances.FPW }}
                      <span class="small currency-choice">FPW</span></span
                    >
                    <span v-else> ********** </span>
                  </h1>
                  <p class="font-weight-bold text-white" v-show="fdc">
                    <span v-if="visible">${{ wallet_balances.FIDLE_USD }}</span>
                    <span v-else> ********** </span>
                  </p>
                </div>
                <div class="switch--currency">
                  <el-select
                    v-model="value"
                    @change="getValue"
                    placeholder="FIDLE"
                  >
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    >
                    </el-option>
                  </el-select>
                </div>
              </div>
            </div>
          </div>
          <div class="wallet--values d-flex" style="gap: 20px">
            <div
              class="
                wallet-each-item
                w-100
                bg-white
                d-flex
                justify-content-center
              "
              role="button"
              @click="toWallet('second')"
            >
              <div class="wallet--item">
                <div>
                  <img src="@/assets/img/fidlecoin.svg" alt="" />
                </div>
                <div>
                  <h5>FIDLE</h5>
                </div>
                <div>
                  <h2 v-if="visible">{{ wallet_balances.FIDLE }}</h2>
                  <h2 v-else>****</h2>
                </div>
              </div>
              <div class="align-self-center">
                <IconComponent icon="la:angle-right" />
              </div>
            </div>
            <div
              class="
                wallet-each-item
                w-100
                bg-white
                d-flex
                justify-content-center
              "
              role="button"
              @click="toWallet('third')"
            >
              <div class="wallet--item">
                <div>
                  <img src="@/assets/img/fidlepower.svg" alt="" />
                </div>
                <div>
                  <h5>FPW</h5>
                </div>
                <div>
                  <h2 v-if="visible">{{ wallet_balances.FPW }}</h2>
                  <h2 v-else>****</h2>
                </div>
              </div>
              <div class="align-self-center">
                <IconComponent icon="la:angle-right" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      options: [
        {
          value: "FIDLE",
          label: "FIDLE",
        },
        {
          value: "FPW",
          label: "FPW",
        },
      ],
      value: "",
      fdc: true,
      visible: true,
      icon: "bi:eye-slash",
    };
  },
  methods: {
    getValue() {
      if (this.value == "FIDLE") {
        this.fdc = true;
      } else {
        this.fdc = false;
      }
    },
    toWallet(value) {
      this.$emit("wallet", value);
      // console.log(value);
    },
    hideBalance() {
      this.visible = !this.visible;
      if (this.visible) {
        this.icon = "clarity:eye-line";
      } else {
        this.icon = "bi:eye-slash";
      }
    },
  },
  mounted() {
    this.fdc = true;
  },
  beforeMount() {
    this.$store.dispatch("user/walletBalance");
  },
  computed: {
    getUser() {
      return this.$store.getters["auth/getUser"];
    },
    wallet_balances() {
      var wallet;
      wallet = this.$store.getters["user/walletBalance"].main;
      return wallet;
    },
  },
};
</script>