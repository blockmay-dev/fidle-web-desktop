<template>
  <div>
    <div class="">
      <div>
        <div
          class="bg-white rounded-lg notifications-bar p-3 mb-3"
          v-for="notification in notifications"
          :key="notification.id"
          role="button"
          @click="goToNotification(notification)"
        >
          <div class="d-flex" style="gap:20px">
            <div>
              <span class="notification--type" v-if="notification.type">
                <IconComponent
                  v-show="notification.data.type == 'post_like'"
                  icon="flat-color-icons:like"
                />
                <IconComponent
                  v-show="notification.data.type == 'comment'"
                  icon="ep:comment"
                />
                <IconComponent
                  v-show="notification.data.type == 'post'"
                  icon="material-symbols:post-add"
                />
                <IconComponent
                  v-show="notification.data.type == 'follow'"
                  icon="carbon:user-follow"
                />
              </span>
            </div>
            <div>
              <p>{{ notification.title }}</p>
              <small style="color: var(--blue-300)">{{
                timeRange(new Date(notification.date_created * 1000.0))
              }}</small>
            </div>
          </div>
        </div>
        
        <div class="view--more_posts mb-3">
          <button @click="viewMore">View More</button>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import {
  timeRange,
  sliceContent,
  dollarFilter,
  colorSplit,
  timeStamp,
} from "@/plugins/filter";
export default {
  data() {
    return {
      timeStamp,
      timeRange,
      sliceContent,
      dollarFilter,
      colorSplit,
      page: 1
    };
  },
  methods: {
    goToNotification(notification){
        this.$axios.get(`user/notifications/${notification.id}`)
        .then((res)=>{
            console.log(res);
            this.goToPost(notification.data.post_id)
        })
        .catch((err)=>{
            return err;
        })
    },

    async viewMore(){
      this.page = this.page + 1
      this.loading = true;
      try {
        let res = await this.$axios.get(
          `user/notifications?page=${this.page}`, 
        );
        console.log(res.data);
        let newPosts = res.data.results
        for (let i = 0; i < newPosts.length; i++ ){
          let new_notifications = newPosts[i]
          console.log(new_notifications);
          this.$store.dispatch('updateNotification', { new_notifications })
        }
        
      } catch (error) {
        console.log(error);
      }
      this.loading = false
    },
    goToPost(val){
      this.$router.push({name: 'single-fidle', params:{id: val}})
    },
  },
  computed:{
    notifications(){
      let items = this.$store.getters["notifications/allNotifications"]
      const value = items.filter((elem) => !elem.read);
      return value
    }
  }
};
</script>