<template>
  <div>
    <div class="follow">
      <div class="follow-content">
        <div class="mb-3 text-center">
          <img src="@/assets/img/logo.svg" width="60" alt="" />
        </div>
        <div class="text-center mb-4">
          <h1 class="font-weight-bold" style="color: var(--main-color)">
            Follow your first five fidlers for fids and visibility.
          </h1>
        </div>
        <div>
          <div
            class="
              single--follow
              d-flex
              align-items-center
              justify-content-between
              mt-4
            "
            v-for="suggestion in getFiveSuggestions"
            :key="suggestion.id"
          >
            <div class="d-flex align-items-center" style="gap: 10px">
              <div class="follower--dp">
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
              <div class="following--dp">
                <h5 class="text-capitalize">
                  {{ suggestion.first_name }} {{ suggestion.last_name }}
                </h5>
                <div
                  class="following-images d-flex align-items-center"
                  style="gap: 3px"
                >
                  <span class="text-secondary small">Followed By </span>
                  <span class="small" style="color: var(--main-color)">
                    {{ suggestion.followers_count }} others
                  </span>
                  <div>
                   </div>
                </div>
              </div>
            </div>
            <div class="">
              <button
                v-if="suggestion.following"
                @click.once="unFollow(suggestion)"
                class="secondary--btn"
              >
                Following
              </button>
              <button
                v-else
                class="primary--btn"
                @click.once="followUser(suggestion)"
              >
                <span v-if="loading">Loading</span>
                <span v-else>Follow</span>
              </button>
            </div>
          </div>

          <div class="mt-4">
            <button class="primary--btn" @click="goToFeeds()" v-if="checkNumberofFollows.length === 5">Continue</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import request from '@/config/axios.js'
export default {
  data() {
    return {
      true_follows: [],
      loading: false,
      counter: 0,
    };
  },
  methods: {
      goToFeeds(){
          this.$router.push({name: "feeds"})
      },
    followUser(suggestion) {
        this.loading = true
        request().post(`users/${suggestion.id}/follow/`)
        .then((res)=>{
            this.counter++
            console.log(res);
        })
        .catch((err)=>{
            return err;
        })
        .finally(()=>{
            this.$store.dispatch("extras/listUsers")
        })
        this.loading = false
    },
  },
  beforeMount(){
    this.$store.dispatch("extras/listUsers")
  },
  computed: {
    getFiveSuggestions() {
      let dataSug = this.$store.getters["extras/getAllUsers"].results;
      return dataSug.slice(1, 6);
    },
    checkNumberofFollows(){
      const value = this.getFiveSuggestions.filter((elem) => elem.following);
        console.log(value);
        return value
    }
    
  },
};
</script>