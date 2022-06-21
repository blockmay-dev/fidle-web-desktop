<template>
    <div>
        <div>
            <!-- Main Post Content  -->
      <div class="">
        <div class="">
          <el-skeleton style="" :loading="loading" animated :count="20">
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
                v-for="item in posts"
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
                      <div class="start-post-photo" role="button" @click="goToUser(item)">
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
                        <popper-component
                          trigger="hover"
                          :options="{
                            placement: 'top',
                            modifiers: { offset: { offset: '0,10px' } },
                          }"
                        >
                          <div class="popper">
                            <div class="p-2 text-left">
                              <div class="top-side d-flex align-items-center" style="gap:10px">
                                <div class="start-post-photo" @click="goToUser(item.user)">
                                  <div v-if="item.user.current_profile_image">
                                    <img
                                      :src="
                                        item.user.current_profile_image.media
                                          .file
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
                                  <h6 @click="goToUser(item)">{{ item.user.name }}</h6>
                                  <small class="text-secondary">
                                    @{{item.user.username}}</small>
                                </div>
                              </div>
                              <div>
                                <small> {{ item.user.followers_count }} Follower<span v-show="item.user.followers_count > 1">s</span> </small>
                              </div>
                              <div class="pop--action">
                                <button v-if="item.user.following" >
                                  Message
                                </button>
                                <button v-else @click="followUser(item)">
                                <div v-if="followLoading" class="d-flex justify-content-center">
                                      <div class="spinner-border" role="status">
                                        <span class="sr-only">Loading...</span>
                                      </div>
                                    </div>
                                  <span v-else>
                                    Follow
                                  </span>
                                  
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
                        <p class="text-secondary small" style="font-size: 10px">
                          {{ timeStamp(new Date(item.date_created * 1000.0)) }}
                        </p>
                      </div>
                    </div>
                    <div class="dropleft">
                      <span role="button" id="dropdownMenuButton" data-toggle="dropdown" aria-expanded="false">
                        <IconComponent
                        icon="akar-icons:more-horizontal"
                        style="font-size: 20px"
                      />
                      </span>
                      <div class="dropdown">
                        <!-- <button class="btn btn-secondary dropdown-toggle" type="button" >
                          Dropdown button
                        </button> -->
                        <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                          <a class="dropdown-item" href="#">Save Post</a>
                          <a class="dropdown-item" href="#">Verify</a>
                          <a class="dropdown-item" href="#">Hide Post</a>
                          <a class="dropdown-item" href="#">Flag Post</a>
                          <a class="dropdown-item" href="#">Copy Link</a>
                          <a class="dropdown-item" href="#">Share Post</a>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div v-for="media in item.media" :key="media.id">
                    <img
                      v-if="media.extension == 'jpg' || media.extension == 'jpeg' || media.extension == 'png' "
                      :src="media.file"
                      alt=""
                      width="100%"
                      height="auto"
                      style="object-fit: cover; object-position: top"
                    />
                    <video v-else :src="media.file" autoplay playsinline loop 
                    style="width:100%"
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
                    <div class="d-flex align-items-center" style="gap: 10px">
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
                      <span class="">
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

                  <div class="comments mt-3">
                    <div
                      class="comment--box d-flex align-items-end"
                      v-show="comments === item.id"
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
                        <img
                          v-else
                          src="@/assets/img/no_user.png"
                          alt=""
                        />
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
                    >
                      <div class="commenter-photo">
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

        <div class="view--more_posts">
          <button @click="viewMore">View More</button>
        </div>
      </div>
        </div>
    </div>
</template>



