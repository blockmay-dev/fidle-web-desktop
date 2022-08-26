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
          <div v-else class="cover--area p-3" style="background: #b8b8b8">
            <p v-if="user.level" class="text-white">{{ user.level.name }}</p>
          </div>
        </div>
      </div>
      <div class="user-content d-flex" style="gap: 30px">
        <div
          class="profile--photo"
          role="button"
          @click="dialogTableVisible = true"
        >
          <img
            v-if="user.current_profile_image"
            :src="user.current_profile_image.media.file"
            alt=""
          />
          <img v-else src="@/assets/img/no_user.png" alt="" />
        </div>
        <div class="mt-4">
          <h2 class="text-capitalize">{{ user.name }}</h2>
          <p>{{ user.bio }}</p>
          <p>
            <span class="d-flex" style="gap: 5px" v-if="user"
              ><IconComponent icon="akar-icons:location" />
              <small
                > Lives in {{ user.city }} {{ user.country }}
              </small></span
            >
          </p>
          <div class=" mt-3" >
            <div class="">
              <div class="d-flex align-items-center justify-content-between" style="gap:30px">
                <div class="mt-2 d-flex align-items-center" style="gap: 20px">
                  <span class="small">
                    {{ user.followers_count }} Followers</span
                  >
                  <span class="small"
                    >{{ user.following_count }} Following</span
                  >
                </div>
                <div class="d-flex align-items-center " style="gap: 20px">
                <div
                    class="
                      user-profile-action
                      d-flex
                      align-items-center
                      justify-content-center
                    "
                    style="gap: 5px"
                    role="button"
                    v-if="user.following"
                    @click="followUser"
                  >
                    <IconComponent
                      icon="ion:person-remove-outline"
                      style="font-size: 18px"
                    />
                    <span>Unfollow</span>
                  </div>
                  <div
                    class="
                      user-profile-action
                      d-flex
                      align-items-center
                      justify-content-center
                    "
                    style="gap: 5px"
                    role="button"
                    v-else
                    @click="followUser"
                  >
                    <IconComponent
                      icon="fluent:person-add-28-regular"
                      style="font-size: 18px"
                    />
                    <span>Follow</span>
                  </div>
                  
                  <!-- <div
                    v-if="user.following"
                    class="
                      user-profile-action
                      d-flex
                      align-items-center
                      justify-content-center
                    "
                    style="gap: 5px"
                    role="button"
                    @click="unFollowUser"
                  >
                    <IconComponent
                      icon="la:user-times"
                      style="font-size: 18px"
                    />
                    <span>Block</span>
                  </div> -->
                  <div
                    v-if="user.following"
                    class="user-profile-action d-flex align-items-center"
                    style="gap: 5px"
                    role="button"
                    @click="sendMessage"
                  >
                    <span>
                      <IconComponent
                        icon="mdi:message-reply-text-outline"
                        style="font-size: 18px"
                      />
                    </span>
                    <span>Message</span>
                  </div>
                </div>
              </div>
              <div class="d-flex align-items-center mt-3">
                <div
                  class="followers--photo"
                  v-for="follower in followers"
                  :key="follower.id"
                >
                  <img
                    v-if="follower.current_profile_image"
                    :src="follower.current_profile_image.media.file"
                    alt=""
                  />
                  <img v-else src="@/assets/img/no_user.png" alt="" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <hr class="mb-1" />
      <ul class="nav nav-tabs align-items-center" id="myTab" role="tablist">
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
        <li class="nav-item ml-auto" role="presentation">
          <div class="dropleft">
                        <span
                          role="button"
                          id="dropdownMenuButton"
                          data-toggle="dropdown"
                          aria-expanded="false"
                        >
                          <IconComponent
                            icon="akar-icons:more-horizontal"
                            style="font-size: 20px"
                          />
                        </span>
                        <div
                          class="dropdown-menu"
                          aria-labelledby="dropdownMenuButton"
                        >
                          <div
                            class="dropdown-item d-flex"
                            style="gap: 12px"
                            role="button"
                            @click="block_user = !block_user"
                          >
                            <span>
                              <IconComponent
                                :icon=" user.blocked ? 'la:user-times' : 'la:user-check' "
                                style="font-size:22px"
                              />
                            </span>
                            <span> {{ user.blocked ? "Unblock User" : "Block User"  }} </span>
                          </div>
                        </div>
                      </div>
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
          <PostViewVue />
        </div>
        <div
          class="tab-pane fade"
          id="profile"
          role="tabpanel"
          aria-labelledby="profile-tab"
        >
          <MediaViewVue />
        </div>
        <div
          class="tab-pane fade"
          id="connect"
          role="tabpanel"
          aria-labelledby="connect-tab"
        >
          <UserConnectsVue />
        </div>
      </div>
    </div>

    <!-- View Profile Photo -->
    <div class="view--user_photo">
      <el-dialog title="" :visible.sync="dialogTableVisible" width="40%">
        <ViewProfilePhoto @closeModal="closeDialogModal" />
      </el-dialog>
    </div>

    <!-- Confirm to Block User -->
    <ConfirmBlock v-if="block_user" @close="block_user = !block_user "/>
  </div>
</template>

<script>
import UserConnectsVue from "@/components/user/fidler/userConnects.vue";
import PostViewVue from "@/components/user/fidler/postView.vue";
import MediaViewVue from "../../components/user/fidler/mediaView.vue";
import ViewProfilePhoto from "./viewProfilePhoto.vue";
import ConfirmBlock from "./confirmBlock.vue";
export default {
  data() {
    return {
      followLoading: false,
      dialogTableVisible: false,
      block_user: false
    };
  },
  methods: {
    followUser() {
      var query = this.$route.query.fidler_id;
      this.$store.dispatch("fidler/followUser", query);
      this.$store.dispatch("suggestions/allSuggestions");
    },
    closeDialogModal() {
      this.dialogTableVisible = false;
    },
    sendMessage() {
      var query = this.$route.query.fidler_id;
      this.$router.push(`/message/m/${query}`);
      var user = this.$route.query.fidler_username;
      this.$store.dispatch("messages/getSingleMessage", user);
    },
  },
  beforeMount() {
    var query = this.$route.query.fidler_id;
    this.$store.dispatch("fidler/getFidler", query);
    this.$store.dispatch("fidler/getFollowers", query);
  },
  components: { UserConnectsVue, PostViewVue, MediaViewVue, ViewProfilePhoto, ConfirmBlock },
  computed: {
    user() {
      return this.$store.getters["fidler/getFidler"];
    },
    followers() {
      return this.$store.getters["fidler/getFiveFollowers"];
    },
  },
};
</script>