<template>
  <div>
    <div class="logout--mask">
      <div class="logout--container">
        <div class="logout--content">
          <div class="logo mb-4 text-center">
            <img src="@/assets/img/logo.svg" width="50" alt="" />
          </div>
          <div v-if="!loading">
            <h4 class="font-weight-bold text-center">Are you Sure?</h4>
            <p class="text-center small text-secondary">You can always log back in at any time.</p>
            <div class="mt-4">
              <button class="logout w-100" @click="logout">
                Logout
              </button>
            </div>
            <div class="mt-2">
              <button class="cancel w-100" @click="close">
                Cancel
              </button>
            </div>
          </div>
          <div v-else>
            <p>Logging out ...</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {
  },
  data() {
    return {
      loading: false,
    };
  },
  methods: {
    async logout() {
      
    this.loading = true;
      try {
        let res = await this.$axios.post("/auth/token/logout/");
        console.log(res);
        this.$store.dispatch("logout");
      } catch (error) {
        console.log(error.response);
      }
      this.loading = false;
      this.$router.push("/");
    },
    close() {
      this.$emit("close");
    },
  },
};
</script>
