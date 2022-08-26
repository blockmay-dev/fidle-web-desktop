<template>
  <div>
    <div class="send-fidle-container">
      <!-- Step One  -->
      <div class="bg-white p-3 rounded-lg w-25" v-show="step_one">
        <div @click="close" class="text-right mb-3">
          <IconComponent
            icon="ant-design:close-circle-outlined"
            style="font-size: 20px"
          />
        </div>
        <h4
          class="font-weight-bold text-center mb-3"
          style="color: var(--main-color)"
        >
          Send Options
        </h4>
        <div class="choose-send-options">
          <ul class="m-0">
            <li
              class="d-flex mb-3 align-items-center justify-content-between"
              role="button"
              @click="toUserSearch"
            >
              <span class="d-flex align-items-center" style="gap: 8px">
                <span class="icon">
                  <IconComponent icon="ci:user-check" />
                </span>
                <span style="font-size: 14px"> Send to Fidle User </span>
              </span>

              <span>
                <IconComponent icon="la:angle-right" />
              </span>
            </li>
            <li
              class="d-flex align-items-center justify-content-between"
              role="button"
              @click="toEnterWallet"
            >
              <span class="d-flex align-items-center" style="gap: 8px">
                <span class="icon">
                  <IconComponent icon="fluent:wallet-credit-card-24-regular" />
                </span>
                <span style="font-size: 14px"> Send to Address </span>
              </span>

              <span>
                <IconComponent icon="la:angle-right" />
              </span>
            </li>
          </ul>
        </div>
      </div>

      <!-- Step Two  -->

      <!-- To Existing User -->
      <div
        class="bg-white p-3 rounded-lg w-25 wallet--user"
        v-show="step_two_user"
      >
        <div @click="close" class="text-right mb-3">
          <IconComponent
            icon="ant-design:close-circle-outlined"
            style="font-size: 20px"
          />
        </div>
        <div>
          <h4
            class="font-weight-bold text-center mb-3"
            style="color: var(--main-color)"
          >
            Send Fidle
          </h4>
          <div class="input--field">
            <input
              v-model="search"
              placeholder="Search for Username"
              @keyup="querySearch"
              @select="handleSelect"
            />
            <span><IconComponent icon="bytesize:search" /></span>
          </div>

          <div v-if="loading" class="mt-3">
            <div class="d-flex justify-content-center">
              <div class="spinner-border" role="status">
                <span class="sr-only">Loading...</span>
              </div>
            </div>
          </div>
          <div v-else style="max-height: 400px; overflow-y: auto">
            <div class="users mt-3" v-for="item in results" :key="item.id">
              <div class="d-flex align-items-center justify-content-between">
                <div class="d-flex align-items-center" style="gap: 10px">
                  <div class="send-fidle-photo">
                    <div v-if="item.current_profile_image">
                      <img
                        :src="item.current_profile_image.media.file"
                        alt=""
                      />
                    </div>
                    <div v-else>
                      <img src="@/assets/img/no_user.png" alt="" width="100%" />
                    </div>
                  </div>
                  <div>
                    <h6 class="m-0">
                      {{ item.name }}
                    </h6>
                    <p class="text-secondary" style="font-size: 12px">
                      @{{ item.username }}
                    </p>
                  </div>
                </div>
                <div>
                  <button @click="goToAmount(item)">Send</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- To Wallet Address -->
      <div
        class="bg-white p-3 rounded-lg w-25 wallet--user"
        v-show="step_two_wallet"
      >
        <div @click="close" class="text-right mb-3">
          <IconComponent
            icon="ant-design:close-circle-outlined"
            style="font-size: 20px"
          />
        </div>
        <div>
          <h4
            class="font-weight-bold text-center mb-3"
            style="color: var(--main-color)"
          >
            Send Fidle
          </h4>
          <div class="input--field">
            <input
              type="text"
              v-model="dataObj.address"
              placeholder="Type or paste copied wallet address"
              required
            />
            <span
              class="text-white"
              style="
                background-color: var(--main-color);
                padding: 0.2rem 0.8rem;
                border-radius: 20px;
              "
              role="button"
              @click="pasteCopy"
              >paste</span
            >
          </div>
          <div class="text-center">
            <button @click="goToAmount2">Send</button>
          </div>
        </div>
      </div>

      <!-- Enter Amount and Description -->
      <div
        class="bg-white p-3 rounded-lg w-25 wallet--user"
        v-show="step_three"
      >
        <div @click="close" class="text-right mb-3">
          <IconComponent
            icon="ant-design:close-circle-outlined"
            style="font-size: 20px"
          />
        </div>
        <div class="">
          <div class="send-fidle-photo text-center mb-3">
            <div v-if="user.current_profile_image">
              <img :src="user.current_profile_image.media.file" alt="" />
            </div>
            <div v-else>
              <img src="@/assets/img/no_user.png" alt="" width="100%" />
            </div>
          </div>
          <div class="text-center">
            <h5 class="m-0">
              {{ user.name }}
            </h5>
            <p class="text-secondary" style="font-size: 14px">
              @{{ user.username }}
            </p>
          </div>
          <div class="amount--field mt-3">
            <span class="d-flex align-items-center currency" style="gap: 5px">
              <img src="@/assets/img/fidlecoin.svg" alt="" width="15" />
              <span>FDC</span>
            </span>
            <input
              type="number"
              @keyup="checkBalance"
              v-model="dataObj.amount"
              placeholder="0.0"
              required
            />
          </div>
          <span
            ><small>Available Balance:</small>
            {{ wallet_balances.FIDLE - dataObj.amount }}FIDLE
          </span>
          <div class="my-3">
            <input
              class="description"
              type="text"
              placeholder="Description(optional)"
            />
          </div>
          <div class="text-center">
            <button @click="goToSummary">Send</button>
          </div>
        </div>
      </div>

      <!-- Confirm Details  -->
      <div
        class="bg-white p-3 rounded-lg w-25 preview--user wallet--user"
        v-show="step_four"
      >
        <div @click="close" class="text-right mb-3">
          <IconComponent
            icon="ant-design:close-circle-outlined"
            style="font-size: 20px"
          />
        </div>
        <div class="">
          <div class="send-fidle-photo text-center mb-3" v-show="username">
            <div v-if="user.current_profile_image">
              <img :src="user.current_profile_image.media.file" alt="" />
            </div>
            <div v-else>
              <img src="@/assets/img/no_user.png" alt="" width="100%" />
            </div>
          </div>
          <div class="text-center" v-show="username">
            <h6 class="m-0">
              {{ user.name }}
            </h6>
            <p class="text-secondary" style="font-size: 12px">
              @{{ user.username }}
            </p>
          </div>
          <div class="mt-3">
            <hr v-show="username" />
            <div class="row" v-show="username">
              <h6 class="col-md-6">Username</h6>
              <h6 class="col-md-6">{{ dataObj.username }}</h6>
            </div>
            <hr />
            <div class="row" v-show="!username">
              <h6 class="col-md-6">Wallet Address</h6>
              <h6 class="col-md-6">{{ dataObj.address }}</h6>
            </div>
            <hr v-show="!username" />
            <div class="row">
              <h6 class="col-md-6">Amount</h6>
              <h6 class="col-md-6">{{ dataObj.amount }} FIDLE</h6>
            </div>
            <hr />
          </div>
          <div class="text-center">
            <button class="bg-secondary" @click="goBack">
              <IconComponent icon="eva:arrow-back-outline" /> Cancel
            </button>
            <button @click="goToPin">Confirm Transfer</button>
          </div>
        </div>
      </div>

      <!-- Enter Pin  -->
      <div
        class="bg-white p-3 rounded-lg w-25 preview--user wallet--user"
        v-show="step_five"
      >
        <div @click="close" class="text-right mb-3">
          <IconComponent
            icon="ant-design:close-circle-outlined"
            style="font-size: 20px"
          />
        </div>
        <el-alert v-show="err" :title="err" type="error" show-icon> </el-alert>
        <small v-show="err">
          Go to <router-link to="/settings/security">settings</router-link> to set or
          change Pin</small
        >
        <div class="text-center mt-3">
          <div class="text-center">
            <h4 class="m-0">Enter Your Pin</h4>
            <p class="text-secondary" style="font-size: 12px">
              Enter your pin to confirm transfer
            </p>
          </div>
          <div class="mt-3">
            <PincodeInput v-model="dataObj.pin" placeholder="-" />
          </div>
          <div v-if="completeLoading" class="mt-3">
            <div class="d-flex justify-content-center">
              <div class="spinner-border" role="status">
                <span class="sr-only">Loading...</span>
              </div>
            </div>
          </div>
          <div class="text-center" v-else>
            <button @click="done">Confirm Transfer</button>
          </div>
        </div>
      </div>

      <!-- Transfer Successful  -->
      <div
        class="bg-white p-3 rounded-lg w-25 preview--user wallet--user"
        v-show="step_six"
      >
        <div class="">
          <div class="text-center">
            <img src="@/assets/img/transfer_success.png" width="200px" alt="" />
          </div>
          <div class="text-center my-3">
            <h3 class="m-0 font-weight-bold" style="color: var(--main-color)">
              Transfer Successful
            </h3>
            <p class="text-secondary" style="font-size: 12px">
              Congratulations, transfer successful!!!
            </p>
          </div>
          <div class="text-center">
            <button @click="close">Ok</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import request from "@/config/axios"
