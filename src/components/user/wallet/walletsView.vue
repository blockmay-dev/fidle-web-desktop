<template>
  <div>
    <div>
      <div class="wallets">
        <div class="wallet--details" style="gap: 20px">
          <div class="main--wallet-content">
            <div class="wallet--balance">
              <div class="d-flex align-items-center justify-content-between">
                <div>
                  <div class="d-flex align-items-center" style="gap:10px">
                    <h5 class="text-white mb-1">Your Balance</h5>
                    <span @click="hideBalance" role="button"> 
                      <IconComponent
                      class="text-white"
                      style="font-size: 20px"
                      :icon="icon"
                    /> 
                    </span>
                  </div>
                  <h1 class="font-weight-bold text-white" v-if="fdc"> <span v-if="visible">{{ wallet_balances.FIDLE }} <span class="currency-choice small">FIDLE</span></span>
                  <span v-else> ********** </span>
                  </h1>
                  <h1 class="font-weight-bold text-white" v-else> <span v-if="visible">{{ wallet_balances.FPW }} <span class="small currency-choice">FPW</span></span> 
                   <span v-else> ********** </span>
                  </h1>
                  <p class="font-weight-bold text-white" v-show="fdc"><span v-if="visible">${{ wallet_balances.FIDLE_USD }}</span>
                    <span v-else> ********** </span>
                  </p>
                </div>
                <div class="switch--currency">
                  <el-select v-model="value" @change="getValue" placeholder="FIDLE">
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

              <div class="mt-3 d-flex" style="gap: 10px" v-if="fdc">
                <button
                  class="
                    withdraw--button
                    w-100
                    d-flex
                    align-items-center
                    justify-content-center
                  "
                  style="gap: 10px"
                >
                  <span><IconComponent icon="teenyicons:send-up-solid" /></span>
                  <span class="font-weight-bold">Withdraw</span>
                </button>
                <button
                  class="
                    w-100
                    d-block
                    deposit--button
                    d-flex
                    align-items-center
                    justify-content-center
                  "
                  style="gap: 10px"
                >
                  <span>
                    <IconComponent icon="teenyicons:send-down-solid" />
                  </span>
                  <span class="font-weight-bold">Add Funds</span>
                </button>
              </div>
            </div>
          </div>
          <div class="wallet--values d-flex" style="gap: 20px">
            <div class="wallet-each-item w-100 bg-white d-flex justify-content-center">
              <div class="wallet--item">
                <div>
                  <img src="@/assets/img/fidlecoin.svg" alt="" />
                </div>
                <div>
                  <h5>FIDLE</h5>
                </div>
                <div>
                  <h2 v-if="visible"> {{ wallet_balances.FIDLE }} </h2>
                  <h2 v-else> **** </h2>
                </div>
              </div>
              <div class="align-self-center">
                <IconComponent icon="la:angle-right" />
              </div>
            </div>
            <div class="wallet-each-item w-100 bg-white d-flex justify-content-center">
              <div class="wallet--item">
                <div>
                  <img src="@/assets/img/fidlepower.svg" alt="" />
                </div>
                <div>
                  <h5>FPW</h5>
                </div>
                <div>
                  <h2 v-if="visible"> {{ wallet_balances.FPW }} </h2>
                  <h2 v-else> **** </h2>
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
      wallet: {},
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
    getWalletBalances() {
      this.$axios
        .get("user/wallet-balances")
        .then((res) => {
          console.log(res);
          // if (this.getUser.level.rank === 1) {
          //   this.wallet = res.data.balances.demo
          // }
          // else {
            this.wallet = res.data.balances.main
          // }
          let wallet = this.wallet;
          this.$store.dispatch('wallets', {wallet})
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getValue(){
        if (this.value == 'FIDLE') {
            this.fdc = true
        }
        else {
            this.fdc = false
        }
    },
    hideBalance(){
      this.visible = !this.visible;
      if (this.visible) {
        this.icon = "clarity:eye-line";
      } else {
        this.icon = "bi:eye-slash";
      }
    }

  },
  mounted() {
    this.fdc = true
  },
  computed: {
    getUser(){
        return this.$store.getters.getUser
    },
    wallet_balances(){
      return this.$store.getters.getWallet
    }

  },
  beforeMount(){
    this.getWalletBalances()
  }
};
</script>