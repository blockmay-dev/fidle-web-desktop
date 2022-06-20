<template>
  <div>
    <div>
      <div class="rounded--card">
        <div class="px-3 pt-3">
            <h6 class="text-dark">Messages</h6>
        </div>
        <div class="p-3">
            <div class="messages-search-field mb-2">
                <IconComponent icon="bytesize:search" style="color:var(--gray-500)"/>
                <input type="search" name="" id="" placeholder="Search">
            </div>

            <!-- messages tabs -->
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="All Messages" name="first">
                    <div class="d-flex align-items-center mb-3" v-for="item in messages" :key="item.id" style="gap:10px" @click="goToMessage(item)" role="button">
                        <div class="messages-photo">
                            <div v-if="item.participants.length === 2 ">
                                <img
                                v-if="item.participants[1].current_profile_image"
                                :src="item.participants[1].current_profile_image.media.file"
                                alt=""
                                />
                                <img
                                v-else
                                src="https://media.istockphoto.com/photos/businessman-silhouette-as-avatar-or-default-profile-picture-picture-id476085198?k=6&m=476085198&s=612x612&w=0&h=5cDQxXHFzgyz8qYeBQu2gCZq1_TN0z40e_8ayzne0X0="
                                alt=""
                                />
                            </div>
                            <img
                            v-else
                            src="https://media.istockphoto.com/photos/businessman-silhouette-as-avatar-or-default-profile-picture-picture-id476085198?k=6&m=476085198&s=612x612&w=0&h=5cDQxXHFzgyz8qYeBQu2gCZq1_TN0z40e_8ayzne0X0="
                            alt=""
                            />
                        </div>
                        <div>
                            <h6 v-if="item.participants.length === 2 "> {{ item.participants[1].name }}  </h6>
                            <h6 v-else> Fidle User  </h6>
                            <!-- <h6 class="small text-secondary">Active</h6> -->
                        </div>
                    </div>

                </el-tab-pane>
                <!-- <el-tab-pane label="Recent Messages" name="second">
                    

                </el-tab-pane> -->
            </el-tabs>
        </div>
      </div>
        <ChatPane :sender_username="sender" @close="closeChat" v-if="chat_box"/>

    </div>
  </div>
</template>

<script>
import ChatPane from '../chatPane.vue';
  export default {
    data() {
        return {
            activeName: "first",
            unread: {},
            messages: [],
            sender: '',
            chat_box: false,
        };
    },
    methods: {
        handleClick(tab, event) {
            console.log(tab, event);
        },
        goToMessage(item){
            this.sender = item.participants[1].username
            this.chat_box = ( this.chat_box === item.participants[1].username ) ? null : item.participants[1].username ;
            // this.chat_box = true
        },
        closeChat(){
            this.chat_box = false
        },
        getMessages() {
            this.$axios.get("chat")
                .then((res) => {
                console.log(res.data.results);
                this.messages = res.data.results;

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
        const socket = new WebSocket("wss://api.fidle.io/websocket/?token=" + this.$store.getters.isAuthenticated);
        console.log(socket);
        // Listen for messages
        socket.addEventListener("message", function (event) {
            // console.log('Message from server ', event.data);
            this.unread = event.data.data;
            console.log(this.unread);
        });
    },
    components: { ChatPane }
};
</script>
