<template>
  <div>
    <div>
      <div class="rounded--card">
        <div
          class="
            px-3
            pt-3
            mb-3
            d-flex
            justify-content-between
            align-items-center
          "
        >
          <h6 class="">Messages</h6>
          <div class="" role="button" @click="goToMessages">
            <span
              class="text-secondary text-underline"
              style="font-size: 0.7rem"
            >
              View All >>
            </span>
          </div>
        </div>
        <div class="px-3 pb-3">
          <!-- messages tabs -->
          <div
            class="d-flex align-items-center mb-3"
            v-for="item in messages"
            :key="item.id"
            style="gap: 10px"
            @click="goToMessage(item)"
            role="button"
          >
            <div class="messages-photo">
              <div v-if="item.participants.length === 2">
                <img
                  v-if="item.participants[1].current_profile_image"
                  :src="item.participants[1].current_profile_image.media.file"
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
              <h6 class="small text-secondary" v-if="item.last_message">
                {{ item.last_message.text }}
              </h6>
            </div>
          </div>
        </div>
      </div>
      <ChatPane :sender_username="sender" @close="closeChat" v-if="chat_box" />
    </div>
  </div>
</template>

<script>
import ChatPane from "../chatPane.vue";
export default {
  data() {
    return {
      activeName: "first",
      unread: {},
      sender: "",
      chat_box: false,
    };
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
    goToMessage(item) {
      this.chat_box =
        this.chat_box === item.participants[1].username
          ? null
          : item.participants[1].username;
      this.sender = item.participants[1].username;
      let id = item.participants[1].id;
      this.$store.dispatch("messages/getSingleMessage", this.sender);
      this.$store.dispatch("fidler/getFidler", id);
    },
    closeChat() {
      this.chat_box = false;
    },

    goToMessages() {
      this.$router.push("/messenger");
    },
  },
  beforeMount() {
    this.$store.dispatch("messages/allMessages");
  },
  mounted(){
     this.$socket.addEventListener("message", function (event) {
      console.log('Message from server ', event.data);
    });
  },
  
  components: { ChatPane },
  computed: {
    messages() {
      return this.$store.getters["messages/allMessages"].slice(0, 5);
    },
  },
};
</script>


<style>
</style>