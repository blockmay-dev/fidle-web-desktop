<template>
  <div>
    <div class="search--results p-3 rounded-lg">
      <div class="row">
        <div class="col-md-6" v-for="user in users" :key="user.id">
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
      users: [],
    };
  },
  methods: {
    getUsers() {
      let searchItem = this.$route.query.q;
      console.log(searchItem);
      this.$axios.get("users?search=" + searchItem).then((res) => {
        console.log(res.data);
        this.users = res.data.results;
        console.log(this.users);
      });
    },
    goToUser(user){
      this.$router.push({name: 'fidler-profile', params:{id: user.id}})
    },
  },
  mounted() {
    this.getUsers();
  },
};
</script>