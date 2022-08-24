<template>
  <div>
    <div class="pin--code">
      <div
        class="bg-white p-3 rounded-lg w-25"
      >
        <div @click="close" class="text-right mb-3" role="button">
          <IconComponent
            icon="ant-design:close-circle-outlined"
            style="font-size: 20px"
          />
        </div>
        <el-alert v-show="err" :title="err" type="error" show-icon> </el-alert>
        <small v-show="err"> Go to <router-link to="/settings">settings</router-link> to set or change Pin</small>
        <div class="text-center mt-3" v-if="!verified">
          <div class="text-center">
            <h4 class="m-0">Enter Your Pin</h4>
            <p class="text-secondary" style="font-size: 12px">
              Enter your pin to confirm transaction
            </p>
          </div>
          <div class="mt-3">
            <PincodeInput v-model="pin" placeholder="-" />
          </div>
          <div v-if="completeLoading" class="mt-3">
            <div class="d-flex justify-content-center">
              <div class="spinner-border" role="status">
                <span class="sr-only">Loading...</span>
              </div>
            </div>
          </div>
          <div class="text-center verify--pin" v-else>
            <button @click.once="verify">Confirm</button>
          </div>
        </div>
       <div v-else>
        <div>
             <el-result icon="success" title="Verified" subTitle="Click continue to complete transaction"></el-result>
        </div>
         <div class="text-center verify--pin" >
            <button @click.once="complete">Continue</button>
          </div>
       </div>
      </div>
    </div>
  </div>
</template>

<script>
import PincodeInput from "vue-pincode-input";
export default {
  components: {
    PincodeInput,
  },
  data() {
    return {
      pin: "",
    };
  },
  methods:{
    close(){
        this.$emit('close')
    },
    async verify(){
      let payload = {
        pin: this.pin
    }
    this.$store.dispatch("user/verifyPin", payload)
      
  },
  complete(){
    this.$emit('complete', this.pin);
    this.$store.dispatch("user/removePinVerification")
    this.pin = ''
  },
  },
  computed:{
    verified(){
      return this.$store.getters["user/isPinVerified"]
    },
    completeLoading(){
      return this.$store.getters["user/isLoading"]
    },
    err(){
      return this.$store.getters["user/getError"]
    }
  }
  
};
</script>