<script>
import { VEmojiPicker } from "v-emoji-picker";
import AppLoader from "@/components/static/appLoader.vue";
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
    AppLoader,
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
      posts: [],
      user: {},
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
      commentsList: [],
      followLoading: false,
      page: 1,
    };
  },
  methods: {
    followUser(item) {
      console.log(item.user.id);
        this.followLoading = true
        this.$axios.post(`users/${item.user.id}/follow/`)
        .then((res)=>{
            console.log(res.data.message);
            this.$notify({
              message: ` You are now following ${item.user.name}`,
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
    async getComments(item) {
      console.log(this.item_id);
      this.comments = this.comments === item.id ? null : item.id;
      if (this.comments) {
        try {
          let res = await this.$axios.get(`/posts/${item.id}/comments/`);
          console.log(res);
          this.commentsList = res.data.results;
        } catch (error) {
          console.log(error);
        }
      } else {
        this.commentsList = [];
      }
    },
    likeComment(item, comment) {
      this.$axios
        .post(`posts/${item.id}/comments/${comment.id}/like/`)
        .then((res) => {
          console.log(res);
          this.getComments(item);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    async postComment(item) {
      let payload = {
        content: this.valueInput,
      };
      try {
        let res = await this.$axios.post(`posts/${item.id}/comments/`, payload);
        console.log(res);
        this.getPosts();
        this.getComments(item);
      } catch (error) {
        console.log(error);
      }
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
      this.loader = true;
      let formData = new FormData();
      formData.append("content", this.payload.content);
      formData.append("media", this.payload.media);
      formData.append("_method", "POST");
      this.$axios
        .post("posts/", formData)
        .then((res) => {
          // this.$router.push("/");
          console.log(res);
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          this.payload = {};
          this.closePreview();
          this.closeVideoPreview();
          this.getPosts();
          this.loader = false;
        });
    },
    getPosts() {
      this.loading = true;
      this.$axios
        .get("user/feeds")
        .then((res) => {
          console.log(res.data);
          this.posts = res.data.results;
        })
        .catch((err) => {
          console.log(err);
          this.loading = true
        })
        .finally(() => {
          this.loading = false;
        });
    },
    
    async viewMore() {
      this.page = this.page + 1
      this.loading = true;
      try {
        let res = await this.$axios.get(
          `/user/feeds?page=${this.page}`, 
        );
        console.log(res.data);
        let newPosts = res.data.results
        for (let i = 0; i<newPosts.length; i++ ){
          console.log(newPosts[i]);
          this.posts.push(newPosts[i])
        }
     console.log(this.posts);
        
      } catch (error) {
        console.log(error);
      }
      this.loading = false
    },

    goToUser(item){
      this.$router.push({name: 'fidler-profile', params:{id: item.user.id}})
    },

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
        this.imgSrc = src;
        this.isActive = false;
        // document.getElementById('message').style.backgroundImage = null;
        // this.payload.color = "";
      }
    },
    async likePost(item) {
      try {
        let res = await this.$axios.post(`posts/${item.id}/likes/`);
        console.log(res);
      } catch (error) {
        console.log(error);
      }
      this.getPosts();
    },
    switchDisabled() {
      if (this.payload.content !== "") {
        this.disabled = false;
      }
    },
    closePreview() {
      this.imgSrc = "";
      this.imgPreview = false;
    },
    closeVideoPreview() {
      this.videoPreview = false;
      // var preview = document.getElementById("video_select_preview");
      //   preview.src = "";
    },
  },
  mounted() {
    this.getPosts();
    this.getUser();

    window.addEventListener('load', videoScroll);
window.addEventListener('scroll', videoScroll);

function videoScroll() {

  if ( document.querySelectorAll('video[autoplay]').length > 0) {
    var windowHeight = window.innerHeight,
        videoEl = document.querySelectorAll('video[autoplay]');

    for (var i = 0; i < videoEl.length; i++) {

      var thisVideoEl = videoEl[i],
          videoHeight = thisVideoEl.clientHeight,
          videoClientRect = thisVideoEl.getBoundingClientRect().top;

      if ( videoClientRect <= ( (windowHeight) - (videoHeight*.5) ) && videoClientRect >= ( 0 - ( videoHeight*.5 ) ) ) {
        thisVideoEl.play();
      } else {
        thisVideoEl.pause();
      }

    }
  }

}
  },
  created() {},
  computed: {
    emojisNative() {
      return packEmoji;
    },
  },
};
</script>


