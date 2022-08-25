<template>
  <div>
    <div>
      <div class="chat--interface">
        <div>
          <div class="top d-flex justify-content-between">
            <div class="d-flex align-items-center" style="gap: 10px">
              <div class="active-img">
                <div>
                  <img
                    v-if="fidler.current_profile_image"
                    :src="fidler.current_profile_image.media.file"
                    alt=""
                  />
                  <img v-else src="@/assets/img/no_user.png" alt="" />
                </div>
              </div>
              <div>
                <h6 class="font-weight-bold">{{ fidler.name }}</h6>
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
        </div>

        <!-- Chat Area -->
        <div class="main--chat">
          <div v-if="loadingMessages">
            <svg
              style="height: 80px; width: 80px"
              version="1.1"
              id="L4"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              x="0px"
              y="0px"
              viewBox="0 0 100 100"
              enable-background="new 0 0 0 0"
              xml:space="preserve"
            >
              <circle fill="#1443C3" stroke="none" cx="6" cy="50" r="6">
                <animate
                  attributeName="opacity"
                  dur="1s"
                  values="0;1;0"
                  repeatCount="indefinite"
                  begin="0.1"
                />
              </circle>
              <circle fill="#1443C3" stroke="none" cx="26" cy="50" r="6">
                <animate
                  attributeName="opacity"
                  dur="1s"
                  values="0;1;0"
                  repeatCount="indefinite"
                  begin="0.2"
                />
              </circle>
              <circle fill="#1443C3" stroke="none" cx="46" cy="50" r="6">
                <animate
                  attributeName="opacity"
                  dur="1s"
                  values="0;1;0"
                  repeatCount="indefinite"
                  begin="0.3"
                />
              </circle>
            </svg>
          </div>
          <div
            v-else
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
                <img v-else src="@/assets/img/no_user.png" alt="" />
              </div>
            </div>

            <div>
              <!-- <div>
                <span class="text-secondary" style="font-size: 12px">
                  {{ formatTime(new Date(chat.date_created * 1000.0)) }}
                </span>
              </div> -->
              <div class="main--text">
                <p>{{ chat.text }}</p>
                <!-- <small class="text-muted" style="font-size: 0.7rem"> {{ timeStamp(chat.created_at) }} </small> -->
              </div>
            </div>
          </div>
        </div>

        <div class="send--message">
          <div
            class="d-flex justify-content-between align-items-center send--chat"
          >
            <el-input
              type="textarea"
              :autosize="{ minRows: 2, maxRows: 4 }"
              placeholder="Write your Message"
              v-model="payload.valueInput"
            >
            </el-input>
            <div class="d-flex justify-content-between" style="gap: 5px">
              <div role="button" @click="sendMessage">
                <IconComponent
                  icon="akar-icons:send"
                  style="font-size: 20px"
                  color="var(--main-color)"
                />
              </div>
              <div
                class="your-input-box"
                @click="toogleDialogEmoji"
                role="button"
              >
                <IconComponent
                  icon="fluent:emoji-32-regular"
                  style="font-size: 20px"
                  color="var(--main-color)"
                />
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
import {
  timeRange,
  sliceContent,
  dollarFilter,
  colorSplit,
  timeStamp,
  formatTime,
} from "@/plugins/filter";
export default {
  components: {
    VEmojiPicker,
  },
  data() {
    return {
      timeRange,
      sliceContent,
      dollarFilter,
      colorSplit,
      timeStamp,
      formatTime,
      payload:{
        valueInput: "",
      },
      showDialog: false,
      message_sender: {},
      sender_name: "",
      text: "",
      isActive: false,
    };
  },
  methods: {
    selectEmoji(emoji) {
      this.payload.valueInput += emoji.data;
    },
    toogleDialogEmoji() {
      this.showDialog = !this.showDialog;
    },
    onSelectEmoji(dataEmoji) {
      let text = this.payload.valueInput;
      var curPos = document.getElementById("textarea").selectionStart;
      let text_to_insert = dataEmoji.data;
      this.payload.valueInput = text.slice(0, curPos) + text_to_insert + text.slice(curPos);
      // Optional
      this.toogleDialogEmoji();
    },

    sendMessage() {
      // let formData = new FormData();
      // formData.append("text", this.payload.valueInput);
      let payload = {
        data: this.payload.valueInput,
        sender_username: this.$store.getters["fidler/getFidler"].username,
      };
      console.log(payload);
      this.$store.dispatch("messages/sendMessage", payload);
    },
    closeChat() {
      this.$emit("close");
    },
  },
  mounted() {
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
    this.loggedInUser = this.$store.getters["auth/getUser"].username;
  },
  computed: {
    emojisNative() {
      return packEmoji;
    },
    message() {
      let message = this.$store.getters["messages/singleMessage"];
      return message;
    },
    loadingMessages() {
      return this.$store.getters["messages/isLoading"];
    },
    fidler() {
      return this.$store.getters["fidler/getFidler"];
    },
    sender_username() {
      return this.$store.getters["fidler/getFidler"].username;
    },
  },
};
</script>