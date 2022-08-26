<template>
  <div>
    <div>
      <!-- List of Blocked Users  -->
      <div class="bg-white p-4 rounded-lg mb-3">
        <h5>Blocked Users</h5>
        <div>
            <div v-if="blockedUser.length === 0 ">
                <p class="text-secondary mt-3">
                    You have no blocked Users yet
                </p>
            </div>
          <div
            class="
              my-2
              bg-white
              p-2
              d-flex justify-content-between
              rounded-lg
              align-items-center
            "
            v-for="item in blockedUser"
            :key="item.id"
          >
            <div class="d-flex align-items-center" style="gap: 20px">
              <div class="referree--photo">
                <img
                  v-if="item.current_profile_image"
                  :src="item.current_profile_image.media.file"
                  alt="User Profile Photo"
                />
                <img v-else src="@/assets/img/no_user.png" alt="" />
              </div>
              <div>
                <h5>{{ item.name }}</h5>
                <p class="small text-secondary">{{ "@" + item.username }}</p>
              </div>
            </div>

            <div class="">
              <div
                class="unblock--button d-flex"
                style="gap: 8px"
                role="button"
                @click="unblockUser(item)"
              >
                <span>
                  <IconComponent
                    icon="la:user-check"
                    style="font-size: 22px"
                  />
                </span>
                <span>
                  Unblock User
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods:{
     unblockUser(item){
      this.$store.dispatch("fidler/unblockUser", item.id);
    }
  },
  beforeMount() {
    this.$store.dispatch("fidler/getBlockedUsers");
  },
  computed: {
    blockedUser() {
      return this.$store.getters["fidler/getBlockedUsers"];
    },
  },
};
</script>