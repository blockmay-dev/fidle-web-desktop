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
                            src="https://images.askmen.com/1080x540/2016/01/25-021526-facebook_profile_picture_affects_chances_of_getting_hired.jpg"
                            alt=""
                            width="100%"
                          />
                        </div>
                      </div>
                      <div>
                        <h6 class="font-weight-bold  text-capitalize">
                          {{ item.user.name }}
                        </h6>
                        <p class="text-secondary small" style="font-size:10px">
                          {{ timeStamp(new Date(item.date_created * 1000.0)) }}
                        </p>
                      </div>
                    </div>
                    <div>
                      <IconComponent
                        icon="akar-icons:more-horizontal"
                        style="font-size: 30px"
                      />
                    </div>
                  </div>

                  <div v-for="media in item.media" :key="media.id">
                    <img
                    v-if="media.extension == 'jpg' || media.extension == 'png' || media.extension == 'jpeg' "
                      :src="media.file"
                      alt=""
                      width="100%"
                      height="500px"
                      style="object-fit: cover; object-position: top"
                    />
                    <video v-else :src="media.file"  playsinline loop 
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
                  <div class="my-3 d-flex justify-content-between">
                    <div class="d-flex align-items-center" style="gap: 10px">
                      <div>
                        <span class="amount ">{{
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
                      <IconComponent icon="flat-color-icons:like" style=" font-size: 24px !important;" v-if="item.liked"/>
                      <IconComponent v-else icon="icon-park-outline:like" style="color: red;  font-size: 24px !important;" role="button" />
                      <span>Like</span>
                    </div>
                    <div
                      role="button"
                      class="d-flex align-items-center reactions--container"
                      style="gap: 10px"
                      @click="getComments(item)"
                    >
                      <IconComponent icon="bx:comment" style=" font-size: 24px" />
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

                  <div class="comments mt-3" >
                    <div class="comment--box  d-flex align-items-end" v-show="comments === item.id" v-for="comment in commentsList" :key="comment.id" style="gap:3px">
                      <div class="commenter-photo">
                        <img
                          v-if="comment.user.current_profile_image"
                          :src="comment.user.current_profile_image.media.file"
                          alt=""
                        />
                        <img
                          v-else
                          src="https://media.istockphoto.com/photos/businessman-silhouette-as-avatar-or-default-profile-picture-picture-id476085198?k=6&m=476085198&s=612x612&w=0&h=5cDQxXHFzgyz8qYeBQu2gCZq1_TN0z40e_8ayzne0X0="
                          alt=""
                        />
                      </div>
                      <div class="main-comment">
                       <p> {{ comment.content }}</p>
                       <span class="like--comment" v-if="comment.has_liked"><IconComponent icon="flat-color-icons:like" style=" font-size: 24px !important;" /></span>
                      <span class="like--comment" @click="likeComment(item, comment)" role="button" v-else><IconComponent icon="icon-park-outline:like" style="color: red;  font-size: 24px !important;" role="button" /></span>
                      </div>
                      
                    </div>
                    <div class="start--post add-comment d-flex  align-items-center mt-3" >
                      <div class="commenter-photo">
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
                        <div class="w-100">
                        <form action="" class="form" >
                          <el-input
                            width="100%"
                            type="textarea"
                            id="textarea2"
                            :autosize="{ minRows: 2, maxRows: 5 }"
                            placeholder="Add a Comment"
                            v-model="valueInput"
                          >
                          </el-input>
                          <div class="your-input-box" @click="toogleDialogEmoji(item)" role="button">
                              <IconComponent icon="fluent:emoji-32-regular" style="font-size: 20px"  color="var(--main-color)"/>
                          </div>
                          <div class="your-input-box" @click="postComment(item)" role="button">
                              <IconComponent icon="akar-icons:send" style="font-size: 20px"  color="var(--main-color)"/>
                          </div>
                        </form>
                        </div>
                      </div>
                  </div>
                  <VEmojiPicker
                            v-show="showDialog == item.id "
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

        <div v-show="empty">
          {{user.name}} has not made any posts
        </div>
      </div>

        <!-- App Loader -->
       <AppLoader :loader="loader" />
    </div>
  </div>
</template>

<script>
import { VEmojiPicker } from "v-emoji-picker";
import AppLoader from '@/components/static/appLoader.vue'
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
    AppLoader, VEmojiPicker
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
      id: this.$route.params.id,
      empty: false
    };
  },
  methods: {
    async getComments(item){
      console.log(this.item_id);
    this.comments = ( this.comments === item.id ) ? null : item.id;
     if (this.comments) {
        
        try {
            let res = await this.$axios.get(`/posts/${item.id}/comments/`)
            console.log(res);
          this.commentsList = res.data.results
        } catch (error) {
          console.log(error);
        }
     }
     else {
       this.commentsList = []
     }
    },
    likeComment(item, comment){
      this.$axios.post(`posts/${item.id}/comments/${comment.id}/like/`)
      .then((res)=>{
        console.log(res);
        this.getComments(item)
      })
      .catch((err)=>{
        console.log(err);
      })
    },
    async postComment(item){
      let payload = {
        content: this.valueInput
      }
      try {
        let res = await this.$axios.post(`posts/${item.id}/comments/`, payload)
        console.log(res);
        this.getPosts()
        this.getComments(item)
      } catch (error) {
        console.log(error);
      }
      this.valueInput = ""
    },
    onSelectEmoji(dataEmoji) {
        let text = this.valueInput
      var curPos = document.getElementById("textarea2").selectionStart;
      console.log(curPos);
      let text_to_insert = dataEmoji.data;
        this.valueInput = text.slice(0, curPos) + text_to_insert + text.slice(curPos)
      // Optional
        this.toogleDialogEmoji();
    },
    toogleDialogEmoji(item){
      this.showDialog = ( this.showDialog === item.id ) ? null : item.id;
    },
    createFidle() {
      this.loader = true
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
        .finally(()=>{
          this.payload = {}
          this.closePreview()
          this.closeVideoPreview()
          this.getPosts()
          this.loader = false
        })
    },
    getPosts() {
      this.loading = true;
      this.$axios
        .get(`users/${this.id}/posts`)
        .then((res) => {
          console.log(res.data);
          this.posts = res.data;
          if(this.posts.results.length === 0){
            this.empty = true
          }
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          this.loading = false;
        });
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
     async likePost(item){
      try {
        let res = await this.$axios.post(`posts/${item.id}/likes/`)
        console.log(res);
      } catch (error) {
        console.log(error);
      }
      this.getPosts()
    },
    switchDisabled(){
      if (this.payload.content !== '' ) {
        this.disabled = false
      }
    },
    closePreview(){
      this.imgSrc = "";
      this.imgPreview = false;
    },
    closeVideoPreview(){
      this.videoPreview = false;
      // var preview = document.getElementById("video_select_preview");
      //   preview.src = "";
    }
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