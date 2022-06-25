<template>
  <div>
    <div class="wallet">
      <div class="wallet--balances fidle">
        <h5 class="small mb-2">Available Balance</h5>
        <h2>
          {{ wallet_balances.FIDLE
          }}<span class="small currency-choice">FDC</span>
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
  props: [""],
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
      this.setWalletBalances();
      this.setTransactions();
    },
    closeReceiveModal() {
      this.receiveFidle = false;
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

  computed: {
    getUser() {
      return this.$store.getters.getUser;
    },
    wallet_balances() {
      return this.$store.getters.getWallet;
    },
  },
};
</script>