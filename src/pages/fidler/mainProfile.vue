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
            style="background: var(--main-color)"
          >
            <p v-if="user.level" class="text-white">{{ user.level.name }}</p>
          </div>
        </div>
      </div>
      <div class="user-content d-flex" style="gap: 30px">
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
          <h2 class="text-capitalize"> {{ user.name }} </h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut quod id
            labore obcaecati eum, non voluptas facilis illo molestiae facere
            optio quos soluta, assumenda vitae nam? Suscipit quaerat et illo.
          </p>
          <div class="d-flex justify-content-between mt-3">
            <div class="">
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
            <div>
              <div
                class="user-profile-action d-flex align-items-center justify-content-center"
                style="gap: 10px"
                role="button"
                v-if="!user.following"
                @click="followUser"
              >
                <span>Follow</span>
              </div>
              <div
                v-else
                class="user-profile-action d-flex align-items-center"
                style="gap: 10px"
                role="button"
              >
                <span>
                  <IconComponent icon="ci:message" />
                </span>
                <span>Send Message</span>
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
            href="#connect"
            role="tab"
            aria-controls="connect"
            aria-selected="false"
            >Connects</a
          >
        </li>
      </ul>
    </div>

    <div class=" mt-3">
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
          id="connect"
          role="tabpanel"
          aria-labelledby="connect-tab"
        >
          <UserConnectsVue/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import UserConnectsVue from '@/components/user/fidler/userConnects.vue';
import PostViewVue from '@/components/user/fidler/postView.vue';
import MediaViewVue from '../../components/user/fidler/mediaView.vue';
export default {
    data() {
        return {
            user: {},
            followers: [],
            id: this.$route.params.id,
            followLoading: false
        };
    },
    methods: {
      followUser() {
        this.followLoading = true
        this.$axios.post(`users/${this.id}/follow/`)
        .then((res)=>{
            console.log(res.data.message);
            this.$notify({
              message: ` You are now following ${this.user.name}`,
              position: 'bottom-right'
            });
        })
        .catch((err)=>{
            console.log(err);
        })
        .finally(()=>{
            this.getPosts();
            this.followLoading = false;
        })
    },
        getUser() {
            this.$axios.get("users/"+this.id+'/')
                .then((res) => {
                console.log(res);
                this.user = res.data;
            })
                .catch((err) => {
                console.log(err);
            });
        },
        getFollowers() {
            this.$axios.get(`users/${this.id}/followers`)
                .then((res) => {
                console.log(res);
                let followers = res.data.results;
                console.log(followers);
                this.followers = followers.slice(0, 5);
            })
                .catch((err) => {
                console.log(err);
            });
        }
    },
    mounted() {
        this.getUser();
        this.getFollowers();
    },
    components: { UserConnectsVue, PostViewVue, MediaViewVue }
};
</script>