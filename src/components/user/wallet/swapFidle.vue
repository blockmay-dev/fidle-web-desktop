<template>
  <div>
    <div>
      <div class="swap--fidle_container">
        <div class="swap--fidle_content">
          <div @click="close" class="text-right mb-2" role="button">
            <IconComponent
              icon="ant-design:close-circle-outlined"
              style="font-size: 20px"
            />
          </div>
          <div class="text-center mb-3">
            <h4 class="">Swap</h4>
            <!-- <small class="text-secondary"
              >Copy your fidle address or scan code to receive Fidle</small
            > -->
          </div>
          <div>
            <div class="d-flex align-items-center mb-2 w-100" v-if="fidle">
              <div class="d-flex align-items-center" style="gap: 10px">
                <img src="@/assets/img/fidlecoin.svg" width="35" alt="" />
                <span>FIDLE</span>
              </div>
              <div class="w-100 text-right">
                <label class="small text-secondary" for="">You pay</label>
                <input
                  type="number"
                  placeholder="0.0"
                  min="0"
                  @keyup="getAmount"
                  v-model="amount"
                />
                <small class="text-secondary"
                  >Balance: {{ walletBalances.FIDLE - amount }}FIDLE</small
                >
              </div>
            </div>
            <div class="d-flex align-items-center mb-2 w-100" v-else>
              <div class="d-flex align-items-center" style="gap: 10px">
                <img src="@/assets/img/fidlepower.svg" width="35" alt="" />
                <span>FPW</span>
              </div>
              <div class="w-100 text-right">
                <label class="small text-secondary" for="">You pay</label>
                <input
                  type="number"
                  placeholder="0.0"
                  min="0"
                  @keyup="getAmount"
                  v-model="amount"
                />
                <small class="text-secondary"
                  >Balance: {{ walletBalances.FPW - amount }}FPW</small
                >
              </div>
            </div>

            <div
              class="d-flex align-items-center"
              role="button"
              @click="fidle = !fidle"
            >
              <div class="swap--icon">
                <IconComponent icon="ic:outline-swap-vert" />
              </div>
              <div class="divider--line"></div>
            </div>

            <div class="d-flex align-items-center mt-2 w-100" v-if="fidle">
              <div class="d-flex align-items-center" style="gap: 10px">
                <img src="@/assets/img/fidlepower.svg" width="35" alt="" />
                <span>FPW</span>
              </div>
              <div class="w-100 text-right">
                <label class="small text-secondary" for="">You get</label>
                <input
                  type="number"
                  placeholder="0.0"
                  readonly
                  v-model="payload.amount"
                />
                <small class="text-secondary"
                  >Balance: {{ walletBalances.FPW }}FPW</small
                >
              </div>
            </div>
            <div class="d-flex align-items-center mt-2 w-100" v-else>
              <div class="d-flex align-items-center" style="gap: 10px">
                <img src="@/assets/img/fidlecoin.svg" width="35" alt="" />
                <span>FIDLE</span>
              </div>
              <div class="w-100 text-right">
                <label class="small text-secondary" for="">You get</label>
                <input
                  type="number"
                  placeholder="0.0"
                  readonly
                  v-model="payload.amount"
                />
                <small class="text-secondary"
                  >Balance: {{ walletBalances.FIDLE }}FIDLE</small
                >
              </div>
            </div>

            <div class="percentages">
              <span role="button" @click="swapPercentage(0.25)"> 25% </span>
              <span role="button" @click="swapPercentage(0.5)"> 50% </span>
              <span role="button" @click="swapPercentage(0.75)"> 75% </span>
              <span role="button" @click="swapPercentage(1)"> 100% </span>
            </div>

            <div class="swap--button">
              <button @click="enterPin = !enterPin">Swap</button>
            </div>
          </div>
        </div>

        <EnterPin @complete="getPin" @close="closeModal" v-show="enterPin" />
      </div>
    </div>
  </div>
</template>

<script>
import EnterPin from "./enterPin.vue";
export default {
  components: { EnterPin },
  data() {
    return {
      enterPin: false,
      fidle: true,
      fpw: false,
      amount: "",
      payload: {
        amount: "",
        from_currency_symbol: "",
        to_currency_symbol: "",
        pin: "",
      },
    };
  },
  methods: {
    swapPercentage(value) {
      if (this.fidle) {
        this.amount = value * this.walletBalances.FIDLE;
      } else {
        this.amount = value * this.walletBalances.FPW;
      }
      this.getAmount();
    },
    close() {
      this.$emit("close");
      this.$store.dispatch("user/removePinVerification");
    },
    getAmount() {
      if (this.fidle) {
        this.payload.amount = this.amount * 1000;
        if (this.amount > this.walletBalances.FIDLE) {
          this.$toastify({
            text: `You can't swap above your current wallet balance`,
            className: "info",
            style: {
              background: "#333",
              fontSize: "13px",
              borderRadius: "5px",
              padding: "10px 20px",
            },
          }).showToast();
          this.amount = "";
          this.payload.amount = "";
        } else if (this.amount < 0) {
          alert("Enter a valid Number");
          this.amount = "";
          this.payload.amount = "";
        }
      } else {
        this.payload.amount = this.amount / 1000;
        if (this.amount > this.walletBalances.FPW) {
          this.$toastify({
            text: `You can't swap above your current wallet balance`,
            className: "info",
            style: {
              background: "#333",
              fontSize: "13px",
              borderRadius: "5px",
              padding: "10px 20px",
            },
          }).showToast();
          this.amount = "";
          this.payload.amount = "";
        } else if (this.amount < 0) {
          alert("Enter a valid Number");
          this.amount = "";
          this.payload.amount = "";
        }
      }
    },
    closeModal() {
      this.enterPin = false;
    },
    swap() {
      if (this.fidle) {
        let payload = {
          amount: this.amount,
          pin: this.payload.pin,
          from_currency_symbol: "FIDLE",
          to_currency_symbol: "FPW",
        };
        console.log(payload);
        this.$store.dispatch("user/swapFidle", payload);
        this.$emit("close");
        this.$store.dispatch("user/removePinVerification");
      } else {
        let payload = {
          amount: this.amount,
          pin: this.payload.pin,
          from_currency_symbol: "FPW",
          to_currency_symbol: "FIDLE",
        };
        console.log(payload);
        this.$store.dispatch("user/swapFidle", payload);
        this.$store.dispatch("user/removePinVerification");
        this.$emit("close");
      }
      this.payload = {};
      this.amount = ""
    },
    getPin(value) {
      this.enterPin = false;
      console.log(value);
      this.payload.pin = value;
      this.swap();
    },
  },

  computed: {
    getUser() {
      return this.$store.getters["auth/getUser"];
    },
    walletBalances() {
      var wallet;
      wallet = this.$store.getters["user/walletBalance"].main;
      return wallet;
    },
  },

  beforeMount() {},
};
</script>