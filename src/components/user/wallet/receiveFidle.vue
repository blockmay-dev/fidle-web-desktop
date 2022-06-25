<template>
  <div>
    <div>
      <div class="receive--fidle_container">
        <div class="receive--fidle_content">
            <div @click="close" class="text-right mb-3" role="button">
                <IconComponent icon="ant-design:close-circle-outlined" style="font-size:20px"/>
            </div>
          <div class="text-center mb-3">
            <h4 class="">Receive Fidle</h4>
            <small class="text-secondary">Copy your fidle address or scan code to receive Fidle</small>
          </div>
          <div class="input--field">
            <input type="text" v-model="qrtext" readonly/>
            <span @click="copyAddress" role="button"> {{ action }} </span>
          </div>
          <div class="text-center mt-3">
            <h6 class="text-center mt-2">YOUR FIDLE QR CODE ADDRESS</h6>
            <div>
              <vue-qr :text="qrtext"></vue-qr>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VueQr from 'vue-qr'
export default {
    components:{
        VueQr
    },
  data() {
    return {
      qrtext: "",
      action: "copy"
    };
  },
    methods:{
        getWallet(){
            this.$axios.get('user/wallet')
            .then((res)=>{
                console.log(res);
                this.qrtext = res.data.address
            })
            .catch((err)=>{
                console.log(err);
            })
        },
        close(){
        this.$emit('close')
    },
    copyAddress(){
        navigator.clipboard.writeText(this.qrtext)
        .then ( 
            success => {this.action = 'copied!', console.log(success)},
            err => console.log("error", err)
        )
    }
    },
    
    beforeMount(){
        this.getWallet()
    }
  
};
</script>