<template>
  <div>
    <div>
      <div class="rounded--card">
        <div
          class="px-3 pt-3 d-flex align-items-center justify-content-between"
        >
          <h6 class="">Suggested for you</h6>
          <h6 class="small text-secondary" @click="seeSuggestions" role="button">See all</h6>
        </div>
        <div class="p-3">
          <!-- Suggestions Tabs -->
          <div class="d-flex align-items-center justify-content-between  mb-3" v-for="suggestion in suggestions" :key="suggestion.id">
            <div class="d-flex align-items-center" style="gap: 10px">
              <div class="messages-photo">
                <img
                  v-if="suggestion.current_profile_image"
                  :src="suggestion.current_profile_image.media.file"
                  alt=""
                />
                <img
                  v-else
                  src="@/assets/img/no_user.png"
                  alt=""
                />
              </div>
              <div>
                <h6 class="text-capitalize" role="button" @click="goToUser(suggestion)"> {{ suggestion.name }} </h6>
                <h6 class="small text-secondary">{{ suggestion.followers_count }} Followers</h6>
              </div>
            </div>

            <div >
              <div class="suggested-header-icon"  @click="followUser(suggestion)" role="button" >
                <IconComponent icon="fluent:person-add-28-regular" style="font-size:22px" />
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
    return {
    };
  },
  methods: {
    seeSuggestions(){
      this.$router.push('/suggestions')
    },
    goToUser(suggestion){
        this.$router.push({name: 'fidler-profile', params:{id: suggestion.id}})
      },
    followUser(suggestion) {
        this.$store.dispatch("suggestions/followUser", suggestion.id)
    },
  },
  beforeMount(){
    this.$store.dispatch('suggestions/allSuggestions')
  },
  computed:{
    suggestions(){
      return this.$store.getters['suggestions/allSuggestions'].slice(0,5)
    }
  }
};
</script>
