<template>
    <div>
        <div>
            <!-- Chat Listing area  -->
          <div class="chat--list">
            <h5 class="font-weight-bold pl-3 pt-3">Messages</h5>
            <div class="my-4 message-search px-3">
              <input type="search" placeholder="Search for Direct Messages" />
            </div>

            <div class="message--sender_list">
              <div
                v-for="item in messages"
                :key="item.id"
                class="message--list"
                :class="{ active: isActive === item.id }"
              >
                <div
                  class="d-flex justify-content-between"
                  role="button"
                  @click="goToMessage(item)"
                >
                  <div class="d-flex align-items-center" style="gap: 10px">
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
                        <img v-else src="@/assets/img/no_user.png" alt="" />
                      </div>
                      <img v-else src="@/assets/img/no_user.png" alt="" />
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
                    <small v-if="item.last_message" style="font-size:11px">
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

        </div>
    </div>
</template>


<script>
import {
  timeRange,
  sliceContent,
  dollarFilter,
  colorSplit,
  timeStamp,
} from "@/plugins/filter";
export default {
  components: {
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
      sender: "",
      chat_box: false,
      message: [],
      sender_username: "",
      valueInput: "",
      on_chat: false,
      isActive: false,
      last: {}
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
    
    closeChat() {
      this.chat_box = false;
    },
    goToMessage(item) {
        this.$router.push(`/message/m/${item.participants[1].id}`)
        this.$store.dispatch("messages/getSingleMessage", item.participants[1].username);
    },
  },
  beforeMount(){
     this.$store.dispatch("messages/allMessages");
  },
  created() {
    // Create WebSocket connection.
    let token;
    token = localStorage.getItem("token");
    const socket = new WebSocket(
      "wss://api.fidle.io/websocket/?token=" +
        token
    );
    console.log(socket);
    // Listen for messages
    socket.addEventListener("message", function (event) {
      // console.log('Message from server ', event.data);
      this.unread = event.data.data;
      console.log(event.data);
    });
  },

  computed:{
    messages() {
      return this.$store.getters["messages/allMessages"];
  },
  }
  
};
</script>
