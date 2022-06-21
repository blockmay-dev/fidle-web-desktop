<template>
    <div>
        <div>
            <div class="side--pane">
               <div @click="goBack" role="button">
                   <IconComponent icon="ant-design:close-circle-outlined" style="font-size:30px"/>
               </div>
               <div class="mt-3">
                   <h4>Your Story</h4>
               </div>
                <!-- User Profile§ -->
               <div class="mt-3 d-flex align-items-center" style="gap:10px">
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
                        <h5 class=" font-weight-bold"> {{ user.name }} </h5>
                        <p class="small text-secondary">@{{ user.username}} </p>
                    </div>
               </div>
               <hr>
            </div>
        </div>
    </div>
</template>


<script>
export default {
    data(){
        return{
            user: {}
        }
    },
    methods:{
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
  }
}
</script>

