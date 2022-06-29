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
            <span  v-shw style="color:var(--main-color); text-decoration: underline !important" role="button">Update Bio</span>
            <span>
              {{ user.bio }}
            </span>
          </p>
          <p>
             <IconComponent icon="akar-icons:location" /> <span> {{ user.city }}, {{ user.country }} </span>
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
                @click="profile = !profile"
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
          <a
            class="nav-link active"
            id="home-tab"
            data-toggle="tab"
            href="#home"
            role="tab"
            aria-controls="home"
            aria-selected="true"
            >Post</a
          >
        </li>
        <li class="nav-item" role="presentation">
          <a
            class="nav-link"
            id="profile-tab"
            data-toggle="tab"
            href="#profile"
            role="tab"
            aria-controls="profile"
            aria-selected="false"
            >Media</a
          >
        </li>
        <li class="nav-item" role="presentation">
          <a
            class="nav-link"
            id="contact-tab"
            data-toggle="tab"
            href="#contact"
            role="tab"
            aria-controls="contact"
            aria-selected="false"
            >Saved</a
          >
        </li>
        <li class="nav-item" role="presentation">
          <a
            class="nav-link"
            id="contact-tab"
            data-toggle="tab"
            href="#connect"
            role="tab"
            aria-controls="connect"
            aria-selected="false"
            >Connects</a
          >
        </li>
      </ul>
    </div>

    <div class="mt-3">
      <div class="tab-content" id="myTabContent">
        <div
          class="tab-pane fade show active"
          id="home"
          role="tabpanel"
          aria-labelledby="home-tab"
        >
          <PostViewVue/>
        </div>
        <div
          class="tab-pane fade"
          id="profile"
          role="tabpanel"
          aria-labelledby="profile-tab"
        >
          <MediaViewVue/>
        </div>
        <div
          class="tab-pane fade"
          id="contact"
          role="tabpanel"
          aria-labelledby="contact-tab"
        >
          <SavedPosts/>
        </div>
        <div
          class="tab-pane fade"
          id="connect"
          role="tabpanel"
          aria-labelledby="connect-tab"
        >
          <UserConnectsVue/>
        </div>
      </div>
    </div>


  <!-- Edit Profile  -->
  <EditProfile v-show="profile" @close="close"/>
  </div>
</template>

<script>
import UserConnectsVue from '@/components/user/profile/userConnects.vue';
import PostViewVue from '@/components/user/profile/postView.vue';
import MediaViewVue from '../../../components/user/profile/mediaView.vue';
import SavedPosts from '../../../components/user/profile/savedPosts.vue';
import EditProfile from '@/components/user/profile/editProfile.vue';
export default {
    data() {
        return {
            user: {},
            followers: [],
            profile: false,
        };
    },
    methods: {
        getUser() {
            this.$axios.get("auth/users/me")
                .then((res) => {
                console.log(res);
                this.user = res.data;
            })
                .catch((err) => {
                console.log(err);
            });
        },
        getFollowers() {
            this.$axios.get("user/followers")
                .then((res) => {
                console.log(res);
                let followers = res.data.results;
                console.log(followers);
                this.followers = followers.slice(0, 5);
            })
                .catch((err) => {
                console.log(err);
            });
        },
        close(){
          this.profile = false
        }
    },
    mounted() {
        this.getUser();
        this.getFollowers();
    },
    components: { UserConnectsVue, PostViewVue, MediaViewVue, SavedPosts, EditProfile }
};
</script>