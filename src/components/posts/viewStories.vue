<template>
  <div>
    <div>
      <div class="rounded--card p-3">
        <div class="stories">
          <div class="d-flex align-items-center" style="gap: 30px">
            <div class="text-align-center">
              <div class="story--image add--story">
                <img
                  v-if="user.current_profile_image"
                  :src="user.current_profile_image.media.file"
                  alt=""
                />
                <img
                  v-else
                  src="https://media.istockphoto.com/photos/businessman-silhouette-as-avatar-or-default-profile-picture-picture-id476085198?k=6&m=476085198&s=612x612&w=0&h=5cDQxXHFzgyz8qYeBQu2gCZq1_TN0z40e_8ayzne0X0="
                  alt=""
                />
                <span class="add-story-icon" role="button" @click="createStory">
                  <IconComponent
                    icon="ant-design:plus-circle-filled"
                    style="color: var(--main-color)"
                  />
                </span>
              </div>
              <small>Your Story</small>
            </div>
            <div class="text-align-center" v-for="story in myStories.results" :key="story.id">
                <div class="story--image add--story">
                    <div class="text-type-story" v-if="story.media.file == null ">
                        <div class="text-content">
                            {{ story.content.slice(0, 5) }}
                        </div>
                    </div>
                    <img
                        v-else
                    src="https://images.askmen.com/1080x540/2016/01/25-021526-facebook_profile_picture_affects_chances_of_getting_hired.jpg"
                    alt=""
                    width="100%"
                    />
                
              </div>
              <small>Your Story</small>
            </div>
            <div class="text-align-center" v-for="story in stories.results" :key="story.id">
                <div class="story--image other--stories d-flex justify-content-center">
                    <div class="text-type-story" v-if="story.media.file == null ">
                        <div class="text-content">
                            {{ story.content.slice(0, 5) }}
                        </div>
                    </div>
                    <img
                        v-else
                        :src="story.media.file"
                        alt=""
                        width="100%"
                    />
                </div>
                 <small v-if="story.user"> {{ story.user.name }} </small>
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
      stories: [],
      myStories:[],
      user:{}
    };
  },
  methods: {
    createStory() {
      this.$router.push("/stories/create");
    },

    getStories() {
      this.$axios
        .get("user/single-stories-per-user")
        .then((res) => {
          console.log(res);
          this.stories = res.data
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getMyStories() {
      this.$axios
        .get("user/stories")
        .then((res) => {
          console.log(res);
          this.myStories = res.data
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getUser(){
      this.$axios.get('auth/users/me')
      .then((res)=>{
        this.user = res.data
      })
      .catch((err)=>{
        console.log(err);
      })
    }
  },
  mounted() {
    this.getStories();
    this.getMyStories();
    this.getUser()
  },
};
</script>