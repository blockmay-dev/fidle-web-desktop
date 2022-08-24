<template>
  <div>
    <div class="wallet">
      <div class="wallet--balances fidle">
        <h5 class="small mb-2">Available Balance</h5>
        <h2>
          {{ wallet_balances.FIDLE
          }}<span class="small currency-choice">FIDLE</span>
        </h2>
        <p>~${{ wallet_balances.FIDLE_USD }}</p>
      </div>

      <div class="wallet--actions d-flex" style="gap: 20px">
        <div
          class="
            bg-white
            rounded-sm
            w-100
            d-flex
            align-items-center
            justify-content-center
          "
          role="button"
          @click="send_fidle = !send_fidle"
        >
          <div class="text-center" role="button">
            <div class="icon mb-2">
              <IconComponent icon="carbon:send-alt-filled" />
            </div>
            <div>
              <h6 class="">Send</h6>
            </div>
          </div>
        </div>

        <div
          class="
            bg-white
            rounded-sm
            w-100
            d-flex
            align-items-center
            justify-content-center
          "
          role="button"
          @click="receiveFidle = !receiveFidle"
        >
          <div class="text-center">
            <div class="icon mb-2">
              <IconComponent icon="teenyicons:send-down-solid" />
            </div>
            <div>
              <h6 class="">Receive</h6>
            </div>
          </div>
        </div>

        <div
          class="
            bg-white
            rounded-sm
            w-100
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

      <SendFidle
        v-show="send_fidle"
        :wallet_balances="wallet_balances"
        @close="closeModal"
      />
      <ReceiveFidle v-show="receiveFidle" @close="closeReceiveModal" />
      <SwapFidle v-show="swapFidle" @close="closeSwapModal" />
    </div>
  </div>
</template>

<script>
import SendFidle from "@/components/user/wallet/sendFidle.vue";
import ReceiveFidle from "./receiveFidle.vue";
import SwapFidle from "./swapFidle.vue";
export default {
  components: {
    SendFidle,
    ReceiveFidle,
    SwapFidle,
  },
  data() {
    return {
      send_fidle: false,
      receiveFidle: false,
      swapFidle: "",
    };
  },
  methods: {
    closeModal() {
      this.send_fidle = false;
    },
    closeReceiveModal() {
      this.receiveFidle = false;
    },
    closeSwapModal() {
      this.swapFidle = false;
    },
  },

  computed: {
    getUser() {
      return this.$store.getters['auth/getUser']
    },
    wallet_balances() {
      var wallet;
      wallet = this.$store.getters["user/walletBalance"].main;
      return wallet;
    },
  },
};
</script>