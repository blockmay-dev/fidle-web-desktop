<template>
  <div>
    <div>
      <div class="media--files profile--section p-3">
        <div class="media" v-for="media in mediaData" :key="media.id" @click="goToPost(media)" role="button">
          <div v-for="file in media.media" :key="file.id">
            <img v-if="file.extension == 'jpg' ||
                file.extension == 'png' ||
                file.extension == 'jpeg' ||
                file.extension == 'webp' ||
                file.extension == 'svg' " :src="file.file" alt="" width="100%" />
            <video v-else :src="file.file"  playsinline loop 
                     ></video>
          </div>
          <div class="overlay overlayLeft">
            <div class="d-flex h-100 align-items-center justify-content-center" style="gap:20px">
              <div class="text-white">
                <span> {{ media.comments_count }} </span>
                <IconComponent icon="la:comments-solid" />
              </div>
              <div class="text-white">
                <span> {{ media.likes_count }} </span>
                <IconComponent icon="flat-color-icons:like" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-show="empty">
          {{user.name}} has no media files
        </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      mediaFiles: [],
      id: this.$route.params.id,
      empty: false,
      user: ''
    };
  },
  methods: {
    goToPost(media){
      this.$router.push({name: 'single-fidle', params:{id: media.id}})
    },
  },
  mounted() {
    window.addEventListener('load', videoScroll);
window.addEventListener('scroll', videoScroll);

function videoScroll() {

  if ( document.querySelectorAll('video[autoplay]').length > 0) {
    var windowHeight = window.innerHeight,
        videoEl = document.querySelectorAll('video[autoplay]');

    for (var i = 0; i < videoEl.length; i++) {

      var thisVideoEl = videoEl[i],
          videoHeight = thisVideoEl.clientHeight,
          videoClientRect = thisVideoEl.getBoundingClientRect().top;

      if ( videoClientRect <= ( (windowHeight) - (videoHeight*.5) ) && videoClientRect >= ( 0 - ( videoHeight*.5 ) ) ) {
        thisVideoEl.play();
      } else {
        thisVideoEl.pause();
      }
    }
  }
}
  },
  computed: {
    mediaData() {
      return this.$store.getters["fidler/allMediaFiles"];
    },
  }
};
</script>