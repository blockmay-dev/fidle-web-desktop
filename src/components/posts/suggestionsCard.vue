<template>
  <div>
    <div>
      <div class="rounded--card">
        <div
          class="px-3 pt-3 d-flex align-items-center justify-content-between"
        >
          <h6 class="">Suggested for you</h6>
          <h6 class="small text-secondary">See all</h6>
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
                  src="https://media.istockphoto.com/photos/businessman-silhouette-as-avatar-or-default-profile-picture-picture-id476085198?k=6&m=476085198&s=612x612&w=0&h=5cDQxXHFzgyz8qYeBQu2gCZq1_TN0z40e_8ayzne0X0="
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
      suggestions: []
    };
  },
  methods: {
    getSuggestions() {
      this.$axios
        .get("users-suggestion/")
        .then((res) => {
          console.log(res.data);
          this.suggestions = res.data.results.slice(0,5);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    goToUser(suggestion){
        this.$router.push({name: 'fidler-profile', params:{id: suggestion.id}})
      },
    followUser(suggestion) {
        this.$axios.post(`users/${suggestion.id}/follow/`)
        .then((res)=>{
            console.log(res);
        })
        .catch((err)=>{
            console.log(err);
        })
        .finally(()=>{
            this.$notify({
              title: 'Awesome',
              message: `You are now following ${suggestion.name}`,
              position: 'bottom-right'
            });
            this.getSuggestions()
        })
    },
  },
  mounted(){
    this.getSuggestions()
  }
};
</script>
