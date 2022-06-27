<template>
  <div class="sticky-top">
    <div class="app--navigation-bar py-3 pr-4">
      <div class="app-nav-content container-fluid">
        <!-- Logo -->
        <div class="" @click="goHome" role="button">
          <img src="@/assets/img/logo.svg" width="50" alt="" />
        </div>

        <!-- Search Field -->
        <div>
          <form action="" method="get" @submit.prevent="goToSearch">
            <div class="nav-search-field">
              <IconComponent
                icon="bytesize:search"
                style="color: var(--gray-500)"
              />
              <input
                type="search"
                v-model="search_item"
                name=""
                id=""
                placeholder="Search"
              />
            </div>
          </form>
        </div>

        <!-- User Photo, Notifications and Go Live -->
        <div class="d-flex" style="gap: 15px">
          <div class="user-header-photo" role="button" @click="goToUser">
            <img
              v-if="user.current_profile_image"
              :src="user.current_profile_image.media.file"
              alt=""
            />
            <img v-else src="@/assets/img/no_user.png" alt="" />
          </div>
          <div class="app-header-icon">
            <IconComponent
              icon="bi:camera-video"
              style="color: #000; font-size: 20px"
            />
          </div>

          <el-dropdown>
            <div class="app-header-icon">
              <div class="notification-icon">
                <el-badge :value="notifications_count" class="item">
                  <IconComponent
                    icon="ion:notifications-outline"
                    style="color: #000; font-size: 20px"
                  />
                </el-badge>
              </div>
            </div>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item
                v-for="notification in notifications"
                :key="notification.id"
              >
                <h6>{{ notification.title }}</h6>
                <small> {{ notification.body }} </small>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>

          <!-- </div> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {},
      search_item: "",
      unread: ''
    };
  },
  methods: {
    getUser() {
      this.$axios
        .get("auth/users/me")
        .then((res) => {
          this.user = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    goToUser() {
      this.$router.push("/profile");
    },
    goHome() {
      this.$router.push("/all-posts");
    },
    goToSearch() {
      let url = this.search_item;
      this.$router.push({ name: "search-results", query: { q: url } });
    },
    goToNotification(notification){
      // console.log(notification);
        this.$axios.get(`user/notifications/${notification.id}`)
        .then((res)=>{
            console.log(res);
            this.goToPost(notification.data.post_id)
        })
        .catch((err)=>{
            console.log(err);
        })
    },
    goToPost(val){
      this.$router.push({name: 'single-fidle', params:{id: val}})
    },
    getNotificationsStatistics2() {
      this.$axios
        .get("/notification-statistics")
        .then((res) => {
          console.log(res);
          let new_notificationsCount = res.data.unread;
          this.$store.dispatch('updateNotificationsCount', {new_notificationsCount})
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getNotifications() {
      this.$axios
        .get("/user/notifications")
        .then((res) => {
          console.log(res);
          let all_notifications = res.data.results;
           this.$store.dispatch('getNotifications', {all_notifications})
        })
        .catch((err) => {
          console.log(err);
        });
    },
     getNotificationsStatistics() {
      this.$axios
        .get("/notification-statistics")
        .then((res) => {
          console.log(res);
          let all_notificationsCount = res.data.unread;
          this.$store.dispatch('setNotificationsCount', {all_notificationsCount})
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  
  mounted() {
    this.getUser();
  },
  beforeMount(){
    this.getNotifications();
    this.getNotificationsStatistics()
  },
  computed:{
    notifications(){
      return this.$store.getters.getNotifications.slice(0,5)
    },
    notifications_count(){
      return this.$store.getters.getNotificationsCount
    },

  }
};
</script>