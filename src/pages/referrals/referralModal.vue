<template>
  <div>
    <div>
      <div>
        <div class="text-center">
            <div>
                <img src="@/assets/img/award.png" width="15%" alt="">
            </div>
            <h2 class="font-weight-bold mb-2 mt-3" style="color:#081742">Refer Friends & Get Rewards</h2>
            <div class="w-50 mx-auto">
                <p class="" style="color:#3F3F3F; font-size:14px">
                 Get up to 10% reward in Fidle coin when your friends sign up and
            upgrade on Fidle with your referral code
            </p>
            </div>
            <div class="mt-4" style="color: var(--blue-200)">
                <span><i class="el-icon-warning"></i></span>
                <span>How does this work?</span>
            </div>

            <div class="referral--modes my-4">
                <div class="code d-flex align-items-center pr-3">
                    <input type="text" v-model="getUser.referral_code" readonly >
                    <i
                    class="el-icon-copy-document"
                    role="button"
                    @click.once="copyCode"
                    style="font-size: 20px;"
                  ></i>
                </div>
                <div class="link d-flex align-items-center pr-3">
                    <input type="text" v-model="referral_link" readonly >
                    <i
                    class="el-icon-copy-document"
                    role="button"
                    @click.once="copyLink"
                    style="font-size: 20px; color: #fff"
                  ></i>
                </div>
            </div>

            <div>

            </div>

            <div>
                <button @click="referralPage" class="view--referral_performance">
                    <span>View Referral Performance</span>
                    <span> <i class="el-icon-right"></i> </span>
                </button>
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
      referral_link:"",
      share_link: ""
      };
    },
    methods:{
    copyLink() {
      navigator.clipboard.writeText(this.referral_link).then(
        (success) => {
          (this.action = "copied!"), console.log(success);
          this.$toastify({
            text: `Referral Link Copied`,
            className: "info",
            style: {
              background: "#333",
              fontSize: "13px",
              borderRadius: "5px",
              padding: "10px 20px",
            },
          }).showToast();
        },
        (err) => console.log("error", err)
      );
    },
    copyCode() {
      navigator.clipboard.writeText(this.getUser.referral_code).then(
        (success) => {
          console.log(success);
          this.$toastify({
            text: `Referral Code Copied`,
            className: "info",
            style: {
              background: "#333",
              fontSize: "13px",
              borderRadius: "5px",
              padding: "10px 20px",
            },
          }).showToast();
        },
        (err) => console.log("error", err)
      );
    },
    referralPage(){
        this.$emit("closeModal")
    }
    },
     mounted(){
    this.referral_link = `https://fidle.io/r?referral_code=${this.getUser.referral_code}`,
    this.share_link = `https://www.facebook.com/sharer/sharer.php?u=https://fidle.io/r?referral_code=${this.getUser.referral_code}&amp;src=sdkpreparse`
    // this.referral_link = `https://fidle.io/r?referral_code=${this.getUser.referral_code}`
  },
    
    computed:{
        getUser() {
      return this.$store.getters["auth/getUser"];
    },
    }
  };
</script>
