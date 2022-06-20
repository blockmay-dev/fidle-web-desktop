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
                <h5 class="upgrade--amount" v-show="level.rank === 2">
                  10 FIDLE/ <sup>One Time</sup>
                </h5>
                <h5 class="upgrade--amount" v-show="level.rank === 3">
                  32 FIDLE/ <sup>One Time</sup>
                </h5>
                <h5 class="upgrade--amount" v-show="level.rank === 4">
                  85 FIDLE/ <sup>One Time</sup>
                </h5>
                <h5 class="upgrade--amount" v-show="level.rank === 5">
                  180 FIDLE/ <sup>One Time</sup>
                </h5>
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
export default {
  data() {
    return {
      levels: [],
      user: {},
      loading: false,
      currentLevel: "",
    };
  },
  methods: {
    upgrade(level) {
      this.loading = this.loading === level.id ? null : level.id;
      console.log(level);
      let payload = {
        level_id: level.id,
      };
      this.$axios
        .post("user/upgrade-level/", payload)
        .then((res) => {
          console.log(res);
          this.$toastify({
            text: `res.data.message`,
            className: "info",
            style: {
              background: "green",
            },
          }).showToast();
        })
        .catch((err) => {
          console.log(err);
          this.$toastify({
            text: `Something went wrong`,
            className: "info",
            style: {
              background: "red",
            },
          }).showToast();
        })
        .finally(() => {
          this.loading = false;
          this.close();
        });
    },
    getLevels() {
      this.$axios
        .get("levels/")
        .then((res) => {
          console.log(res);
          let levelsList = res.data;
          let editedList = levelsList.slice(Number(this.currentLevel), 5);
          this.levels = editedList;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    close() {
      this.$emit("close");
    },
    getUser() {
      this.$axios
        .get("auth/users/me")
        .then((res) => {
          this.user = res.data;
          this.currentLevel = res.data.level.rank;
        })
        .catch((err) => {
          return err
        })
        .finally(() => {
          this.getLevels();
        });
    },
  },
  mounted() {
    this.getUser();
  },
  beforeMount() {},
};
</script>