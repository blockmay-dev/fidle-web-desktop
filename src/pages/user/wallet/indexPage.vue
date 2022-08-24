<template>
  <div>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <div v-if="user.level">
        <div v-if="user.level.rank === 1" class="top">
          <div class="alert--top">
            <div class="d-flex align-items-center" style="gap: 8px">
              <span>
                <IconComponent icon="carbon:warning" />
              </span>
              <p
                role="button"
                style="text-decoration: underline !important; color: #eb4242"
                @click="upgrade = !upgrade"
              >
                Upgrade your account
              </p>
            </div>
            <div class="mt-2">
              <p class="small" style="color: #eb4242">
                This is a demo account for basic level. The money you make here
                will be reset once you upgrade your account
              </p>
            </div>
          </div>
        </div>
      </div>
      <el-tab-pane label="Wallet" name="first">
        <MainWalletVue @wallet="toWallet" />
      </el-tab-pane>
      <el-tab-pane label="Fidle Power" name="second">
        <FdwWalletVue />
      </el-tab-pane>
      <el-tab-pane label="Fidle Coin" name="third">
        <FidleWalletVue />
      </el-tab-pane>

      <!-- Transaction History Table -->
      <div class="my-4">
        <TransactionsView :currency_symbol="currency" @open="openModal" />
      </div>
    </el-tabs>

    <UpgradeLevel v-show="upgrade" @close="closeUpgrade" />

    <!-- View Trasaction By Id -->
    <div v-show="modal">
      <div class="transaction--details_mask">
        <div class="transaction--details_content">
          <div v-if="loading" class="d-flex align-items-center justify-content-center">
            <i class="el-icon-loading" style="font-size: 40px"></i>
          </div>
          <div v-else>
            <div class="top d-flex align-items-center justify-content-between">
              <div>
                <small class="text-capitalize">{{
                  timeRange(new Date(transaction.date_created * 1000.0))
                }}</small>
                <div class="d-flex" style="gap: 5px">
                  <h6 class="">
                    {{ transaction.amount }} {{ transaction.currency }}
                  </h6>
                  <span :class="transaction.status">
                    {{ transaction.status }}
                  </span>
                </div>
              </div>
              <div
                class="close--transaction_icon"
                role="button"
                @click="closeModal"
              >
                <IconComponent icon="ep:close-bold" />
              </div>
            </div>
            <div class="transaction--details_data mt-3">
              <div class="row">
                <h6 class="col-md-6 small text-secondary">Description</h6>
                <h6 class="col-md-6 small">{{ transaction.description }}</h6>
              </div>
              <hr />
              <div class="row">
                <h6 class="col-md-6 small text-secondary">Transaction Hash</h6>
                <h6 class="col-md-6 small">
                  {{ transaction.transaction_hash }}
                </h6>
              </div>
              <hr />
              <div class="row">
                <h6 class="col-md-6 small text-secondary">Channel</h6>
                <h6 class="col-md-6 small text-capitalize">
                  {{ transaction.channel }}
                </h6>
              </div>
            </div>
            <div class="transaction--details_data mt-3">
              <div class="row">
                <h6 class="col-md-6 small text-secondary">Block Number</h6>
                <h6 class="col-md-6 small">{{ transaction.block_number }}</h6>
              </div>
              <hr />
              <div class="row">
                <h6 class="col-md-6 small text-secondary">Transaction Type</h6>
                <h6 class="col-md-6 small text-capitalize">
                  {{ transaction.transaction_type }}
                </h6>
              </div>
              <hr />
              <div class="row">
                <h6 class="col-md-6 small text-secondary">Date Created</h6>
                <h6 class="col-md-6 small">
                  {{ timeStamp(new Date(transaction.date_created * 1000.0)) }}
                </h6>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {
  timeRange,
  sliceContent,
  dollarFilter,
  colorSplit,
  timeStamp,
} from "@/plugins/filter";
import MainWalletVue from "./mainWallet.vue";
import FidleWalletVue from "./fidleWallet.vue";
import FdwWalletVue from "./fdwWallet.vue";
import UpgradeLevel from "@/components/user/wallet/upgradeLevel.vue";
import TransactionsView from "@/components/user/wallet/transactionsView.vue";
export default {
  data() {
    return {
      timeStamp,
      timeRange,
      sliceContent,
      dollarFilter,
      colorSplit,
      activeName: "first",
      upgrade: false,
      modal: false,
      currency: "",
    };
  },
  methods: {
    toWallet(value) {
      console.log(value);
    },
    handleClick(tab) {
      console.log(tab.name);
      if (tab.name == "second") {
        this.currency = "FPW";
        this.setTransactions();
      } else if (tab.name == "third") {
        this.currency = "FIDLE";
        this.setTransactions();
      } else {
        this.currency = "";
        this.setTransactions();
      }
    },
    closeUpgrade() {
      this.upgrade = !this.upgrade;
    },
    openModal(val) {
      console.log(val);
      this.trx_id = val;
      this.modal = true;
    },
    closeModal() {
      this.modal = false;
    },

    setTransactions() {
      let _self = this;
      let currency = _self.currency;
      this.$store.dispatch("user/getTransactions", currency);
    },
  },

  beforeMount() {
    this.$store.dispatch("user/walletBalance");
  },

  computed: {
    user() {
      return this.$store.getters["auth/getUser"];
    },
    transactions() {
      return this.$store.getters["user/getTransactions"];
    },
    transaction() {
      return this.$store.getters["user/singleTransaction"];
    },
    loading(){
      return this.$store.getters["user/isLoading"]
    }
  },

  components: {
    MainWalletVue,
    FidleWalletVue,
    FdwWalletVue,
    UpgradeLevel,
    TransactionsView,
  },
};
</script>