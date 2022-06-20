<template>
  <div class="profile--section p-3">
  <el-tabs v-model="activeName">
    <el-tab-pane label="Followers" name="first">
      <div class="row">
        <div class="col-md-6" v-for="follower in followers" :key="follower.id">
          <div class="d-flex justify-content-between align-items-center mt-3">
            <div class="">
              <div class="d-flex align-items-center" style="gap: 10px">
                <span class="connects--img">
                  <img
                    v-if="follower.current_profile_image"
                    :src="follower.current_profile_image.media.file"
                    alt=""
                  />
                  <img
                    v-else
                    src="https://media.istockphoto.com/photos/businessman-silhouette-as-avatar-or-default-profile-picture-picture-id476085198?k=6&m=476085198&s=612x612&w=0&h=5cDQxXHFzgyz8qYeBQu2gCZq1_TN0z40e_8ayzne0X0="
                    alt=""
                  />
                </span>
                <div>
                  <h6 class=" follower--name text-capitalize" role="button" @click="goToFollower(follower)"> {{ follower.name }} </h6>
                  <p class="small">{{ follower.followers_count }} Followers</p>
                </div>
              </div>
            </div>
            <div>
                <IconComponent icon="gg:more" style="font-size:25px" />
            </div>
          </div>
        </div>
      </div>
    </el-tab-pane>
    <el-tab-pane label="Following" name="second">
      <div class="row">
        <div class="col-md-6" v-for="following in followings" :key="following.id">
          <div class="d-flex justify-content-between align-items-center mt-3">
            <div class="">
              <div class="d-flex align-items-center" style="gap: 10px">
                <span class="connects--img">
                  <img
                    v-if="following.current_profile_image"
                    :src="following.current_profile_image.media.file"
                    alt=""
                  />
                  <img
                    v-else
                    src="https://media.istockphoto.com/photos/businessman-silhouette-as-avatar-or-default-profile-picture-picture-id476085198?k=6&m=476085198&s=612x612&w=0&h=5cDQxXHFzgyz8qYeBQu2gCZq1_TN0z40e_8ayzne0X0="
                    alt=""
                  />
                </span>
                <div>
                  <h6 class="follower--name text-capitalize" role="button" @click="goToUser(following)" > {{ following.name }} </h6>
                  <p class="small">{{ following.followers_count }} Followers</p>
                </div>
              </div>
            </div>
            <div>
                <IconComponent icon="gg:more" style="font-size:25px" />
            </div>
          </div>
        </div>
      </div>
    </el-tab-pane>
  </el-tabs>
  </div>
</template>
<script>
export default {
  data() {
    return {
      activeName: "first",
      followers: [],
      followings: []
    };
  },
  methods: {
    getFollowers() {
            this.$axios.get(`users/${this.id}/followers/`)
                .then((res) => {
                console.log(res);
                this.followers = res.data.results;
                console.log(this.followers);
            })
                .catch((err) => {
                console.log(err);
            });
        },
        goToFollower(follower){
        this.$router.push({name: 'fidler-profile', params:{id: follower.id}})
      },
      goToUser(following){
        this.$router.push({name: 'fidler-profile', params:{id: following.id}})
      },
        getFollowing() {
            this.$axios.get(`users/${this.id}/following/`)
                .then((res) => {
                console.log(res);
                this.followings = res.data.results;
                console.log(this.followings);
            })
                .catch((err) => {
                console.log(err);
            });
        }
  },
  mounted(){
    this.getFollowers()
    this.getFollowing()
  }
};
</script>