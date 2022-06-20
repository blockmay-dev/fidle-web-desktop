<template>
  <div>
    <div class="login--page-wrapper row">
      <div class="login--page-left-side col-md-6">
        <div class="login-page-content">
          <div class="login-page-header mb-4">
            <img src="@/assets/img/logo.svg" width="20%" alt="" />
            <div class="my-4">
              <h1 class="font-weight-bold">Sign in to Fidle</h1>
              <p class="small text-center text-secondary">
                Create Original Posts To Earn Money.
              </p>
            </div>
          </div>

          <div>
            <form action="" @submit.prevent="login()">
              <div class="mb-4">
                <label for="" class="d-block small"
                  >Username<sup class="text-danger">*</sup>
                </label>
                <input
                  type="text"
                  v-model="credentials.username"
                  class="input--text"
                />
                <small class="text-danger" v-show="errMessages.username" v-for="err in errMessages.username" :key="err"> *{{ err }} </small>
              </div>
              <div class="mb-3">
                <label class="d-block small" for=""
                  >Password<sup class="text-danger">*</sup>
                </label>
                <div class="input--field">
                  <input :type="type" v-model="credentials.password" />
                  <div @click="showPassword" role="button">
                    <IconComponent
                      class="text-secondary"
                      style="font-size: 20px"
                      :icon="icon"
                    />
                  </div>
                </div>
                <span class="text-secondary small">Min. 8 Characters</span>
                <small class="text-danger" v-show="errMessages.password" v-for="err in errMessages.password" :key="err"> *{{ err }} </small>
              </div>
              <div
                class="mb-3 d-flex justify-content-between align-items-center"
              >
                <div class="d-flex align-items-center" style="gap: 6px">
                  <input class="" type="checkbox" name="" id="" />
                  <span class="small">Remember Me</span>
                </div>
                <div class="">
                  <span
                    class="small d-block font-weight-bold"
                    role="button"
                    style="color: var(--main-color)"
                    >Forgot Password?</span
                  >
                </div>
              </div>
              <div class="mb-3 mt-5">
                <button>Sign In</button>
              </div>
              <div class="text-center">
                <span class="small"
                  >Don't have any account yet?
                  <span
                    class="font-weight-bold"
                    @click="goToLogin()"
                    role="button"
                    style="color: var(--main-color)"
                    >Sign Up</span
                  >
                </span>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div class="login--page-right-side col-md-6">
        <div class="text-center">
          <img
            src="@/assets/img/login-img.png"
            class="
              animated-content
              animate__animated animate__pulse animate__slow animate__infinite
              infinite
            "
            width="60%"
            alt=""
          />
          <div class="mt-1">
            <h1 class="text-white font-weight-bold">
              Get access to more <br />
              exciting packages.
            </h1>
          </div>
        </div>
      </div>
    </div>

    <AppLoader :loader="loader" />
  </div>
</template>

<script>
import "animate.css";
import AppLoader from "@/components/static/appLoader.vue";
export default {
  data() {
    return {
      type: "password",
      icon: "bi:eye-slash",
      credentials: {
        username: "",
        password: "",
      },
      loader: false,
      errMessages: {}
    };
  },
  methods: {
    showPassword() {
      if (this.type === "password") {
        this.type = "text";
        this.icon = "clarity:eye-line";
      } else {
        this.type = "password";
        this.icon = "bi:eye-slash";
      }
    },
    login() {
      this.loader = true;
      this.$http
        .post("/auth/token/login", this.credentials)
        .then((res) => {
          let token = res.data.auth_token;
          let user = res.data.user;
          this.$store.dispatch("login", { token, user });
          this.$router.push({name: "all-posts"})
        })
        .catch((err) => {
          this.errMessages = err.response.data
        })
        .finally(()=>{
            this.loader = false;
            this.credentials = {}
        })
    },
    goToLogin() {
      this.$router.push("/sign-up");
    },
  },
  components: { AppLoader },
};
</script>

<style>
.animated-content {
  --animate-duration: 4s;
}
</style>
