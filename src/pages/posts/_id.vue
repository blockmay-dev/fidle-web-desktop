<template>
  <div>
    <div class="">
      <!-- Main Post Content  -->
      <div class="row">
        <div class="col-md-9">
          <div class="">
            <div class="">
              <el-skeleton :loading="loading" animated :count="1">
                <template slot="template">
                  <div class="rounded--card p-3 mb-3">
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
                        <el-skeleton-item
                          variant="caption"
                          style="width: 15%"
                        />
                        <el-skeleton-item
                          variant="caption"
                          style="width: 15%"
                        />
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
                  <div class="rounded--card p-3 mb-3" data-aos="fade-up">
                    <div>
                      <div
                        class="
                          d-flex
                          justify-content-between
                          align-items-center
                        "
                      >
                        <div
                          class="d-flex align-items-center mb-3"
                          style="gap: 15px"
                        >
                          <div
                            class="start-post-photo"
                            role="button"
                            @click="goToUser(item)"
                          >
                            <div v-if="item.user.current_profile_image">
                              <img
                                :src="
                                  item.user.current_profile_image.media.file
                                "
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
                            <popper-component
                              trigger="hover"
                              :options="{
                                placement: 'top',
                                modifiers: { offset: { offset: '0,10px' } },
                              }"
                            >
                              <div class="popper">
                                <div class="p-2 text-left">
                                  <div
                                    class="top-side d-flex align-items-center"
                                    style="gap: 10px"
                                  >
                                    <div
                                      class="start-post-photo"
                                      @click="goToUser(item.user)"
                                    >
                                      <div
                                        v-if="item.user.current_profile_image"
                                      >
                                        <img
                                          :src="
                                            item.user.current_profile_image
                                              .media.file
                                          "
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
                                      <h6 @click="goToUser(item)">
                                        {{ item.user.name }}
                                      </h6>
                                      <small class="text-secondary">
                                        @{{ item.user.username }}</small
                                      >
                                    </div>
                                  </div>
                                  <div>
                                    <small>
                                      {{
                                        item.user.followers_count
                                      }}
                                      Follower<span
                                        v-show="item.user.followers_count > 1"
                                        >s</span
                                      >
                                    </small>
                                  </div>
                                  <div class="pop--action">
                                    <button v-if="item.user.following">
                                      Message
                                    </button>
                                    <button v-else @click="followUser(item)">
                                      <div
                                        v-if="followLoading"
                                        class="d-flex justify-content-center"
                                      >
                                        <div
                                          class="spinner-border"
                                          role="status"
                                        >
                                          <span class="sr-only"
                                            >Loading...</span
                                          >
                                        </div>
                                      </div>
                                      <span v-else> Follow </span>
                                    </button>
                                  </div>
                                </div>
                              </div>

                              <h6
                                slot="reference"
                                role="button"
                                class="
                                  poster--name
                                  font-weight-bold
                                  text-capitalize
                                "
                                @click="goToUser(item)"
                              >
                                {{ item.user.name }}
                              </h6>
                            </popper-component>
                            <p
                              class="text-secondary small"
                              style="font-size: 10px"
                            >
                              {{
                                timeStamp(new Date(item.date_created * 1000.0))
                              }}
                            </p>
                          </div>
                        </div>
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
                              @click="savePost(item)"
                            >
                              <span class="text-dark drop--main_text">
                                <IconComponent
                                  icon="bi:bookmark-fill"
                                  v-if="item.saved"
                                />
                                <IconComponent icon="bi:bookmark" v-else />
                              </span>
                              <span v-if="item.saved">
                                Post Saved <br />
                                <small class="text-secondary"
                                  >Post has been saved</small
                                >
                              </span>
                              <span v-else>
                                Save Post <br />
                                <small class="text-secondary"
                                  >Saved Posts for later</small
                                >
                              </span>
                            </div>
                            <div
                              class="dropdown-item d-flex"
                              style="gap: 12px"
                              role="button"
                              @click="getPost(item)"
                            >
                              <span class="text-dark drop--main_text"
                                ><IconComponent
                                  icon="akar-icons:text-align-right"
                              /></span>
                              <span>
                                Verify <br />
                                <small class="text-secondary"
                                  >Details of Post</small
                                >
                              </span>
                            </div>
                            <div
                              class="dropdown-item d-flex"
                              style="gap: 12px"
                              role="button"
                              @click="hidePost(item)"
                            >
                              <span class="text-dark drop--main_text"
                                ><IconComponent
                                  icon="ant-design:minus-circle-outlined"
                              /></span>
                              <span>
                                Hide Post <br />
                                <small class="text-secondary"
                                  >Dont see this post again</small
                                >
                              </span>
                            </div>
                            <div
                              class="dropdown-item d-flex"
                              style="gap: 12px"
                              role="button"
                              @click="openFlag(item)"
                            >
                              <span class="text-dark drop--main_text"
                                ><IconComponent icon="gis:flag-o"
                              /></span>
                              <span>
                                Flag Post <br />
                                <small class="text-secondary"
                                  >I have some concerns</small
                                >
                              </span>
                            </div>
                            <div
                              class="dropdown-item d-flex"
                              style="gap: 12px"
                              role="button"
                              v-clipboard:copy="
                                'https://fidle-desktop/fidle?post_url=' +
                                item.id
                              "
                              v-clipboard:success="onCopy"
                              v-clipboard:error="onError"
                            >
                              <span class="text-dark drop--main_text"
                                ><IconComponent icon="entypo:link"
                              /></span>
                              <span>
                                Copy Link <br />
                                <small class="text-secondary">Copy Link</small>
                              </span>
                            </div>
                          </div>
                          <!-- </div> -->
                        </div>
                      </div>

                      <div v-for="media in item.media" :key="media.id">
                        <img
                          v-if="
                            media.extension == 'jpg' ||
                            media.extension == 'jpeg' ||
                            media.extension == 'png'
                          "
                          :src="media.file"
                          alt=""
                          width="100%"
                          height="auto"
                          style="object-fit: cover; object-position: top"
                        />
                        <video
                          v-else
                          :src="media.file"
                          playsinline
                          loop
                          style="width: 100%"
                        ></video>
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
                      <div class="mb-3 d-flex justify-content-between">
                        <div
                          class="d-flex align-items-center"
                          style="gap: 10px"
                        >
                          <div>
                            <span class="amount">{{
                              dollarFilter(item.worth)
                            }}</span>
                          </div>
                          <div>
                            <span class="">{{ item.likes_count }}Likes </span>
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
                          <IconComponent
                            icon="bx:share"
                            style="font-size: 24px"
                          />
                          <span>Share</span>
                        </div>
                      </div>
                      <hr class="m-0" />

                      <div class="comments mt-3" v-if="comments">
                        <div
                          class="comment--box d-flex align-items-end"
                          v-for="comment in commentsList"
                          :key="comment.id"
                          style="gap: 3px"
                        >
                          <div class="commenter-photo">
                            <img
                              v-if="comment.user.current_profile_image"
                              :src="
                                comment.user.current_profile_image.media.file
                              "
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
                              @click="likeComment(comment)"
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

        <!-- Verify Details  -->
    <div class="verify--details" v-show="verify">
        <div class="verify--content">
          <div class="mb-4 text-right" role="button" @click="verify = false">
            <IconComponent icon="ant-design:close-circle-outlined" style="font-size:30px"/>
          </div>
          <div v-if="verify_loading">
          <div class="d-flex justify-content-center">
            <div class="spinner-border" role="status">
              <span class="sr-only">Loading...</span>
            </div>
          </div>
        </div>
         <div v-else>
           <div class="row mb-3">
            <span class="col-4 font-weight-bold">Creators Name:</span>
            <span v-if="post.user" class="col-6"> {{ post.user.name }} </span>
          </div>
          <div class="row mb-3">
            <span class="col-4 font-weight-bold">Date Created:</span>
            <span class="col-6"> {{ timeStamp(new Date(post.date_created * 1000.0)) }} </span>
          </div>
          <div class="row mb-3">
            <span class="col-4 font-weight-bold">Post Hash</span>
            <span class="col-6"> {{ post.cid }} </span>
          </div>
          <div class="row">
            <span class="col-4 font-weight-bold">Verify on Chain</span>
            <span class="col-6"> {{ post.verify_hash }} </span>
          </div>
         </div>
        </div>
      </div>

 <!-- Report Abuse -->
      <div class="verify--details" v-show="flags">
        <div class="verify--content">
          <div class="mb-4 text-right" role="button" @click="flags = false">
            <IconComponent icon="ant-design:close-circle-outlined" style="font-size:30px"/>
          </div>
          <div class="mb-2">
            <h3>Flag Post</h3>
            <small> Why do you want to flag this post? </small>
          </div>
          <div>
            <div>
              <input type="radio" name="" value="Violence" id="" v-model="dataObj.reason">
              <label class="ml-2" for="">Violence</label>
            </div>
            <div>
              <input type="radio" name="" id="" value="Harassment" v-model="dataObj.reason">
              <label class="ml-2" for="">Harassment</label>
            </div>
            <div>
              <input type="radio" name="" id="" value="Suicide or Self Injury" v-model="dataObj.reason">
              <label class="ml-2" for="">Suicide or Self-Injury</label>
            </div>
            <div>
              <input type="radio" name="" id="" value="Misleading Information" v-model="dataObj.reason">
              <label class="ml-2" for="">Misleading Information</label>
            </div>
            <div>
              <input type="radio" name="" id="" value="Hate Speech" v-model="dataObj.reason">
              <label class="ml-2" for="">Hate Speech</label>
            </div>
            <div>
              <input type="radio" name="" id="" value="Spam" v-model="dataObj.reason">
              <label class="ml-2" for="">Spam</label>
            </div>
            <div>
              <input type="radio" name="" id="" value="Terrorism" v-model="dataObj.reason">
              <label class="ml-2" for="">Terrorism</label>
            </div>
            <div>
              <input type="radio" name="" id="" value="Unathorized Sales" v-model="dataObj.reason">
              <label class="ml-2" for="">Unathorized Sales</label>
            </div>
          </div>
          <div class="mt-2">
            <button @click="flagPost">Report</button>
          </div>
        </div>
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
      comments: false,
      showDialog: false,
      timeStamp,
      timeRange,
      sliceContent,
      dollarFilter,
      colorSplit,
      loading: false,
      isActive: false,
      disabled: true,
      videoPreview: false,
      loader: false,
      valueInput: "",
      followLoading: false,
      dataObj: {
        reason: "",
      },
       verify_loading: false,
      verify: false,
      flags: false,
    };
  },
  methods: {
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

     followUser() {
      this.$store.dispatch("posts/followUser", this.item.user.id)
    },

    async getComments() {
      this.comments = true
      console.log(this.comments)
      if (this.comments) {
        this.$store.dispatch("posts/viewComments", this.item.id)
        }
    },

    likeComment(comment) {
      let payload = {
        post_id: this.item.id,
        comment_id: comment.id
      }
      this.$store.dispatch("posts/likeComment", payload)
    },

    async postComment() {
      let formData = new FormData();
      formData.append("content", this.valueInput);
      let payload = {
        payload: formData,
        id: this.item.id
      };
      this.$store.dispatch("posts/addComment", payload);
      this.valueInput = ""
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

    goToUser() {
      this.$router.push({
        name: "fidler-profile",
        query: { fidler_username: this.item.user.username, fidler_id: this.item.user.id}
      });
    },

    savePost() {
      this.$store.dispatch("posts/savePost", this.item.id)
    },

    hidePost() {
      this.$store.dispatch("posts/hidePost", this.item.id)
      this.$router.go(-1)
    },
    
    openFlag() {
      this.flags = !this.flags;
    },
    
    flagPost() {
      let payload = {
        payload: this.dataObj,
        post_id: this.item.id
      };
      this.$store.dispatch("posts/flagPost", payload);
      this.flags = false;
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
  beforeMount(){
    let id = this.$route.params.id;
      this.$store.dispatch("posts/singlePost", id)
  },
  computed: {
    emojisNative() {
      return packEmoji;
    },
    item(){
      return this.$store.getters["posts/getSinglePost"]
    },
    post(){
      return this.$store.getters["posts/getSinglePost"]
    },
    user(){
      return this.$store.getters["auth/getUser"]
    }, 
    commentsList(){
      return this.$store.getters["posts/allComments"]
    },
  },
};
</script>


