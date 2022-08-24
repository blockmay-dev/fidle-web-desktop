<template>
  <div>
    
    <div class="search--results p-3 mb-4 rounded-lg">
      <div class="" v-show="users.count === 0">
        No results found
      </div>
      <div class="row">
        <div class="col-md-6" v-for="user in users.results" :key="user.id">
          <div class="d-flex justify-content-between align-items-center mt-3">
            <div class="">
              <div class="d-flex align-items-center" style="gap: 10px">
                <span class="connects--img">
                  <img
                    v-if="user.current_profile_image"
                    :src="user.current_profile_image.media.file"
                    alt=""
                  />
                  <img v-else src="@/assets/img/no_user.png" alt="" />
                </span>
                <div>
                  <h6 class="follower--name text-capitalize">
                    {{ user.name }}
                  </h6>
                  <p class="small">{{ user.followers_count }} Followers</p>
                </div>
              </div>
            </div>
            <div>
              <button class="view--more" @click="goToUser(user)">View More</button>
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
    return {
    };
  },
  methods: {
    goToUser(user){
      this.$router.push({name: 'fidler-profile', params:{id: user.id}})
    },
  },
  computed:{
    users(){
      return this.$store.getters["extras/getUserResult"]
    }
  }
};
</script>