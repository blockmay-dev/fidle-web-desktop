<template>
  <div>
    <div>
      <!-- Create  A Post  -->
      <div class="rounded--card p-3">
        <div>
          <div class="d-flex" style="gap: 20px">
            <div class="start-post-photo">
              <img
                v-if="user.current_profile_image"
                :src="user.current_profile_image.media.file"
                alt=""
              />
              <img v-else src="@/assets/img/no_user.png" alt="" />
            </div>
            <div class="start--post">
              <el-input
                type="textarea"
                :autosize="{ minRows: 2, maxRows: 5 }"
                placeholder="Start a Post"
                v-model="payload.content"
              >
              </el-input>
            </div>
          </div>
          <div class="media--preview mt-3" v-show="imgPreview">
            <img :src="imgSrc" alt="" />
            <div
              class="close-media-preview"
              role="button"
              @click="closePreview"
            >
              <IconComponent
                icon="ep:circle-close-filled"
                class="file--icons"
                style="font-size: 40px"
              />
            </div>
          </div>
          <div class="preview" v-show="videoPreview">
            <video class="uploaded__video" controls id="video_select_preview" />
            <div
              class="close-video-preview"
              role="button"
              @click="closeVideoPreview"
            >
              <IconComponent
                icon="ep:circle-close-filled"
                class="file--icons"
                style="font-size: 40px"
              />
            </div>
          </div>
        </div>

        <hr />
        <!-- Options of Posts  -->
        <div class="d-flex justify-content-between align-items-center">
          <div class="d-flex align-items-center" style="gap: 10px">
            <div class="actions--container" role="button" style="gap: 5px">
              <input
                @change="onFileChange"
                type="file"
                accept="image/*"
                id="choose-file"
                name="choose-file"
              />
              <label class="m-0" for="choose-file"
                ><IconComponent
                  icon="ic:outline-photo-size-select-actual"
                  class="file--icons"
                />
              </label>
            </div>
            <div class="actions--container" style="gap: 5px" role="button">
              <label for="video_select" role="button"
                ><IconComponent icon="akar-icons:video" class="file--icons"
              /></label>
              <input
                type="file"
                id="video_select"
                hidden
                accept="video/*"
                @change="showVideoPreview($event)"
              />
              <span></span>
            </div>
            <div class="actions--container" style="gap: 5px">
              <span
                ><IconComponent icon="bytesize:location" class="file--icons"
              /></span>
            </div>
          </div>

          <div>
            <button class="main--button" @click="createFidle">post</button>
          </div>
        </div>
      </div>

      <!-- Main Post Content  -->
      <div class="mb-4">
        <div class="">
          <el-skeleton style="" :loading="loading" animated :count="1">
            <template slot="template">
              <div class="rounded--card p-3 mt-3">
                <div>
                  <div class="row" style="margin: 0; align-items: center">
                    <div class="col-md-1" style="padding: 0">
                      <el-skeleton-item
                        variant="image"
                        style="
                          height: 50px;
                          width: 50px;
                          border-radius: 50%;
                          margin-bottom: 10px;
                        "
                      />
                    </div>
                    <div class="col-md-11" style="padding: 0">
                      <div class="row justify-content-between">
                        <div class="col-md-3">
                          <el-skeleton-item variant="text" class="" />
                          <el-skeleton-item
                            variant="text"
                            style="width: 80px"
                            class=""
                          />
                        </div>
                        <div class="col-md-1 text-right" style="padding: 0">
                          <el-skeleton-item variant="text" class="" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <el-skeleton-item variant="image" style="height: 500px" />
                <div style="padding-top: 14px">
                  <el-skeleton-item
                    variant="caption"
                    style="width: 100%; height: 60px"
                  />
                  <div
                    style="
                      display: flex;
                      justify-content: space-between;
                      margin-top: 20px;
                    "
                  >
                    <el-skeleton-item variant="caption" style="width: 15%" />
                    <el-skeleton-item variant="caption" style="width: 15%" />
                  </div>
                  <hr />
                  <div
                    style="
                      display: flex;
                      align-items: center;
                      justify-content: space-around;
                      margin-top: 16px;
                      margin-bottom: 16px;
                      height: 16px;
                    "
                  >
                    <el-skeleton-item variant="text" style="width: 15%" />
                    <el-skeleton-item variant="text" style="width: 15%" />
                    <el-skeleton-item variant="text" style="width: 15%" />
                  </div>
                  <hr />
                </div>
              </div>
            </template>
            <div>
              <div
                v-for="item in posts.results"
                :key="item.id"
                class="rounded--card p-3 mt-3"
                data-aos="fade-up"
              >
                <div>
                  <div
                    class="d-flex justify-content-between align-items-center"
                  >
                    <div
                      class="d-flex align-items-center mb-3"
                      style="gap: 15px"
                    >
                      <div class="start-post-photo">
                        <div v-if="item.user.current_profile_image">
                          <img
                            :src="item.user.current_profile_image.media.file"
                            alt=""
                          />
                        </div>
                        <div v-else>
                          <img
                            src="@/assets/img/no_user.png"
                            alt=""
                            width="100%"
                          />
                        </div>
                      </div>
                      <div>
                        <h6 class="font-weight-bold text-capitalize">
                          {{ item.user.name }}
                        </h6>
                        <p class="text-secondary small" style="font-size: 10px">
                          {{ timeStamp(new Date(item.date_created * 1000.0)) }}
                        </p>
                      </div>
                    </div>
                    <div class="d-flex align-items-center" style="gap:20px">
                      <!-- <div v-if="item.is_nft">
                        <span class="is--nft"> NFT </span>
                      </div> -->
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
                            @click="convertToNFT(item)"
                          >
                            <span>
                              <IconComponent
                                icon="icon-park-outline:weixin-market"
                              />
                            </span>
                            <span> Convert to NFT </span>
                          </div>
                          <div
                            class="dropdown-item d-flex"
                            style="gap: 12px"
                            role="button"
                            @click="promotePost(item)"
                          >
                            <span>
                              <IconComponent icon="carbon:analytics" />
                            </span>
                            <span> Promote Post </span>
                          </div>
                          <div
                            class="dropdown-item d-flex"
                            style="gap: 12px"
                            role="button"
                            @click="goToPost(item)"
                          >
                            <span>
                              <IconComponent
                                icon="icon-park-outline:blockchain"
                              />
                            </span>
                            <span> Verify on the Blockchain </span>
                          </div>
                        </div>
                        <!-- </div> -->
                      </div>
                    </div>
                  </div>

                  <div v-for="media in item.media" :key="media.id">
                    <img
                      v-if="
                        media.extension == 'jpg' ||
                        media.extension == 'png' ||
                        media.extension == 'jpeg' ||
                        media.extension == 'webp' ||
                        media.extension == 'svg'
                      "
                      :src="media.file"
                      alt=""
                      width="100%"
                      height="100%"
                      style="object-fit: cover; object-position: top"
                    />
                    <video v-else :src="media.file" playsinline loop></video>
                  </div>

                  <!-- Post Content -->
                  <div
                    class="main-writeup"
                    :class="{ active: item.media.length === 0 }"
                    :style="{
                      'background-image': `linear-gradient(45deg, ${colorSplit(
                        item.color
                      )}`,
                    }"
                  >
                    <div v-html="item.content"></div>
                  </div>
                  <!-- Number of Comments and Reactions  -->
                  <div class="my-3 d-flex justify-content-between">
                    <div class="d-flex align-items-center" style="gap: 10px">
                      <div>
                        <span class="amount">{{
                          dollarFilter(item.worth)
                        }}</span>
                      </div>
                      <div>
                        <span class="">{{ item.likes_count }} Likes </span>
                      </div>
                    </div>
                    <div>
                      <span class="" role="button" @click="getComments(item)">
                        {{ item.comments_count }} comment<span
                          v-show="item.comments_count > 1"
                          >s</span
                        >
                      </span>
                    </div>
                  </div>

                  <!-- Like, Comment and Share Post -->
                  <hr class="m-0" />
                  <div class="d-flex justify-content-around my-2">
                    <div
                      class="d-flex align-items-center reactions--container"
                      role="button"
                      style="gap: 10px"
                      @click="likePost(item)"
                    >
                      <IconComponent
                        icon="flat-color-icons:like"
                        style="font-size: 24px !important"
                        v-if="item.liked"
                      />
                      <IconComponent
                        v-else
                        icon="icon-park-outline:like"
                        style="color: red; font-size: 24px !important"
                        role="button"
                      />
                      <span>Like</span>
                    </div>
                    <div
                      role="button"
                      class="d-flex align-items-center reactions--container"
                      style="gap: 10px"
                      @click="getComments(item)"
                    >
                      <IconComponent
                        icon="bx:comment"
                        style="font-size: 24px"
                      />
                      <span>Comment</span>
                    </div>
                    <div
                      role="button"
                      class="d-flex align-items-center reactions--container"
                      style="gap: 10px"
                    >
                      <IconComponent icon="bx:share" style="font-size: 24px" />
                      <span>Share</span>
                    </div>
                  </div>
                  <hr class="m-0" />

                  <div class="comments mt-3" v-if="comments === item.id">
                    <div
                      class="comment--box d-flex align-items-end"
                      v-for="comment in commentsList"
                      :key="comment.id"
                      style="gap: 3px"
                    >
                      <div class="commenter-photo">
                        <img
                          v-if="comment.user.current_profile_image"
                          :src="comment.user.current_profile_image.media.file"
                          alt=""
                        />
                        <img v-else src="@/assets/img/no_user.png" alt="" />
                      </div>
                      <div class="main-comment">
                        <p>{{ comment.content }}</p>
                        <span class="like--comment" v-if="comment.has_liked"
                          ><IconComponent
                            icon="flat-color-icons:like"
                            style="font-size: 24px !important"
                        /></span>
                        <span
                          class="like--comment"
                          @click="likeComment(item, comment)"
                          role="button"
                          v-else
                          ><IconComponent
                            icon="icon-park-outline:like"
                            style="color: red; font-size: 24px !important"
                            role="button"
                        /></span>
                      </div>
                    </div>
                    <div
                      class="
                        start--post
                        add-comment
                        d-flex
                        align-items-center
                        mt-3
                      "
                      style="gap: 20px"
                    >
                      <div class="commenter-photo">
                        <img
                          v-if="user.current_profile_image"
                          :src="user.current_profile_image.media.file"
                          alt=""
                        />
                        <img v-else src="@/assets/img/no_user.png" alt="" />
                      </div>
                      <div class="w-100">
                        <form action="" class="form">
                          <el-input
                            width="100%"
                            type="textarea"
                            id="textarea2"
                            :autosize="{ minRows: 2, maxRows: 5 }"
                            placeholder="Add a Comment"
                            v-model="valueInput"
                          >
                          </el-input>
                          <div
                            class="your-input-box"
                            @click="toogleDialogEmoji(item)"
                            role="button"
                          >
                            <IconComponent
                              icon="fluent:emoji-32-regular"
                              style="font-size: 20px"
                              color="var(--main-color)"
                            />
                          </div>
                          <div
                            class="your-input-box"
                            @click="postComment(item)"
                            role="button"
                          >
                            <IconComponent
                              icon="akar-icons:send"
                              style="font-size: 20px"
                              color="var(--main-color)"
                            />
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                  <VEmojiPicker
                    v-show="showDialog == item.id"
                    :pack="emojisNative"
                    labelSearch="Search"
                    class="emojis"
                    style="
                       {
                        width: 4px;
                      }
                    "
                    @select="onSelectEmoji"
                  />
                </div>
              </div>
            </div>
          </el-skeleton>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { VEmojiPicker } from "v-emoji-picker";
