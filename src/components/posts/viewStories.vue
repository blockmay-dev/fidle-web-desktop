<template>
  <div>
    <div>
      <div class="rounded--card p-3">
        <div class="stories">
          <div class="d-flex align-items-center" style="gap: 30px">
            <div class="text-align-center">
              <div class="story--image add--story" >
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
                <span class="add-story-icon" role="button" @click="createStory">
                  <IconComponent
                    icon="ant-design:plus-circle-filled"
                    style="color: var(--main-color)"
                  />
                </span>
              </div>
              <small>Your Story</small>
            </div>
            <div class="text-align-center" v-for="story in myStories" :key="story.id">
                <div class="story--image other--stories" role="button" @click="goToStory">
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
              <span style="font-size:11px">{{ story.user.name.slice(0, 8) }}...</span>
            </div>
            <!-- <div class="text-align-center" v-for="story in stories" :key="story.id">
                <div class="story--image other--stories d-flex justify-content-center" role="button" @click="goToStory">
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
            </div> -->
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
    createStory() {
      this.$router.push("/stories/create");
    },
    goToStory(){
      this.$router.push('/stories/view')
    },
    
  },
  mounted() {
  },
  beforeMount(){
    this.$store.dispatch('stories/getStories')
  },
  computed:{
    myStories(){
      return this.$store.getters['stories/getStories'].results
    },
    stories(){
      return this.$store.getters.getStories
    },
    user(){
      return this.$store.getters["auth/getUser"]
    }
  }
};
</script>