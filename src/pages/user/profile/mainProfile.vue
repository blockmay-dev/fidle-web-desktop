<template>
  <div>
    <div class="profile--section p-3">
      <div>
        <div class="top--profile">
          <div
            v-if="user.current_profile_image"
            class="cover--area p-2"
            :style="{
              backgroundImage: `url(${user.current_profile_image.media.file})`,
            }"
          >
            <p v-if="user.level" class="text-white">{{ user.level.name }}</p>
          </div>
          <div
            v-else
            class="cover--area p-3"
            style="background: #b8b8b8"
          >
            <p v-if="user.level" class="text-white">{{ user.level.name }}</p>
          </div>
        </div>
      </div>
      <div class="user-content d-flex" v-if="user" style="gap: 30px">
        <div class="profile--photo">
          <img
            v-if="user.current_profile_image"
            :src="user.current_profile_image.media.file"
            alt=""
          />
          <img
            v-else
            src="@/assets/img/no_user.png"
            alt=""
          />
        </div>
        <div class="mt-4">
          <h2> {{ user.name }} </h2>
          <p>
            <span class="small" @click="editProfile" v-show="user.bio == '' " style="color:var(--main-color); text-decoration: underline !important"  role="button">Update Bio</span>
            <span>
              {{ user.bio }}
            </span>
          </p>
          <p>
             <span class="small" v-show="user.country "><IconComponent icon="akar-icons:location" /> <span> {{ user.city }}, {{ user.country }} </span></span>
          </p>
          <div class="row align-items-center mt-3">
            <div class="col-md-6">
              <div class="mt-2 d-flex align-items-center" style="gap: 20px">
                <span class="small"> {{ user.followers_count }}   Followers</span>
                <span class="small">{{ user.following_count }} Following</span>
              </div>
              <div class="d-flex align-items-center mt-3">
                  <div class="followers--photo" v-for="follower in followers" :key="follower.id">
                    <img
                        v-if="follower.current_profile_image"
                        :src="follower.current_profile_image.media.file"
                        alt=""
                    />
                    <img
                        v-else
                        src="@/assets/img/no_user.png"
                        alt=""
                    />
                </div>
              </div>
            </div>
            <div class="col-md-6 mr-auto">
              <div
                @click="editProfile"
                class="edit--profile d-flex align-items-center"
                style="gap: 10px"
                role="button"
              >
                <span>
                  <IconComponent icon="bx:edit-alt" />
                </span>
                <span>Edit Profile</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <hr class="mb-1" />
      <ul class="nav nav-tabs" id="myTab" role="tablist">
        <li class="nav-item" role="presentation">
          <router-link to="/profile"
            class="nav-link"
            id="home-tab"
            data-toggle="tab"
            href="javascript:void(0)"
            role="tab"
            aria-controls="home"
            aria-selected="true"
            >Post</router-link
          >
        </li>
        <li class="nav-item" role="presentation">
          <router-link to="/profile/media"
            class="nav-link"
            id="profile-tab"
            data-toggle="tab"
            href="javacript:void(0)"
            role="tab"
            aria-controls="profile"
            aria-selected="false"
            >Media</router-link
          >
        </li>
        <li class="nav-item" role="presentation">
          <router-link to="/profile/saved-posts"
            class="nav-link"
            id="contact-tab"
            data-toggle="tab"
            href="javascript:void(0)"
            role="tab"
            aria-controls="contact"
            aria-selected="false"
            >Saved</router-link
          >
        </li>
        <li class="nav-item" role="presentation">
          <router-link to="/profile/connections"
            class="nav-link"
            id="contact-tab"
            data-toggle="tab"
            href="javascript:void(0)"
            role="tab"
            aria-controls="connect"
            aria-selected="false"
            >Connects</router-link
          >
        </li>
         <li class="nav-item" role="presentation">
          <router-link to="/profile/nft-collections"
            class="nav-link"
            id="contact-tab"
            data-toggle="tab"
            href="javascript:void(0)"
            role="tab"
            aria-controls="nft"
            aria-selected="false"
            >NFT Collections</router-link
          >
        </li>
        <li class="nav-item" role="presentation">
          <router-link to="/profile/boosted-posts"
            class="nav-link"
            id="contact-tab"
            data-toggle="tab"
            href="javascript:void(0)"
            role="tab"
            aria-controls="boosted-posts"
            aria-selected="false"
            >Boosted Posts</router-link
          >
        </li>
      </ul>
    </div>

    <div class="mt-3">
      <router-view/>
    </div>


  <!-- Edit Profile  -->
  <EditProfile @close="close" v-show="profile"/>
  </div>
</template>

<script>
import EditProfile from '../../../components/user/profile/editProfile.vue';
export default {
    data() {
        return {
            profile: false,
        };
    },
    methods: {
      editProfile(){
        this.profile = !this.profile
      },
        close(){
          this.profile = false
        }
    },
    beforeMount(){
      this.$store.dispatch("user/getFollowers")
    },
    computed:{
      user(){
        return this.$store.getters["auth/getUser"]
      },
      followers(){
        return this.$store.getters['user/getFiveFollowers']
      }
    },
    components: { EditProfile }
};
</script>