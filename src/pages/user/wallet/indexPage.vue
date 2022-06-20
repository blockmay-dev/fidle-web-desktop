<template>
  <div>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <div v-if="user.level">
        <div v-if="user.level.rank === 1" class="top">
          <div class="alert--top">
            <div class="d-flex align-items-center" style="gap: 8px">
              <span>
                <IconComponent icon="carbon:warning" />
              </span>
              <p
                role="button"
                style="
                  text-decoration: underline !important;
                  color: var(--blue-200);
                "
                @click="upgrade = !upgrade"
              >
                Upgrade your account
              </p>
            </div>
            <div class="mt-2">
              <p class="small" style="color: var(--blue-200)">
                This is a demo account for basic level. The money you make here
                will be reset once you upgrade your account
              </p>
            </div>
          </div>
        </div>
      </div>
      <el-tab-pane label="Wallet" name="first">
        <MainWalletVue />
      </el-tab-pane>
      <el-tab-pane label="Fidle Power" name="second">
        <FdwWalletVue />
      </el-tab-pane>
      <el-tab-pane label="Fidle Coin" name="third">
        <FidleWalletVue />
      </el-tab-pane>
    </el-tabs>

    <UpgradeLevel v-show="upgrade" @close="closeUpgrade" />
  </div>
</template>
<script>
import MainWalletVue from "./mainWallet.vue";
import FidleWalletVue from "./fidleWallet.vue";
import FdwWalletVue from "./fdwWallet.vue";
import UpgradeLevel from "@/components/user/wallet/upgradeLevel.vue";
export default {
  data() {
    return {
      activeName: "first",
      upgrade: false,
      user: {},
    };
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
    closeUpgrade() {
      this.upgrade = !this.upgrad;
    },
    getUser(){
      this.$axios
        .get("auth/users/me")
        .then((res) => {
          console.log(res);
          this.user = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  mounted() {
    this.getUser();
  },
  components: { MainWalletVue, FidleWalletVue, FdwWalletVue, UpgradeLevel },
};
</script>