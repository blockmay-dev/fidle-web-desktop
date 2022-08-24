<template>
  <div>
    <!-- Chat Box Area  -->
    <div class="chat">
      <div class="contact bar">
        <div class="pic">
          <div v-if="user">
            <img
              v-if="user.current_profile_image"
              :src="user.current_profile_image.media.file"
              alt=""
            />
            <img v-else src="@/assets/img/no_user.png" alt="" />
          </div>
        </div>
        <div class="name" v-if="user.name"> {{ user.name }} </div>
        <div class="name" v-else>Fidle User</div>
        <small class="text-secondary"> @{{ user.username }} </small>
        <div class="seen"></div>
      </div>
      <div class="messages" id="chat">
         <div class="userData text-center">
          <h5> {{ user.name }} <small class="text-secondary"> @{{ user.username }} </small> </h5> 
          <p class="small"> {{ user.bio }} </p>
      </div>
      <hr>
        <!-- <div class="time">Today at 11:41</div> -->
        <div v-for="chat in message" :key="chat.id">
        
          <div class="d-flex align-items-end" style="gap:10px">
            <div v-if="chat.sender.id === id" class="chat--photo">
            <img
              v-if="user.current_profile_image"
              :src="user.current_profile_image.media.file"
              alt=""
            />
            <img v-else src="@/assets/img/no_user.png" alt="" />
          </div>
            <div
            class="message"
            :class="chat.sender.id !== id ? 'parker' : 'stark'"
          >
            {{ chat.text }}
          </div>
          </div>
        </div>

        <!-- <div class="message stark">
                <div class="typing typing-1"></div>
                <div class="typing typing-2"></div>
                <div class="typing typing-3"></div>
              </div> -->
      </div>
      <div class="input">
        <div class="your-input-box" @click="toogleDialogEmoji" role="button">
          <IconComponent
            icon="fluent:emoji-32-regular"
            style="font-size: 25px"
          />
        </div>
        <input
          placeholder="Type your message here!"
          id="textarea"
          type="text"
          v-model="valueInput"
        />
        <div role="button" @click="sendMessage">
          <IconComponent icon="akar-icons:send" style="font-size: 25px" />
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
      isActive: false,
      id: this.$route.params.id,
      user: {},
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
        .post(`/chat/${this.user.username}/send/`, payload)
        .then((res) => {
          this.text = "";
          return res;
        })
        .catch((err) => {
          return err;
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
          this.messages = res.data.results;
        })
        .catch((err) => {
          return err;
        });
    },
    getMessageSender() {
      this.$axios
        .get("users/" + this.id + "/")
        .then((res) => {
          this.user = res.data;
        })
        .catch((err) => {
          return err;
        });
    },
    getMyMessage() {
      this.$axios
        .get(`/chat/${this.user.username}/`)
        .then((res) => {
          // console.log(res.data.results);
          let messages = res.data.results;
          this.message = messages.sort(
            (a, b) => a.date_created - b.date_created
          );
        })
        .catch((err) => {
          return err;
        });
    },
  },
  mounted() {
    this.getMessages();
    this.getMyMessage();
    this.getMessageSender();
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
    this.getMyMessage();
  },
  computed: {
    emojisNative() {
      return packEmoji;
    },
    getUser() {
      return this.$store.getters.getUser;
    },
  },
};
</script>
