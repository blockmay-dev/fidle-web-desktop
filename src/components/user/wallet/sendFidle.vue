<template>
  <div>
    <div class="send-fidle-container">
      <!-- Step One  -->
      <div class="bg-white p-3 rounded-lg w-25">
        <h6 class="font-weight-bold mb-3" style="color: var(--main-color)">
          Send Options
        </h6>
        <div class="choose-send-options">
          <ul class="m-0">
            <li
              class="d-flex mb-3 align-items-center justify-content-between"
              role="button"
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
      <div class="bg-white p-3 rounded-lg w-50 wallet--user">
        <div>
          <h6 class="font-weight-bold mb-3" style="color: var(--main-color)">
            Send Fidle
          </h6>
          <div class="input--field">
            <input
              v-model="search"
              placeholder="Search for Username"
              @keyup="querySearch"
              @select="handleSelect"
            />
            <span><IconComponent icon="bytesize:search" /></span>
          </div>

          <div>
            <div class="users mt-3" v-for="item in results" :key="item.id">
              <div class="d-flex align-items-center justify-content-between">
                <div class="d-flex align-items-center" style="gap:10px">
                  <div class="send-fidle-photo">
                    <div v-if="item.current_profile_image">
                      <img
                        :src="item.current_profile_image.media.file"
                        alt=""
                      />
                    </div>
                    <div v-else>
                      <img
                        src="@/assets/img/no_user.png"
                        alt=""
                        width="100%"
                      />
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
                    <button >Send</button>
                  </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- To Wallet Address -->
      <div class="bg-white p-3 rounded-lg w-50 wallet--user">
        <div>
          <h6 class="font-weight-bold mb-3" style="color: var(--main-color)">
            Send Fidle
          </h6>
          <form action="">
            <div class="input--field">
              <el-input placeholder="Enter Wallet Address"> </el-input>
            </div>
            <div class="text-center">
              <button>Send</button>
            </div>
          </form>
        </div>
      </div>

      <!-- Step Three  -->
      <div class="bg-white p-3 rounded-lg w-25 preview--user">
        <div></div>
      </div>

      <!-- Step Four  -->
      <div class="">Send Fidle</div>

      <!-- Step Five  -->
      <div class="">Send Fidle</div>

      <!-- Step Six  -->
      <div class="">Send Fidle</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      links: [],
      state: "",
      search: "",
      results: "",
    };
  },
  methods: {
    querySearch() {
      let posts = this.links;
      let search = this.search.toLowerCase();
      const value = posts.filter(
        (elem) => elem.username.toLowerCase() == search
      );
      console.log(value);
      this.results = value;
    },
    loadAll() {
      // return [
      //   { "value": "vue", "link": "https://github.com/vuejs/vue" },
      //   { "value": "element", "link": "https://github.com/ElemeFE/element" },
      //   { "value": "cooking", "link": "https://github.com/ElemeFE/cooking" },
      //   { "value": "mint-ui", "link": "https://github.com/ElemeFE/mint-ui" },
      //   { "value": "vuex", "link": "https://github.com/vuejs/vuex" },
      //   { "value": "vue-router", "link": "https://github.com/vuejs/vue-router" },
      //   { "value": "babel", "link": "https://github.com/babel/babel" }
      //  ];
      this.$axios
        .get("user/following")
        .then((res) => {
          this.links = res.data.results;
          console.log(this.links);
          // return list
        })
        .catch((err) => {
          console.log(err);
        });
    },
    handleSelect(item) {
      console.log(item);
    },
  },
  mounted() {
    this.loadAll();
    //   this.links = this.loadAll();
    //   console.log(this.links);
  },
};
</script>