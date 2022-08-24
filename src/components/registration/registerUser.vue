<template>
  <div>
    <div>
      <form action="" @submit.prevent="goToNext()">
      <div class="mb-3">
          <div class="d-flex align-items-center" style="gap:20px">
            <div class="w-100">
              <label for="" class="d-block small"
                >First Name<sup class="text-danger">*</sup>
              </label>
              <input type="text" v-model="payload.first_name"  class="input--text" />
              <small class="text-danger" v-show="errMessages.first_name" v-for="err in errMessages.first_name" :key="err"> *{{ err }} </small>
            </div>
             <div class="w-100">
              <label for="" class="d-block small"
                >Last Name<sup class="text-danger">*</sup>
              </label>
              <input type="text" v-model="payload.last_name"  class="input--text" />
              <small class="text-danger" v-show="errMessages.last_name" v-for="err in errMessages.last_name" :key="err"> *{{ err }} </small>
            </div>
          </div>
        </div>
        <div class="mb-3">
          <label for="" class="d-block small"
            >Username<sup class="text-danger">*</sup>
          </label>
          <input type="text" v-model="payload.username" class="input--text" />
          <small class="text-danger" v-show="errMessages.username" v-for="err in errMessages.username" :key="err"> *{{ err }} </small>
        </div>
         
        <div class="mb-3">
          <label for="" class="d-block small"
            >Email<sup class="text-danger">*</sup>
          </label>
          <input type="text" v-model="payload.email" class="input--text" />
          <small class="text-danger" v-show="errMessages.email" v-for="err in errMessages.email" :key="err"> *{{ err }} </small>
        </div>
        <div class="mb-4 d-flex" style="gap:20px">
        <div>
            <label class="d-block small" for=""
            >Password<sup class="text-danger">*</sup>
          </label>
          <div class="input--field">
            <input :type="type" v-model="payload.password"/>
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
        <div>
          <label class="d-block small" for=""
            >Confirm Password<sup class="text-danger">*</sup>
          </label>
          <div class="input--field">
            <input :type="type" v-model="payload.re_password"/>
            <div @click="showPassword" role="button">
              <IconComponent
                class="text-secondary"
                style="font-size: 20px"
                :icon="icon"
              />
            </div>
          </div>
          <small class="text-danger" v-show="errMessages.re_password" v-for="err in errMessages.re_password" :key="err"> *{{ err }} </small>
        </div>
        </div>

        <div class="mb-3">
          <label for="" class="d-block small"
            >Referrral Code
          </label>
          <input type="text" v-model="payload.referral_code" class="input--text" />
        </div>
       
        <div class="mt-3">
          <button>Next</button>
        </div>
      </form>
    </div>
  </div>
</template>


<script>
export default {
  data() {
      return{
        type: 'password',
        icon: 'bi:eye-slash',
        payload:{
          first_name: '',
          last_name: '',
          username: '',
          password: '',
          re_password: '',
          email: '',
          referral_code: ""
        },
        errMessages: {}
      }
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
    goToNext() {
      this.$http.post('/auth/users/', this.payload)
      .then((res)=>{
        this.backgroundLogin();
        this.$router.push('/sign-up/complete-profile')
        this.payload = {}
        return res
      })
      .catch((err)=>{
        console.log(err.response.data);
        this.errMessages = err.response.data
      })
    },
    backgroundLogin(){
      let credentials = {
        username: this.payload.username,
        password: this.payload.password
      }
      this.$store.dispatch("auth/userLogin", credentials)
    }
  },
  mounted(){
    let code = this.$route.query.referral_code;
    this.payload.referral_code = code;
  }
};
</script>