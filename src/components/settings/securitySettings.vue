<template>
  <div>
    <div class="bg-white rounded-lg">
      <div class="p-4">
        <el-collapse v-model="activeName" accordion>
          <el-collapse-item name="1" title="Change Password">
            <div>
              <div class="mb-3">
                <span>Create a password that is 8 characters long</span>
              </div>
              <div class="change--password">
                <form action="">
                  <div class="mb-2">
                    <label class="d-block" for=""
                      >Current Password<sup class="text-danger">*</sup>
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
                    <small
                      class="text-danger"
                      v-show="errMessages.password"
                      v-for="err in errMessages.password"
                      :key="err"
                    >
                      *{{ err }}
                    </small>
                  </div>
                  <div class="mb-2">
                    <label class="d-block" for=""
                      >New Password<sup class="text-danger">*</sup>
                    </label>
                    <div class="input--field">
                      <input :type="type2" v-model="credentials.password" />
                      <div @click="showPassword2" role="button">
                        <IconComponent
                          class="text-secondary"
                          style="font-size: 20px"
                          :icon="icon2"
                        />
                      </div>
                    </div>
                    <span class="text-secondary small">Min. 8 Characters</span>
                    <small
                      class="text-danger"
                      v-show="errMessages.password"
                      v-for="err in errMessages.password"
                      :key="err"
                    >
                      *{{ err }}
                    </small>
                  </div>
                  <div class="mb-2">
                    <label class="d-block" for=""
                      >Confirm New Password<sup class="text-danger">*</sup>
                    </label>
                    <div class="input--field">
                      <input :type="type3" v-model="credentials.password" />
                      <div @click="showPassword3" role="button">
                        <IconComponent
                          class="text-secondary"
                          style="font-size: 20px"
                          :icon="icon3"
                        />
                      </div>
                    </div>
                    <small
                      class="text-danger"
                      v-show="errMessages.password"
                      v-for="err in errMessages.password"
                      :key="err"
                    >
                      *{{ err }}
                    </small>
                  </div>
                  <div class="settings--button">
                    <button>Save New Password</button>
                  </div>
                </form>
              </div>
            </div>
          </el-collapse-item>
          <el-collapse-item title="Create Pin" name="2">
            <span>Create a new pin that is 4 characters long</span>
            <el-alert
                class="mt-2"
                v-show="err"
                :title="err"
                type="error"
                show-icon>
            </el-alert>
            <div class="my-3">
                <label for="" class="d-block"> Enter Pin<span class="text-danger">*</span> </label>
                <PincodeInput
                v-model="set_pin.pin"
                placeholder="-"
                />
            </div>
             <div class="mb-3">
                <label for="" class="d-block"> Confirm Pin<span class="text-danger">*</span> </label>
                <PincodeInput
                v-model="set_pin.pin_confirmation"
                placeholder="-"
                />
            </div>
            <div v-if="completeLoading" class="mb-3">
            <div class="d-flex justify-content-center" >
              <div class="spinner-border" role="status">
                <span class="sr-only">Loading...</span>
              </div>
            </div>
          </div>
            <div class="mb-3 settings--button" v-else>
                <button @click="createPin">Create Pin</button>
            </div>
          </el-collapse-item>
          <el-collapse-item title="Change Pin" name="3">
            <span>Change your Pin</span>
            <el-alert
                class="mt-2"
                v-show="err2"
                :title="err2"
                type="error"
                show-icon>
            </el-alert>
            <div class="my-3">
                <label for="" class="d-block"> Current Pin<span class="text-danger">*</span> </label>
                <PincodeInput
                v-model="change_pin.old_pin"
                placeholder="-"
                />
            </div>
            <div class="mb-3">
                <label for="" class="d-block"> New Pin<span class="text-danger">*</span> </label>
                <PincodeInput
                v-model="change_pin.pin"
                placeholder="-"
                />
            </div>
            <div class="mb-3">
                <label for="" class="d-block"> Confirm Pin<span class="text-danger">*</span> </label>
                <PincodeInput
                v-model="change_pin.pin_confirmation"
                placeholder="-"
                />
            </div>
            <div v-if="loading2" class="mb-3">
            <div class="d-flex justify-content-center" >
              <div class="spinner-border" role="status">
                <span class="sr-only">Loading...</span>
              </div>
            </div>
          </div>
            <div v-else class="mb-3 settings--button">
                <button @click="changePin">Change Pin</button>
            </div>
          </el-collapse-item>
        </el-collapse>
      </div>
    </div>
  </div>
</template>

<script>
import request from "@/config/axios"
import PincodeInput from 'vue-pincode-input';
// The name can be different depending on your desire
export default {
    components:{
        PincodeInput
    },
  data() {
    return {
      errMessages: [],
      credentials: {
        password: "",
      },
      set_pin:{
        pin: '',
        pin_confirmation: ''
      },
      change_pin: {
        old_pin: '',
        pin: '',
        pin_confirmation: ''
      },
      type: "password",
      icon: "bi:eye-slash",
      type2: "password",
      icon2: "bi:eye-slash",
      type3: "password",
      icon3: "bi:eye-slash",
      activeName: "1",
      completeLoading: false,
      err: '',
      err2: '',
      loading2: false
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
    showPassword2() {
      if (this.type2 === "password") {
        this.type2 = "text";
        this.icon2 = "clarity:eye-line";
      } else {
        this.type2 = "password";
        this.icon2 = "bi:eye-slash";
      }
    },
    showPassword3() {
      if (this.type3 === "password") {
        this.type3 = "text";
        this.icon3 = "clarity:eye-line";
      } else {
        this.type3 = "password";
        this.icon3 = "bi:eye-slash";
      }
    },
    createPin(){
        this.completeLoading = true
        request().post('user/set-pin', this.set_pin)
        .then((res)=>{
             console.log(res);
            this.$message({
                message: 'Pin set succesfully.',
                type: 'success'
                });
        })
        .catch((err)=>{
            
            console.log(err.response.data.error);
            this.err = err.response.data.error
            return err;
        })
        .finally(()=>{
            this.completeLoading = false;
            this.set_pin = {}
        })
    },
    changePin(){
        this.loading2 = true
        request().post('user/change-pin', this.change_pin)
        .then((res)=>{
             
            this.$message({
                message: 'Pin Changed succesfully.',
                type: 'success'
                });
                console.log(res);
        })
        .catch((err)=>{
            
            console.log(err.response.data.error);
            this.err2 = err.response.data.error
            return err;
        })
        .finally(()=>{
            this.loading2 = false;
            this.change_pin = {}
        })
    }
  },
};
</script>