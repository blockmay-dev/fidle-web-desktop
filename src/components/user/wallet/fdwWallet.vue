<template>
  <div>
    <div class="wallet">
      <div class="wallet--balances fpw d-flex justify-content-between">
        <div>
            <h5 class="small">Available Balance</h5>
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
            w-100
            d-flex
            align-items-center
            justify-content-center
          "
          role="button"
        >
          <div class="text-center">
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
    </div>

    <EarnFidlePower @closeModal="closeFdw" v-show="earning"/>
  </div>
</template>

<script>
import EarnFidlePower from '@/components/static/earnFidlePower.vue';
export default {
  components:{
    EarnFidlePower
  },
    props:[''],
    data(){
        return {
            wallet_balances: {},
            earning: false,
        }
    },
    methods: {
      closeFdw(){
        this.earning = false
      },
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