import packEmoji from "@/api/emojis.js";
import {
  timeRange,
  sliceContent,
  dollarFilter,
  colorSplit,
  timeStamp,
} from "@/plugins/filter";
export default {
  components: {
    VEmojiPicker,
  },
  data() {
    return {
      promote_post: false,
      postStatistics: null,
      comments: false,
      showDialog: false,
      timeStamp,
      timeRange,
      sliceContent,
      dollarFilter,
      colorSplit,
      loading: false,
      connection: null,
      content: "",
      isActive: false,
      imgPreview: false,
      payload: {
        media: {},
        content: "",
      },
      imgSrc: "",
      disabled: true,
      videoPreview: false,
      loader: false,
      valueInput: "",
      singlePost: {},
    };
  },
  methods: {
    convertToNFT(item) {
      this.$router.push({
        path: "/convert-post-to-nft",
        query: { post_id: item.id },
      });
    },
    shareToFeed(item) {
      let payload = {
        parent_id: item.id,
      };
      this.$axios
        .post("user/", payload)
        .then((res) => {
          return res;
        })
        .catch((err) => {
          return err;
        });
    },
    shareWithContent(item) {
      let payload = {
        parent_id: item.id,
      };
      this.$axios
        .post("user/", payload)
        .then((res) => {
          return res;
        })
        .catch((err) => {
          return err;
        });
    },
    onCopy: function (e) {
      console.log(e);
      this.$message({
        showClose: true,
        message: "Copied",
        type: "info",
      });
    },
    onError: function () {
      console.log("Failed to copy texts");
    },
    async getComments(item) {
      this.comments = this.comments === item.id ? null : item.id;
      console.log(this.comments);
      if (this.comments) {
        this.$store.dispatch("user/viewComments", item.id);
      }
    },

    likeComment(item, comment) {
      let payload = {
        post_id: item.id,
        comment_id: comment.id,
      };
      this.$store.dispatch("user/likeComment", payload);
    },
    async postComment(item) {
      let formData = new FormData();
      formData.append("content", this.valueInput);
      let payload = {
        payload: formData,
        id: item.id,
      };
      this.$store.dispatch("user/addComment", payload);
      this.valueInput = "";
    },
    onSelectEmoji(dataEmoji) {
      let text = this.valueInput;
      var curPos = document.getElementById("textarea2").selectionStart;
      console.log(curPos);
      let text_to_insert = dataEmoji.data;
      this.valueInput =
        text.slice(0, curPos) + text_to_insert + text.slice(curPos);
      // Optional
      this.toogleDialogEmoji();
    },
    toogleDialogEmoji(item) {
      this.showDialog = this.showDialog === item.id ? null : item.id;
    },
    createFidle() {
      let formData = new FormData();
      formData.append("content", this.payload.content);
      formData.append("media", this.payload.media);
      formData.append("_method", "POST");
      this.$store.dispatch("user/createPost", formData);
      this.payload = {};
      this.closePreview();
      this.closeVideoPreview();
    },

    async viewMore() {
      this.page = this.page + 1;
      // this.loading = true;
      try {
        let res = await this.$axios.get(`/user/feeds?page=${this.page}`);
        console.log(res.data);
        let newPosts = res.data.results;
        for (let i = 0; i < newPosts.length; i++) {
          this.posts.push(newPosts[i]);
        }
      } catch (error) {
        return error;
      }
      // this.loading = false
    },
    getPost(item) {
      this.verify = true;
      this.$store.dispatch("user/singlePost", item.id);
    },

    goToUser(item) {
      this.$router.push({
        name: "fidler-profile",
        params: { id: item.user.id },
      });
    },

    showVideoPreview($event) {
      var input = event.target;
      this.videoPreview = true;
      this.imgPreview = false;
      this.payload.media = input.files[0];
      console.log(this.payload.media);
      if ($event.target.files.length > 0) {
        var src = URL.createObjectURL(event.target.files[0]);
        var preview = document.getElementById("video_select_preview");
        preview.src = src;
        preview.style.display = "block";
        this.isActive = false;
      }
    },
    onFileChange(e) {
      // alert('Hello World')
      this.imgPreview = true;
      var input = e.target;
      this.payload.media = input.files[0];
      console.log(this.payload.media);
      if (e.target.files.length > 0) {
        var src = URL.createObjectURL(e.target.files[0]);
        this.imgSrc3 = src;
        this.isActive = false;
        // document.getElementById('message').style.backgroundImage = null;
        // this.payload.color = "";
      }
    },
    async likePost(item) {
      this.$store.dispatch("user/likePost", item.id);
    },
    switchDisabled() {
      if (this.payload.content !== "") {
        this.disabled = false;
      }
    },
    closePreview() {
      this.imgPreview = false;
    },
    closeVideoPreview() {
      this.videoPreview = false;
    },
    async sharePost(item) {
      navigator.share({
        title:
          "Fidle The worlds first decentralized social network for creators",
        text: "",
        url: "https://fidle-desktop/fidle" + item.id,
      });
    },
  },
  mounted() {
    window.addEventListener("load", videoScroll);
    window.addEventListener("scroll", videoScroll);

    function videoScroll() {
      if (document.querySelectorAll("video[autoplay]").length > 0) {
        var windowHeight = window.innerHeight,
          videoEl = document.querySelectorAll("video[autoplay]");

        for (var i = 0; i < videoEl.length; i++) {
          var thisVideoEl = videoEl[i],
            videoHeight = thisVideoEl.clientHeight,
            videoClientRect = thisVideoEl.getBoundingClientRect().top;

          if (
            videoClientRect <= windowHeight - videoHeight * 0.5 &&
            videoClientRect >= 0 - videoHeight * 0.5
          ) {
            thisVideoEl.play();
          } else {
            thisVideoEl.pause();
          }
        }
      }
    }
  },
  created() {},
  beforeMount() {
    this.$store.dispatch("user/allPosts");
  },
  computed: {
    emojisNative() {
      return packEmoji;
    },
    user() {
      return this.$store.getters["auth/getUser"];
    },
    posts() {
      return this.$store.getters["user/allPosts"];
    },
    commentsList() {
      return this.$store.getters["user/allComments"];
    },
    post() {
      return this.$store.getters["user/getSinglePost"];
    },
  },
};
</script>