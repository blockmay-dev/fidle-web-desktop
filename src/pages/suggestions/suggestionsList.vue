<template>
  <div>
    <div>
      <div class="rounded--card">
        <div class="px-3 pt-3 d-flex align-items-center" style="gap: 30px">
          <svg
          @click="goBack"
          role="button"
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="1"
            style="width: 35px; height: 35px"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M7 16l-4-4m0 0l4-4m-4 4h18"
            />
          </svg>
          <h6 class="">Suggested for you</h6>
        </div>
        <div class="p-3">
          <!-- Suggestions Tabs -->
          <div
            class="d-flex align-items-center justify-content-between mb-3"
            v-for="suggestion in suggestions"
            :key="suggestion.id"
          >
            <div class="d-flex align-items-center" style="gap: 10px">
              <div class="messages-photo">
                <img
                  v-if="suggestion.current_profile_image"
                  :src="suggestion.current_profile_image.media.file"
                  alt=""
                />
                <img v-else src="@/assets/img/no_user.png" alt="" />
              </div>
              <div>
                <h6
                  class="text-capitalize"
                  role="button"
                  @click="goToUser(suggestion)"
                >
                  {{ suggestion.name }}
                </h6>
                <h6 class="small text-secondary">
                  {{ suggestion.followers_count }} Followers
                </h6>
              </div>
            </div>

            <div>
              <div
                class="followSuggestion"
                @click="followUser(suggestion)"
                role="button"
              >
                <button class="primary--btn">Follow</button>
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
    return {};
  },
  methods: {
    goBack(){
      this.$router.go(-1)
    },
    goToUser(suggestion) {
      this.$router.push({
        name: "suggestions",
        query: { fidler: suggestion.id },
      });
    },

    followUser(suggestion) {
      this.$store.dispatch("suggestions/followUser", suggestion.id);
    },
  },
  computed: {
    suggestions() {
      return this.$store.getters["suggestions/allSuggestions"];
    },
  },
};
</script>
