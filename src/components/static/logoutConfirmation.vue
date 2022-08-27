<template>
  <div>
    <div class="logout--mask">
      <div class="logout--container">
        <div class="logout--content">
          <div class="logo mb-4 text-center">
            <img src="@/assets/img/logo.svg" width="50" alt="" />
          </div>
          <div>
            <h4 class="font-weight-bold text-center">Log out of Fidle?</h4>
            <p class="text-center small text-secondary">Are you sure you want to log out of Fidle? 
              you will be able to login again if you do.</p>
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
          <div v-show="loading"  class="logging--out">
            <i class="el-icon-loading" style="font-size:50px; color: #fff"></i>
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
    };
  },
  methods: {
    async logout() {
        this.$store.dispatch("auth/logout");
    },
    close() {
      this.$emit("close");
    },
  },
  computed:{
    loading(){
      return this.$store.getters["auth/isLoading"]
    }
  }
};
</script>
