<template>
  <div class="profile--section p-3 mb-4">
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
                    src="@/assets/img/no_user.png"
                    alt=""
                  />
                </span>
                <div>
                  <h6 class=" follower--name text-capitalize"> {{ follower.name }} </h6>
                  <p class="small">{{ follower.followers_count }} Followers</p>
                </div>
              </div>
            </div>
            <!-- <div>
                <IconComponent icon="gg:more" style="font-size:25px" />
            </div> -->
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
                    src="@/assets/img/no_user.png"
                    alt=""
                  />
                </span>
                <div>
                  <h6 class="follower--name text-capitalize"> {{ following.name }} </h6>
                  <p class="small">{{ following.followers_count }} Followers</p>
                </div>
              </div>
            </div>
            <!-- <div>
                <IconComponent icon="gg:more" style="font-size:25px" />
            </div> -->
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
    };
  },
  methods: {
  },
  beforeMount(){
    this.$store.dispatch("user/getFollowers")
    this.$store.dispatch("user/getFollowing")
  },
  computed:{
    followers(){
      return this.$store.getters["user/getFollowers"]
    },
    followings(){
      return this.$store.getters["user/getFollowing"]
    }
  }
};
</script>