import PincodeInput from "vue-pincode-input";
export default {
  components: {
    PincodeInput,
  },
  data() {
    return {
      links: [],
      state: "",
      search: "",
      user: {},
      step_one: true,
      step_two_user: false,
      step_two_wallet: false,
      step_three: false,
      step_four: false,
      step_five: false,
      step_six: false,
      dataObj: {
        pin: "",
        address: "",
        amount: 0,
        username: "",
        description: "",
      },
      username: true,
      completeLoading: false,
      err: "",
    };
  },
  methods: {
    checkBalance() {
      if (this.dataObj.amount > this.wallet_balances.FIDLE) {
        this.$toastify({
          text: `You can't send above your current wallet balance`,
          className: "info",
          style: {
            background: "red",
            fontSize: "13px",
            borderRadius: "5px",
            padding: "10px 20px",
          },
          offset: {
            x: 50, // horizontal axis - can be a number or a string indicating unity. eg: '2em'
            y: 10, // vertical axis - can be a number or a string indicating unity. eg: '2em'
          },
        }).showToast();
        this.dataObj.amount = "";
      }
    },
    toUserSearch() {
      this.step_two_user = true;
      this.step_one = false;
    },
    toEnterWallet() {
      this.step_two_wallet = true;
      this.step_one = false;
    },
    goToAmount(item) {
      request()
        .get(`users/${item.id}/`)
        .then((res) => {
          this.user = res.data;
          this.dataObj.username = res.data.username;
          console.log(this.dataObj.username);
        })
        .catch((err) => {
          return err;
        })
        .finally(() => {
          this.search = "";
          this.step_two_user = false;
          this.step_three = true;
        });
    },
    goToAmount2() {
      this.username = false;
      this.step_two_wallet = false;
      this.step_three = true;
    },
    goToSummary() {
      if (this.dataObj.amount == "") {
        alert("You must enter an amount");
      } else {
        this.step_three = false;
        this.step_four = true;
      }
    },
    goToPin() {
      this.step_four = false;
      this.step_five = true;
    },
    goBack() {
      this.step_three = true;
      this.step_four = false;
    },
    done() {
      console.log(this.username);
      this.completeLoading = true;
      if (this.username) {
        request()
          .post("user/wallet/share-fidle/", this.dataObj)
          .then((res) => {
            console.log(res);
            this.step_five = false;
            this.step_six = true;
            this.$store.dispatch("user/walletBalance");
            this.$store.dispatch("user/getTransactions", "")
          })
          .catch((err) => {
            console.log(err.response.data.error);
            this.err = err.response.data.error;
            this.dataObj.pin = "";
          })
          .finally(() => {
            this.completeLoading = false;
          });
      } else {
        this.completeLoading = true;
        request()
          .post("user/wallet/transfer-fidle/", this.dataObj)
          .then((res) => {
            console.log(res);
            this.step_five = false;
            this.step_six = true;
            this.$store.dispatch("user/walletBalance");
            this.$store.dispatch("user/getTransactions", "")
          })
          .catch((err) => {
            console.log(err.response.data.error);
            this.err = err.response.data.error;
          })
          .finally(() => {
            this.completeLoading = false;
          });
      }
    },
    close() {
      this.step_one = true;
      this.step_two_user = false;
      this.step_two_wallet = false;
      this.step_three = false;
      this.step_four = false;
      this.step_five = false;
      this.step_six = false;
      this.$emit("close");
      this.dataObj = {};
      this.$store.dispatch("fidler/clearSearchResults")
    },
    pasteCopy() {
      navigator.clipboard.readText().then((cliptext) => {
        this.dataObj.address = cliptext;
        (err) => alert(err);
      });
    },
    querySearch() {
      let _self = this;
      let search = _self.search;
      this.$store.dispatch("fidler/searchFidler", search)
    },
    handleSelect(item) {
      console.log(item);
    },
  },
  mounted() {},
  computed: {
    getUser(){
      return this.$store.getters['auth/getUser']
    },
    results(){
      return this.$store.getters["fidler/fidlerSearchResult"]
    },
    loading(){
      return !this.$store.getters["fidler/isLoading"]
    },
    wallet_balances() {
      var wallet;
      wallet = this.$store.getters["user/walletBalance"].main;
      return wallet;
    },
  },
};
</script>