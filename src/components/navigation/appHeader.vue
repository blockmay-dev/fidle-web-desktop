<template>
  <div class="sticky-top">
    <div class="app--navigation-bar py-3 pr-4">
      <div class="app-nav-content container-fluid">
        <!-- Logo -->
        <div class="" @click="goHome" role="button">
          <img src="@/assets/img/logo.svg" width="50" alt="" />
        </div>

        <!-- Search Field -->
        <div class="search--area">
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
                @keyup="searchItems"
              />
            </div>
          </form>
          <div class="search--response" v-show="search__item">
            <div class="d-flex justify-content-center">
              <span @click="goToSearch" class="w-100" role="button">
                {{ search_item }}
              </span>
              <span>
                <IconComponent
                  icon="bytesize:search"
                  style="color: var(--gray-500)"
                />
              </span>
            </div>
          </div>
        </div>

        <!-- User Photo, Notifications and Go Live -->
        <div class="d-flex" style="gap: 15px">
          <!-- Menu Icons  -->
          <div>
            <ul
              class="m-0 d-flex align-items-center top--nav mr-4"
              style="gap: 30px"
            >
              <li>
                <router-link to="/all-posts">
                  <span class="d-block text-center">
                    <IconComponent
                      icon="ci:home-alt-minus"
                      style="font-size: 16px"
                    />
                  </span>
                  <div>
                    <span style="font-size: 14px">Home</span>
                  </div>
                </router-link>
              </li>
              <li>
                <router-link to="/settings">
                  <span class="d-block text-center">
                    <IconComponent icon="clarity:settings-line" />
                  </span>
                  <div>
                    <span style="font-size: 14px">Settings</span>
                  </div>
                </router-link>
              </li>
              <li>
                <router-link to="/wallet">
                  <span class="d-block text-center">
                    <IconComponent icon="clarity:wallet-line" />
                  </span>
                  <div>
                    <span style="font-size: 14px">Wallet</span>
                  </div>
                </router-link>
              </li>
            </ul>
          </div>

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

          <div class="notifications--container">
            <el-popover placement="bottom" class="p-0" trigger="click">
            <div class="p-3 shadow-sm mb-3 d-flex align-items-center justify-content-between">
              <span class="font-weight-bold" style="color: #000"
                >NOTIFICATIONS <small class="notification--count"> {{ notifications_count.unread }} unread </small> </span
              >
              <small role="button" class="text-secondary"><router-link to="/notifications">View All >>></router-link> </small>
            </div>
            <div style="width: 300px; height: 400px; overflow-y: auto">
              <div v-for="notification in notifications" :key="notification.id" class="pr-2">
                <div
                  class="d-flex align-items-start py-2 notitfications-top"
                  style="gap: 10px"
                  role="button"
                  @click="goToNotification(notification)"
                   :class="{read: notification.read }"
                >
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
                    <p style="word-break: normal;">{{ notification.title }}</p>
                    <span style="color: var(--blue-300)">{{
                      timeRange(new Date(notification.date_created * 1000.0))
                    }}</span>
                  </div>
                  <div class="unread--dot ml-auto" v-show="!notification.read"></div>
                </div>
                <hr />
              </div>

              <div class="view--more_posts mb-3">
                <button @click="viewMore">View More</button>
              </div>
            </div>
            <!-- <el-button slot="reference">Click to activate</el-button> -->
            <div class="app-header-icon" slot="reference" role="button">
              <div class="notification-icon">
                <el-badge is-dot class="item">
                  <IconComponent
                    icon="ion:notifications-outline"
                    style="color: #000; font-size: 20px"
                  />
                </el-badge>
              </div>
            </div>
          </el-popover>
          </div>

          <!-- </div> -->
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
      search_item: "",
      unread: "",
      search__item: false,
      read: false,
      page: 1,
    };
  },
  methods: {
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
    searchItems() {
      this.search__item = true;
      if (this.search_item == "") {
        this.search__item = false;
      }
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
   
    getNotificationsStatistics2() {
      this.$axios
        .get("/notification-statistics")
        .then((res) => {
          console.log(res);
          let new_notificationsCount = res.data;
          this.$store.dispatch("updateNotificationsCount", {
            new_notificationsCount,
          });
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
          this.$store.dispatch("getNotifications", { all_notifications });
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
          let all_notificationsCount = res.data;
          this.$store.dispatch("setNotificationsCount", {
            all_notificationsCount,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },

  mounted() {
    this.getUser();
  },
  beforeMount() {
    this.getNotifications();
    this.getNotificationsStatistics();
  },
  computed: {
    notifications() {
      return this.$store.getters.getNotifications;
    },
    notifications_count() {
      return this.$store.getters.getNotificationsCount;
    },
    user(){
      return this.$store.getters.getUser
    }
  },
};
</script>