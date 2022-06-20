<template>
    <div class="sticky-top">
        <div class="app--navigation-bar py-3">
            <div class="app-nav-content container-fluid">
                <!-- Logo -->
                <div class="">
                    <img src="@/assets/img/logo.svg" width="50" alt="" />
                </div>

                <!-- Search Field -->
                <div>
                    <div class="nav-search-field">
                        <IconComponent icon="bytesize:search" style="color:var(--gray-500)"/>
                        <input type="search" name="" id="" placeholder="Search">
                    </div>
                </div>

                <!-- User Photo, Notifications and Go Live -->
                <div class="d-flex" style="gap:15px">
                    <div class="user-header-photo" role="button" @click="goToUser">
                        <img
                            v-if="user.current_profile_image"
                            :src="user.current_profile_image.media.file"
                            alt=""
                            />
                            <img
                            v-else
                            src="https://media.istockphoto.com/photos/businessman-silhouette-as-avatar-or-default-profile-picture-picture-id476085198?k=6&m=476085198&s=612x612&w=0&h=5cDQxXHFzgyz8qYeBQu2gCZq1_TN0z40e_8ayzne0X0="
                            alt=""
                            />
                    </div>
                    <div class="app-header-icon">
                        <IconComponent icon="bi:camera-video" style="color:#000; font-size: 20px;"/>
                    </div>
                    <!-- <div class="app-header-icon"> -->
                        
                        <el-dropdown>
                        <!-- <span class="el-dropdown-link">
                          Dropdown List<i class="el-icon-arrow-down el-icon--right"></i>
                        </span> -->
                        <div class="app-header-icon">
                          <div class="notification-icon">
                              <IconComponent icon="ion:notifications-outline" style="color:#000;font-size: 20px;"/>
                              <div class="notification--dot"></div>
                          </div>
                        </div>
                        <el-dropdown-menu slot="dropdown">
                          <el-dropdown-item v-for="notification in notifications" :key="notification.id">
                            <h6> {{ notification.title }} </h6>
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
  data(){
    return{
      user: {},
      notifications: []
    }
  },
  methods:{
    getUser(){
      this.$axios.get('auth/users/me')
      .then((res)=>{
        this.user = res.data
      })
      .catch((err)=>{
        console.log(err);
      })
    },
    goToUser(){
      this.$router.push('/profile')
    },
    getNotifications(){
      this.$axios.get('/user/notifications')
      .then((res)=>{
        console.log(res);
        let data = res.data.results;
        this.notifications = data.slice(0,5)
        // this.notifications = res.data.results
      })
      .catch((err)=>{
        console.log(err);
      })
    }
  },
  mounted(){
    this.getUser()
    this.getNotifications()
  }
}
</script>