<template>
  <div>
    <div class="messenger">
      <div>
        <div class="d-flex" style="gap: 18px">
          <!-- Chat Listing area  -->
          <div class="chat--list">
            <h6 class="font-weight-bold">Messages</h6>
            <div class="my-4">
              <input type="search" placeholder="Search for Direct Messages" />
            </div>

            <div class="message--sender_list">
              <div
                v-for="item in messages"
                :key="item.id"
                class="message--list"
              >
                <div
                  class="d-flex justify-content-between"
                  role="button"
                  @click="goToMessage(item)"
                >
                  <div class="d-flex align-items-center" style="gap: 8px">
                    <div class="messages-photo">
                      <div v-if="item.participants.length === 2">
                        <img
                          v-if="item.participants[1].current_profile_image"
                          :src="
                            item.participants[1].current_profile_image.media
                              .file
                          "
                          alt=""
                        />
                        <img
                          v-else
                          src="@/assets/img/no_user.png"
                          alt=""
                        />
                      </div>
                      <img
                        v-else
                        src="@/assets/img/no_user.png"
                        alt=""
                      />
                    </div>
                    <div>
                      <h6 v-if="item.participants.length === 2">
                        {{ item.participants[1].name }}
                      </h6>
                      <h6 v-else>Fidle User</h6>
                      <small class="text-secondary" v-if="item.last_message">{{
                        item.last_message.text
                      }}</small>
                      <!-- <h6 class="small text-secondary">Active</h6> -->
                    </div>
                  </div>
                  <div>
                    <small v-if="item.last_message">
                      {{
                        timeRange(
                          new Date(item.last_message.date_created * 1000.0)
                        )
                      }}
                    </small>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Chat Box Area  -->
          <div class="empty--chat" v-if="!on_chat">
            <div>
              <el-empty
                description="Click on a chat to start a conversation"
              ></el-empty>
              <hr />
              <h4>Fidle Messenger</h4>
              <!-- <p></p> -->
            </div>
          </div>

          <div class="chat--box_container" v-else>
            <div class="messenger--top">
              <div class="">
                <div class="" style="gap: 10px">
                  <div class="active-img"></div>
                  <div class="">
                    <h6 class="font-weight-bold" v-if="sender_username">
                      @{{ sender_username }}
                    </h6>
                    <!-- <p class="small text-muted">Online</p>   -->
                  </div>
                </div>
              </div>
            </div>
            <div class="chat--box p-3">
              <div>
                <div class="">
                  <!-- Chat Area -->
                  <div>
                    <div
                      class="mb-3 sender__message d-flex"
                      style="gap: 10px"
                      :class="
                        sender_username !== chat.sender.username
                          ? 'sender'
                          : 'reciever'
                      "
                      v-for="chat in message"
                      :key="chat.id"
                    >
                      <div class="sender--img">
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
                </div>
              </div>
            </div>
            <div>
              <div
                class="
                  d-flex
                  justify-content-between
                  align-items-center
                  send--chat
                "
              >
                <el-input
                  type="textarea"
                  :autosize="{ minRows: 2, maxRows: 4 }"
                  placeholder="Write your Message"
                  v-model="valueInput"
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
      timeStamp,
      timeRange,
      sliceContent,
      dollarFilter,
      colorSplit,
      showDialog: false,
      activeName: "first",
      unread: {},
      messages: [],
      sender: "",
      chat_box: false,
      message: [],
      sender_username: "",
      valueInput: "",
      on_chat: false,
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
      let text = this.valueInput;
      var curPos = document.getElementById("textarea").selectionStart;
      console.log(curPos);
      let text_to_insert = dataEmoji.data;
      this.valueInput =
        text.slice(0, curPos) + text_to_insert + text.slice(curPos);
      // Optional
      this.toogleDialogEmoji();
    },
    handleClick(tab, event) {
      console.log(tab, event);
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
        .finally(() => {
          this.valueInput = "";
        });
    },
    closeChat() {
      this.chat_box = false;
    },
    getMessages() {
      this.$axios
        .get("chat")
        .then((res) => {
          console.log(res.data.results);
          this.messages = res.data.results;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    goToMessage(item) {
      this.sender_username = item.participants[1].username;
      this.$axios
        .get(`/chat/${item.participants[1].username}/`)
        .then((res) => {
          console.log(res.data.results);
          this.message = res.data.results;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  mounted() {
    this.getMessages();
  },
  created() {
    // Create WebSocket connection.
    const socket = new WebSocket(
      "wss://api.fidle.io/websocket/?token=" +
        this.$store.getters.isAuthenticated
    );
    console.log(socket);
    // Listen for messages
    socket.addEventListener("message", function (event) {
      // console.log('Message from server ', event.data);
      this.unread = event.data.data;
      console.log(event.data);
    });
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
