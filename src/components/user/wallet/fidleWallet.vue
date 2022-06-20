<template>
  <div>
    <div class="wallet">
      <div class="wallet--balances fidle">
        <h5 class="small">Available Balance</h5>
        <h2> {{ wallet_balances.FIDLE }}<span class="small currency-choice">FDC</span> </h2>
        <p>~${{wallet_balances.FIDLE_USD}}</p>
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

      <SendFidle/>
    </div>
  </div>
</template>

<script>
import SendFidle from '@/components/user/wallet/sendFidle.vue'
export default {
  components: {
    SendFidle
  },
    props:[''],
    data(){
        return {
            wallet_balances: {}
        }
    },
    methods: {
    getWalletBalances() {
      this.$axios
        .get("user/wallet-balances")
        .then((res) => {
          console.log(res);
          if (this.getUser.level.rank == 1) {
            this.wallet_balances = res.data.balances.demo
          }
          else {
            this.wallet_balances = res.data.balances.main
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },

  },
  mounted() {
    this.getWalletBalances();
  },
  computed: {
    getUser(){
        return this.$store.getters.getUser
    }
  }
}
</script>