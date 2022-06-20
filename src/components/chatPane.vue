<template>
  <div>
    <div>
      <!-- Message Box  -->
      <!-- <div class="single--message">
        <div class="d-flex justify-content-between align-items-center">
          <h6 class="font-weight-bold" v-if="message_sender.sender">
            {{ message_sender.sender.name }}
          </h6>
          <span @click="closeChat" role="button">
            <IconComponent icon="ci:close-big" />
          </span>
        </div>
        <hr />
        <div></div>
        <hr />
      </div> -->

      <div class="chat--interface">
        <div>
          <div class="top d-flex justify-content-between">
            <div class="d-flex align-items-center" style="gap: 10px">
              <div class="active-img">
              </div>
              <div>
                <h6 class=" font-weight-bold">
                  @{{ sender_username }}
                </h6>
                <!-- <p class="small text-muted">Online</p>   -->
              </div>
            </div>
            <div @click="closeChat" role="button">
              <IconComponent
                icon="codicon:close"
                style="font-size: 25px"
                color="red"
              />
            </div>
          </div>
          <hr />
        </div>

        <!-- Chat Area -->
        <div class="main--chat">
          <div
            class="message--content"
            :class="
              sender_username !== chat.sender.username ? 'sender' : 'reciever'
            "
            v-for="chat in message"
            :key="chat.id"
          >
            <div class="sender">
              <div v-if="sender_username === chat.sender.username">
                <img
                  v-if="chat.sender.current_profile_image"
                  :src="chat.sender.current_profile_image.media.file"
                  alt=""
                />
                <img
                  v-else
                  src="https://cdn.pixabay.com/photo/2015/03/04/22/35/head-659652_960_720.png"
                  alt=""
                />
              </div>
            </div>

            <div>
              <div class="main--text">
                <p>{{ chat.text }}</p>
                <!-- <small class="text-muted" style="font-size: 0.7rem"> {{ timeStamp(chat.created_at) }} </small> -->
              </div>
            </div>
          </div>
        </div>

        <div>
          <hr />
          <div
            class="d-flex justify-content-between align-items-center send--chat"
          >
            <el-input
                    type="textarea"
                :autosize="{ minRows: 2, maxRows: 4}"
                placeholder="Write your Message"
                v-model="valueInput">
              </el-input>
           <div class="d-flex justify-content-between " style="gap:5px">
                <div role="button" @click="sendMessage">
                    <IconComponent icon="akar-icons:send" style="font-size: 20px"  color="var(--main-color)"/>
                </div>
                <div class="your-input-box" @click="toogleDialogEmoji" role="button">
                    <IconComponent icon="fluent:emoji-32-regular" style="font-size: 20px"  color="var(--main-color)"/>
                </div>
           </div>

            <div id="exampleInputEmoji">
              <VEmojiPicker
                v-show="showDialog"
                :pack="emojisNative"
                labelSearch="Search"
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
      </div>
    </div>
  </div>
</template>


<script>
import { VEmojiPicker } from "v-emoji-picker";
import packEmoji from "@/api/emojis.js";

export default {
  components: {
    VEmojiPicker,
  },
  props: ["sender_username"],
  data() {
    return {
      valueInput: "",
      showDialog: false,
      message_sender: {},
      message: {},
      sender_name: "",
      text: "",
      isActive: false,
    };
  },
  methods: {
    selectEmoji(emoji) {
      console.log(emoji.data);
      this.valueInput += emoji.data;
    },
    toogleDialogEmoji() {
      this.showDialog = !this.showDialog;
    },
    onSelectEmoji(dataEmoji) {
        let text = this.valueInput
      var curPos = document.getElementById("textarea").selectionStart;
      console.log(curPos);
      let text_to_insert = dataEmoji.data;
        this.valueInput = text.slice(0, curPos) + text_to_insert + text.slice(curPos)
      // Optional
        this.toogleDialogEmoji();
    },
    goToMessage() {
      this.$axios
        .get(`/chat/${this.sender_username}/`)
        .then((res) => {
          //   console.log(res.data.results);
          this.message = res.data.results;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    sendMessage() {
      let payload = {
        text: this.valueInput,
      };
      this.$axios
        .post(`/chat/${this.sender_username}/send/`, payload)
        .then((res) => {
          this.text = "";
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(()=>{
            this.valueInput = ''
        })
    },
    closeChat() {
      this.$emit("close");
    },
  },
  mounted() {
    this.goToMessage();
    var textarea = document.getElementById("textarea");
    var heightLimit = 100; /* Maximum height: 200px */
    if (this.text == "") {
      textarea.style.height = "30px";
    }

    textarea.oninput = function () {
      textarea.style.height = ""; /* Reset the height*/
      textarea.style.height =
        Math.min(textarea.scrollHeight, heightLimit) + "px";
    };
  },
  beforeMount() {
    this.loggedInUser = this.$store.getters.getUser.username;
  },
  updated() {
    this.goToMessage();
  },
  computed: {
    emojisNative() {
      return packEmoji;
    },
  },
};
</script>