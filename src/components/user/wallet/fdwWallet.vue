<template>
  <div>
    <div class="wallet">
      <div class="wallet--balances fpw d-flex justify-content-between">
        <div>
          <h5 class="small mb-2">Available Balance</h5>
          <h2>
            {{ wallet_balances.FPW
            }}<span class="small currency-choice">FPW</span>
          </h2>
        </div>
        <div>
          <button
            class="earn-fpw d-flex justify-content-between"
            @click="earning = !earning"
          >
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

    <EarnFidlePower @closeModal="closeFdw" v-show="earning" />
    <SwapFidle v-show="swapFidle" @close="closeSwapModal" />
  </div>
</template>

<script>
import SwapFidle from "./swapFidle.vue";
import EarnFidlePower from "@/components/static/earnFidlePower.vue";
export default {
  components: {
    EarnFidlePower,
    SwapFidle,
  },
  data() {
    return {
      earning: false,
      swapFidle: false,
    };
  },
  methods: {
    closeFdw() {
      this.earning = false;
    },
    closeSwapModal() {
      this.swapFidle = false;
    },
  },
  mounted() {},
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