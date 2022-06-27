<template>
    <div>
        <div>
            <div class="side--pane">
               <div class="d-flex justify-content-between align-items-center mb-4">
                
               <div class="">
                   <h5>Stories</h5>
               </div>
               <div @click="goBack" role="button">
                   <IconComponent icon="ant-design:close-circle-outlined" style="font-size:25px"/>
               </div>
               </div>
                <!-- User Profile§ -->
                <h6>My Story</h6>
               <div class="mt-3 d-flex align-items-center" style="gap:10px" role="button" @click="addStory">
               <div class="add--story_icon">
                <IconComponent icon="carbon:add-filled" />
               </div>
               <div>
                <h6>Create a Story</h6>
                <span class="text-secondary" style="font-size:11px">Share a photo or Write Something</span>
               </div>
                    <!-- <div class="stories-side-photo">
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
                    <div>
                        <h5 class=" font-weight-bold"> {{ user.name }} </h5>
                        <p class="small text-secondary">@{{ user.username}} </p>
                    </div> -->
               </div>
               
               <!-- <div style="height:80vh; overflow-y:auto">
                <div class="all--stories mt-4">
                    <h6>All Stories</h6>
                </div>
                <div class="mt-4 d-flex align-items-center" style="gap:10px" v-for="story in stories" :key="story.id">
                    <div class="stories-side-photo">
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
                    <div>
                        <h5 class=" font-weight-bold small"> {{ story.user.name }} </h5>
                        <p class="small text-secondary">{{ timeRange(new Date(story.date_created * 1000.0)) }} </p>
                    </div>
               </div>

               </div> -->
            </div>
        </div>
    </div>
</template>


<script>
import {
  timeRange,
} from "@/plugins/filter";
export default {
    data(){
        return{
            timeRange,
            user: {}
        }
    },
    methods:{
        addStory(){
            this.$router.push('/stories/create')
        },
        goBack(){
            this.$router.push({name: "all-posts"})
        },
       getUser(){
      this.$axios.get('auth/users/me')
      .then((res)=>{
        this.user = res.data
      })
      .catch((err)=>{
        console.log(err);
      })
    }
  },
  mounted(){
    this.getUser()
  },
  computed:{
        stories(){
            return this.$store.getters.getMyStories
        }
    }
}
</script>

