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
      err: '',
      completeLoading: false,
      verified: false
    };
  },
  methods:{
    close(){
        this.$emit('close')
    },
    verify(){
        let payload = {
        pin: this.pin
    }
    this.$axios.post("user/verify-pin", payload)
    .then((res)=>{
        console.log(res);
        this.verified = true
    })
    .catch((err)=>{
        console.log(err);
        this.err = err.response.data.error
        this.pin = ''
    })
  },
  complete(){
    this.$emit('complete', this.pin);
    this.verified = false
    this.pin = ''
  }
  }
};
</script>