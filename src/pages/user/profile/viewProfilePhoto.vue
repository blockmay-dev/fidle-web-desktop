<template>
  <div>
    <div>
      <div>
        <div class="view--profile_image">
          <img
            v-if="getProfilePhoto.current_profile_image"
            :src="getProfilePhoto.current_profile_image.media.file"
            alt=""
          />
          <img v-else src="@/assets/img/no_user.png" alt="" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    getProfilePhoto() {
      return this.$store.getters["auth/getUser"];
    },
  },
};
</script>