<template>
  <div>
    <div>
      <div class="profile--card rounded--card">
        <div>
          <div
          v-if="user.current_profile_image"
          class="cover--area p-2"
          :style="{ 'background': `url(${user.current_profile_image.media.file})` }"
        >
        <p v-if="user.level" class="text-white"> {{ user.level.name }} </p>
        </div>
        <div
        v-else
          class="cover--area p-3"
          style="
            background: var(--main-color);
          "
        >
        
        <p v-if="user.level" class="text-white small"> {{ user.level.name }} </p>
        </div>
        </div>
        <div class="profile-card-photo">
                <img
                  v-if="user.current_profile_image"
                  :src="user.current_profile_image.media.file"
                  alt=""
                />
                <img
                  v-else
                  src="@/assets/img/no_user.png"
                  alt=""
                />
        </div>

        <div class="main-content px-3 pt-2 pb-3 text-center">
          <h6 @click="goToUser" class=" font-weight-bold" role="button"> {{ user.name }} </h6>
          <h6 class="text-secondary small" style="font-size:10px">@{{user.username}} </h6>
        </div>
        <hr class="m-0">
        <div class="p-3">
            <h6 class="text-secondary small mb-3">{{ user.followers_count }} Followers</h6>
            <h6 class="text-secondary small">{{ user.following_count }} Following</h6>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      user: {}
    }
  },
  methods:{
    getUser(){
      this.$axios.get('auth/users/me')
      .then((res)=>{
        this.user = res.data
      })
      .catch((err)=>{
        console.log(err);
      })
    },
    goToUser(){
      this.$router.push('/profile')
    }
  },
  mounted(){
    this.getUser()
  }
}
</script>