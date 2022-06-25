<template>
  <div>
    <div class="wallet">
      <div class="wallet--balances fpw d-flex justify-content-between">
        <div>
            <h5 class="small mb-2">Available Balance</h5>
            <h2> {{ wallet_balances.FPW }}<span class="small currency-choice">FPW</span>  </h2>
        </div>
        <div>
            <button class="earn-fpw d-flex justify-content-between" @click="earning = !earning">
                <span>Earn Fidle Power</span>
                <span> <IconComponent icon="la:angle-right" /> </span>
            </button>
            <!-- <h6>Total Earning: 220 FPW</h6> -->
        </div>
      </div>

      <div class="wallet--actions fpw-actions d-flex" style="gap: 20px">
        <div
          class="
            bg-white
            rounded-sm
            w-50
            d-flex
            align-items-center
            justify-content-center
          "
          role="button"
          @click="swapFidle = !swapFidle"
        >
          <div class="text-center">
            <div class="icon mb-2">
              <IconComponent icon="ic:outline-swap-vert" />
            </div>
            <div>
              <h6 class="">Swap</h6>
            </div>
          </div>
        </div>
      </div>
    </div>

    <EarnFidlePower @closeModal="closeFdw" v-show="earning"/>
    <SwapFidle v-show="swapFidle"  @close="closeSwapModal" />
  </div>
</template>

<script>
import SwapFidle from './swapFidle.vue';
import EarnFidlePower from '@/components/static/earnFidlePower.vue';
export default {
  components:{
    EarnFidlePower, SwapFidle
  },
    props:[''],
    data(){
        return {
            earning: false,
            swapFidle: false,
        }
    },
    methods: {
      closeFdw(){
        this.earning = false
      },
      closeSwapModal() {
      this.swapFidle = false;
    },
     setWalletBalances() {
      this.$axios
        .get("user/wallet-balances")
        .then((res) => {
          console.log(res);
          if (this.getUser.level.rank === 1) {
            this.wallet = res.data.balances.demo;
          } else {
            this.wallet = res.data.balances.main;
          }
          let new_wallet = this.wallet;
          this.$store.dispatch("updateWallet", { new_wallet });
        })
        .catch((err) => {
          console.log(err);
        });
    },
    setTransactions() {
      this.$axios
        .get("user/wallet/transactions/")
        .then((res) => {
          console.log(res);
          let new_transactions = res.data.results;
          this.$store.dispatch("updateTransaction", { new_transactions });
        })
        .catch((err) => {
          console.log(err);
        });
    },

    
  },
  mounted() {
  },
  computed: {
    getUser(){
        return this.$store.getters.getUser
    },
    wallet_balances(){
      return this.$store.getters.getWallet
    }
  },
}
</script>