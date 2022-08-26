<template>
  <div>
    <div>
      <div class="d-flex settings--page" style="gap:20px">
        <div class="bg-white d-flex flex-column justify-content-between py-3 rounded-lg" style="width:30%">
            <ul class="m-0" id="myDIV">
                <li class="">
                    <router-link to="/settings">
                        <span><IconComponent icon="iconoir:home-alt-slim" /></span>
                    <div>
                        <h5 style="font-size:15px">Account</h5>
                        <small class="text-secondary">Account Settings, Language</small>
                    </div>
                    </router-link>
                </li>

                <li class=" ">
                    <router-link to="/settings/security-settings">
                        <span><IconComponent icon="ic:outline-security" /></span>
                    <div>
                        <h5 style="font-size:15px">Security</h5>
                        <small class="text-secondary">Update Password, Pin settings</small>
                    </div>
                    </router-link>
                </li>

                <li class=" ">
                    <router-link to="/settings/support">
                        <span><IconComponent icon="bx:help-circle" /></span>
                    <div>
                        <h5 style="font-size:15px">Support</h5>
                        <small class="text-secondary">Contact Support, Help Center</small>
                    </div>
                    </router-link>
                </li>

                <li class=" ">
                    <router-link to="/settings/about-fidle">
                        <span><IconComponent icon="material-symbols:policy-outline-sharp" /></span>
                    <div>
                        <h5 style="font-size:15px">About Fidle</h5>
                        <small class="text-secondary">Terms & Conditions, Privacy Policy</small>
                    </div>
                    </router-link>
                </li>
                 <li class="">
                    <router-link to="/settings/blocking">
                        <span><IconComponent icon="material-symbols:policy-outline-sharp" /></span>
                    <div>
                        <h5 style="font-size:15px">Blocking</h5>
                        <small class="text-secondary">View Blocked Users and unblock</small>
                    </div>
                    </router-link>
                </li>
            </ul>
            <div class="p-3 d-flex " style="color:#EB4242; gap:20px" role="button" @click="logout = !logout">
                <span> <IconComponent icon="teenyicons:logout-solid" /> </span>
                <span>Logout</span>
            </div>
        </div>
        <div style="width:60%">
            <router-view/>
        </div>
      </div>

       <LogoutConfirmation v-show="logout" @close="closeModal"/>
    </div>
  </div>
</template>


<script>
import LogoutConfirmation from '@/components/static/logoutConfirmation.vue'
export default {
    components:{
    LogoutConfirmation
},
    data(){
        return{
            isActive:true,
            logout: false,
        }
    },
    methods:{
        closeModal(){
            this.logout = false
        }
    },
}
</script>
