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
                <router-link to="/feeds">
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
                <router-link to="/referrals">
                  <span class="d-block text-center">
                    <IconComponent
                      icon="bi:share-fill"
                      style="font-size: 16px"
                    />
                  </span>
                  <div>
                    <span style="font-size: 14px">Refer Friends</span>
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
          <div class="app-header-icon video">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="0.7" style="width:35px; height:35px">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
            <div class="blinking--icon animate__animated animate__flash animate__infinite	infinite animate__slower"></div>
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
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="0.7" style="width:30px; height:30px">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
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
import 'animate.css';
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
      dialogTableVisible: false,
    };
  },
  methods: {
    goToNotification(notification){
        this.$axios.get(`user/notifications/${notification.id}`)
        .then((res)=>{
            this.goToPost(notification.data.post_id)
            return res
        })
        .catch((err)=>{
            return err
        })
    },
    goToReferral(){
      this.$emit("viewReferralModal")
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
        let newPosts = res.data.results
        for (let i = 0; i < newPosts.length; i++ ){
          let new_notifications = newPosts[i]
          this.$store.dispatch('updateNotification', { new_notifications })
        }
        
      } catch (error) {
       return error
      }
      this.loading = false
    },
    goToUser() {
      this.$router.push("/profile");
    },
    goHome() {
      this.$router.push("/feeds");
    },
    goToSearch() {
      let url = this.search_item;
      this.$router.push({ name: "search-results", query: { q: url } });
      this.$store.dispatch("extras/searchUsers", url)
      this.$store.dispatch("posts/searchPosts", url)
    },
  },
  beforeMount() {
    this.$store.dispatch("notifications/allNotifications")
    this.$store.dispatch("notifications/getNotificationsStatistics")
  },
  computed: {
    notifications() {
      return this.$store.getters["notifications/allNotifications"];
    },
    notifications_count() {
      return this.$store.getters["notifications/notificationsCount"];
    },
    user(){
      return this.$store.getters["auth/getUser"]
    }
  },
};
</script>