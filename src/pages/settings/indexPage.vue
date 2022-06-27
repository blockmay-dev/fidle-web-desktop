<template>
  <div>
    <div>
      <div class="d-flex settings--page" style="gap:20px">
        <div class="bg-white d-flex flex-column justify-content-between py-3 rounded-lg" style="width:30%">
            <ul class="m-0" id="myDIV">
                <li class="mb-4 px-3 py-1 nav--item active" role="button" @click="accountSettings">
                    <span><IconComponent icon="iconoir:home-alt-slim" /></span>
                    <div>
                        <h5 style="font-size:15px">Account</h5>
                        <small class="text-secondary">Account Settings, Language</small>
                    </div>
                </li>

                <li class="mb-4 px-3 py-1 nav--item" role="button" @click="securitySettings">
                    <span><IconComponent icon="ic:outline-security" /></span>
                    <div>
                        <h5 style="font-size:15px">Security</h5>
                        <small class="text-secondary">Update Password, Pin settings</small>
                    </div>
                </li>

                <li class="mb-4 px-3 py-1 nav--item" role="button" @click="supportSettings">
                    <span><IconComponent icon="bx:help-circle" /></span>
                    <div>
                        <h5 style="font-size:15px">Support</h5>
                        <small class="text-secondary">Contact Support, Help Center</small>
                    </div>
                </li>

                <li class="px-3 py-1 nav--item" role="button" @click="aboutFidle">
                    <span><IconComponent icon="material-symbols:policy-outline-sharp" /></span>
                    <div>
                        <h5 style="font-size:15px">About Fidle</h5>
                        <small class="text-secondary">Terms & Conditions, Privacy Policy</small>
                    </div>
                </li>
            </ul>
            <div class="p-3 d-flex " style="color:#EB4242; gap:20px" role="button" @click="logout = !logout">
                <span> <IconComponent icon="teenyicons:logout-solid" /> </span>
                <span>Logout</span>
            </div>
        </div>
        <div class="" style="width:55%">
            <AboutFidle v-show="about"/>
            <account-settings v-show="account"/>
            <security-settings v-show="security"/>
            <support-settings v-show="support"/>
        </div>

        <LogoutConfirmation v-show="logout" @close="closeModal"/>
      </div>
    </div>
  </div>
</template>


<script>
import AboutFidle from '@/components/settings/aboutFidle.vue'
import AccountSettings from '@/components/settings/accountSettings.vue'
import SecuritySettings from '@/components/settings/securitySettings.vue'
import SupportSettings from '@/components/settings/supportSettings.vue'
import LogoutConfirmation from '@/components/static/logoutConfirmation.vue'
export default {
    components:{
    AboutFidle,
    AccountSettings,
    SecuritySettings,
    SupportSettings,
    LogoutConfirmation
},
    data(){
        return{
            isActive:true,
            account: true,
            security: false,
            support: false,
            about: false, 
            logout: false,
        }
    },
    methods:{
        accountSettings(){
            this.account = true
            this.security = false
            this.support = false
            this.about = false
        },
        securitySettings(){
            this.account = false
            this.security = true
            this.support = false
            this.about = false
        },
        supportSettings(){
            this.account = false
            this.security = false
            this.support = true
            this.about = false
        },
        aboutFidle(){
            this.account = false
            this.security = false
            this.support = false
            this.about = true
        },
        closeModal(){
            this.logout = false
        }
    },
    mounted() {
    var header = document.getElementById("myDIV");
    var btns = header.getElementsByClassName("nav--item");
    for (var i = 0; i < btns.length; i++) {
      btns[i].addEventListener("click", function () {
        var current = document.getElementsByClassName("active");
        current[0].className = current[0].className.replace(" active", "");
        this.className += " active";
      });
    }
  },
}
</script>
