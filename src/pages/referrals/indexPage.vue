<template>
  <div>
    <div class="container mt-4">
      <div>
        <h4 class="font-weight-bold">Referrals</h4>
      </div>

      <!-- <div class="fb-share-button" data-href="https://fidle.io" data-layout="button_count"><a target="_blank" 
      :href="share_link" >Share</a></div> -->

      <div class="referral--funds mt-3 d-flex" style="gap: 40px">
        <div
          class="wallet bg-white shadow-lg p-4 rounded-lg d-flex w-100"
          style="gap: 40px"
        >
          <div>
            <h6 class="text-secondary">Total Referral Balance</h6>
            <h3 class="mt-2">
              {{ dollarFilter2(referral_statistics.total_reward.USD) }}
            </h3>
            <h6 class="text-secondary fidle--price mt-2">
              ~{{ dollarFilter3(referral_statistics.total_reward.FIDLE) }} FIDLE
            </h6>
          </div>
          <div>
            <h6 class="" style="color:var(--blue-300)">Unclaimed Bonus</h6>
            <h3 class="mt-2">
              {{ dollarFilter2(referral_statistics.total_unclaimed_reward.USD) }}
            </h3>
            <h6 class="text-secondary fidle--price mt-2">
              ~{{ dollarFilter3(referral_statistics.total_unclaimed_reward.FIDLE) }} FIDLE
            </h6>
          </div>
          <div>
            <h6 class="text-secondary">Total Referrals</h6>
            <h3 class="mt-1">{{ referral_statistics.total_referrals }}</h3>
          </div>
        </div>

        <div class="referral--links bg-white rounded-lg shadow-lg p-3 w-100">
          <div class="d-flex align-items-center" style="gap: 30px">
            <img src="@/assets/img/award.png" width="10%" alt="" />
            <div class="w-100">
               <div class="referral--modes w-100 my-4">
                <div class="code w-100 d-flex align-items-center pr-2">
                    <input type="text" v-model="getUser.referral_code" readonly >
                    <i
                    class="el-icon-copy-document"
                    role="button"
                    @click.once="copyCode"
                    style="font-size: 20px;"
                  ></i>
                </div>
                <div class="link d-flex align-items-center pr-2">
                    <input type="text" v-model="referral_link" readonly >
                    <i
                    class="el-icon-copy-document"
                    role="button"
                    @click.once="copyLink"
                    style="font-size: 20px; color: #fff"
                  ></i>
                </div>
            </div>
            </div>
          </div>
        </div>
      </div>

      <!-- No Referred User Yet -->
      <div class="text-center mt-4" v-if="referrals.length === 0">
        <div class="top mb-3">
          <img src="@/assets/img/noNFT.svg" alt="" />
        </div>
        <h4 class="font-weight-bold" style="color: var(--main-color)">
          No Referred User yet
        </h4>
        <p class="small w-50 mx-auto my-3">
          Get up to 10% reward in Fidle coin when your friends sign up and
          upgrade on Fidle with your referral code
        </p>
        <button class="primary--btn w-25 small mx-auto" @click.once="copyLink">
          {{ message }}
        </button>
      </div>

      <!-- Refferred users  -->
      <div v-else>
        <div class="p-4 mt-4" style="background: #f0f4ff">
          <div
            class="d-flex align-items-center filter--referrals"
            style="gap: 10px"
          >
            <h5 class="font-weight-bold">Transaction History</h5>
            <div>
              <el-select
                v-model="value"
                @change="getValue"
                placeholder="Filter"
              >
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </div>
          </div>
          <div
            class="
              individual--referred
              my-3
              bg-white
              p-3
              rounded-lg
              row
              align-items-center
            "
            v-for="referral in referrals"
            :key="referral.id"
          >
            <div class="col-md-6 d-flex align-items-center" style="gap: 20px">
              <div class="referree--photo ">
                <img
                  v-if="referral.referee.current_profile_image"
                  :src="referral.referee.current_profile_image.media.file"
                  alt="User Profile Photo"
                />
                <img v-else src="@/assets/img/no_user.png" alt="" />
              </div>
              <div>
                <h5>You referred {{ referral.referee.name }}</h5>
              </div>
            </div>

            <div class="col-md-4">
              <h6>
                {{ timeStamp2(new Date(referral.date_created * 1000.0)) }}
              </h6>
            </div>

            <div class="col-md-2">
              <div class="d-flex align-items-center" style="gap: 20px">
                <div>
                  <h6
                    :class="
                      referral.has_reward ? 'text-success' : 'text-inactive'
                    "
                  >
                    ${{ referral.reward_usd }}
                  </h6>
                </div>
                <button
                  @click.once="claimReward(referral)"
                  v-if="referral.has_reward && !referral.has_claimed_reward"
                  :disabled="loading"
                  class="primary--btn"
                >
                  <span v-if="loading"> <i class="el-icon-loading"></i> </span>
                  <span v-else>Claim</span>
                </button>
                <span v-show="!referral.has_reward" class="text-danger">
                  Pending
                </span>
                <button
                  v-if="referral.has_claimed_reward"
                  class="primary--btn"
                  style="background-color: #8c8c8c"
                  disabled
                >
                  Claimed
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <el-dialog
      title=""
        :visible.sync="dialogTableVisible"
        width="40%"
        :before-close="handleClose"
      >
      <ReferralModal @closeModal = closeDialogModal />
      </el-dialog>
  </div>
</template>


<script async defer crossorigin="anonymous" src="https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v14.0" nonce="qo7rkkv2">
</script>
<script>
import ReferralModal from './referralModal.vue';
import {
  timeRange,
  sliceContent,
  dollarFilter,
  colorSplit,
  timeStamp2,
  dollarFilter2,
  dollarFilter3
} from "@/plugins/filter";
export default {
  components:{
    ReferralModal
  },
  data() {
    return {
      timeStamp2,
      timeRange,
      sliceContent,
      dollarFilter,
      colorSplit,
      dollarFilter2,
      dollarFilter3,
      message: "Copy Referral Link",
      options: [
        {
          value: "all",
          label: "All",
        },
        {
          value: "claimed",
          label: "Claimed",
        },
        {
          value: "unclaimed",
          label: "Unclaimed",
        },
      ],
      value: "",
      referral_link: '',
      share_link: "",
      dialogTableVisible: true
    };
  },
  methods: {
    getValue() {
      console.log(this.value);
    },
    handleClose(){
      this.$router.go(-1)
    },
    closeDialogModal(){
      this.dialogTableVisible = false
    },
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
    claimReward(referral) {
      this.$store.dispatch("user/claimReward", referral.id);
    },
  },
  beforeMount() {
    this.$store.dispatch("user/getReferrals");
    this.$store.dispatch("user/getReferralStatistics");
  },
  mounted(){
    this.referral_link = `https://fidle.io/r?referral_code=${this.getUser.referral_code}`,
    this.share_link = `https://www.facebook.com/sharer/sharer.php?u=https://fidle.io/r?referral_code=${this.getUser.referral_code}&amp;src=sdkpreparse`
    // this.referral_link = `https://fidle.io/r?referral_code=${this.getUser.referral_code}`
  },
  computed: {
    referrals() {
      return this.$store.getters["user/getReferrals"].results;
    },
    referral_statistics() {
      return this.$store.getters["user/getReferralStatistics"];
    },
    getUser() {
      return this.$store.getters["auth/getUser"];
    },
    loading() {
      return this.$store.getters["auth/isLoading"];
    },
  },
};
</script>