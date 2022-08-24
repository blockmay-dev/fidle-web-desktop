<template>
  <div>
    <div class="upgrade--level_mask">
      <div>
        <div class="text-right mb-3">
          <span @click="close" role="button">
            <IconComponent
              icon="ant-design:close-circle-outlined"
              color="#fff"
              style="font-size: 30px"
            />
          </span>
        </div>
        <h4 class="text-white text-center mb-3">Choose Your Upgrade Level</h4>
        <div class="d-flex" style="gap: 20px">
          <div
            class="
              upgrade--level_content
              d-flex
              flex-column
              justify-content-between
            "
            v-for="level in levels"
            :key="level.id"
          >
            <div class="mb-4 d-flex align-items-center justify-content-between">
              <div>
                <small> {{ level.name }} </small>
                <h5 class="upgrade--amount">
                  {{dollarFilter2(level.upgrade_fee)}}/ <sup>One Time</sup>
                </h5>
                <span style="font-size:14px"> {{ level.upgrade_fee_fidle }}<span style="font-size:10px">FIDLE</span> </span>
              </div>
              <div class="icon__box">
                <span class="icon">
                  <img
                    v-show="level.rank === 2"
                    src="@/assets/img/levels/premium.svg"
                    alt=""
                  />
                  <img
                    v-show="level.rank === 3"
                    src="@/assets/img/levels/gold.svg"
                    alt=""
                  />
                  <img
                    v-show="level.rank === 4"
                    src="@/assets/img/levels/ultimate.svg"
                    alt=""
                  />
                  <img
                    v-show="level.rank === 5"
                    src="@/assets/img/levels/boss.svg"
                    alt=""
                  />
                </span>
              </div>
            </div>
            <ul class="m-0">
              <li class="d-flex align-items-center small mb-3" style="gap: 8px">
                <span class="upgrade--level_check">
                  <IconComponent icon="bi:check-lg" />
                </span>
                <span>Create Post</span>
              </li>
              <li class="d-flex align-items-center small mb-3" style="gap: 8px">
                <span class="upgrade--level_check">
                  <IconComponent icon="bi:check-lg" />
                </span>
                <span>Like/Comment on Post</span>
              </li>
              <li class="d-flex align-items-center small mb-3" style="gap: 8px">
                <span class="upgrade--level_check">
                  <IconComponent icon="bi:check-lg" />
                </span>
                <span>Share Post</span>
              </li>
              <li class="d-flex align-items-center small mb-3" style="gap: 8px">
                <span class="upgrade--level_check">
                  <IconComponent icon="bi:check-lg" />
                </span>
                <span>Timely Withdrawals</span>
              </li>
              <hr />
              <li class="d-flex align-items-center small mb-3" style="gap: 8px">
                <span class="upgrade--level_check">
                  <IconComponent icon="bi:check-lg" />
                </span>
                <span v-show="level.rank === 2"
                  >Earn <b>1FPW</b> Per reaction</span
                >
                <span v-show="level.rank === 3"
                  >Earn <b>2FPW</b> Per reaction</span
                >
                <span v-show="level.rank === 4"
                  >Earn <b>3FPW</b> Per reaction</span
                >
                <span v-show="level.rank === 5"
                  >Earn <b>4FPW</b> Per reaction</span
                >
              </li>
              <li
                v-if="level.rank === 4 || level.rank === 5"
                class="d-flex align-items-center small mb-3"
                style="gap: 8px"
              >
                <span class="upgrade--level_check">
                  <IconComponent icon="bi:check-lg" />
                </span>
                <span>Go Live</span>
              </li>
            </ul>

            <div class="mt-4">
              <div
                v-if="loading === level.id"
                class="d-flex justify-content-center"
              >
                <div class="spinner-border" role="status">
                  <span class="sr-only">Loading...</span>
                </div>
              </div>
              <button @click="upgrade(level)">Upgrade</button>
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
  dollarFilter2
} from "@/plugins/filter";
import request from "@/config/axios";
export default {
  data() {
    return {
      timeStamp,
      timeRange,
      sliceContent,
      dollarFilter,
      colorSplit,
      dollarFilter2,
      levels: [],
      user: {},
      loading: false,
    };
  },
  methods: {
    upgrade(level) {
      this.loading = this.loading === level.id ? null : level.id;
      console.log(level);
      let payload = {
        level_id: level.id,
      };
      request()
        .post("user/upgrade-level/", payload)
        .then((res) => {
           console.log(res);
          this.$toastify({
            text: `${res.data.message}`,
            className: "info",
            style: {
              background: "green",
              fontSize: "13px",
              borderRadius: "5px",
            },
          }).showToast();
        })
        .catch((err) => {
          
          this.$toastify({
            text: `${err.response.data.error}`,
            className: "info",
            style: {
              background: "red",
              fontSize: "13px",
              borderRadius: "5px",
            },
          }).showToast();
          console.log(err.response.data.error)
        })
        .finally(() => {
          this.loading = false;
          this.close();
          this.$store.dispatch("auth/setUser")
          this.$store.dispatch("user/walletBalance");
          this.$store.dispatch("user/getTransactions", "")
        });
    },
    getLevels() {
      request()
        .get("levels/")
        .then((res) => {
          let levelsList = res.data;
          let editedList = levelsList.slice(Number(this.currentLevel), 5);
          this.levels = editedList;
          console.log(this.levels);
        })
        .catch((err) => {
          console.log(err)
        });
    },
    close() {
      this.$emit("close");
    },
  },
  mounted() {
    this.getLevels()
  },
  beforeMount() {},
  computed:{
    currentLevel(){
      return this.$store.getters['auth/getUser'].level.rank
    }
  }
};
</script>