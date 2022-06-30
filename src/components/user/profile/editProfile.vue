<template>
    <div>
        <div class="update-profile-modal">
            <div class="update-profile-content">
                <div class="d-flex p-3 bg-white shadow-lg align-items-center justify-content-between sticky-top">
                    <div class="d-flex align-items-center" style="gap:10px">
                        <div role="button" @click="close">
                            <IconComponent icon="carbon:close-outline" style="font-size:25px"/>
                        </div>
                        <h5>Edit Profile</h5>
                    </div>
                    <div>
                        <button class="save--btn" @click="updateUser">Save</button>
                    </div>
                </div>
                <div v-if="userData" :style="{'backgroundImage': `url(${userData.current_profile_image.media.file})`}" class="user--image p-3">
                    <img v-if="userData.current_profile_image"
                        :src="userData.current_profile_image.media.file"
                        class=""
                        alt=""
                    />
                    <img v-else
                        src="@/assets/img/no_user.png"
                        class=""
                        alt=""
                    />
                    <div class="update--profile" role="button">
                        <input
                            @change="onFileChange2"
                            type="file"
                            accept="image/*"
                            id="choose-file2"
                            name="choose-file"
                            class="d-none"
                        />
                        <label class="m-0" for="choose-file2"
                            ><IconComponent icon="bxs:camera-plus" />
                        </label
                        >
                        
                    </div>
                </div>

                <!-- Main Profile Details  -->
                <div class="update--form">
                    <div>
                        <!-- <div class="mb-2">
                            <label for="">Username</label>
                            <input type="text" v-model="userData.username">
                        </div> -->
                        <div class="mb-2">
                            <label for="">Email</label>
                            <input type="text" v-model="userData.email">
                        </div>
                        <!-- <div class="mb-2">
                            <label for="">Date of Birth</label>
                            <input type="date" v-model="userData.dob">
                        </div> -->
                        <div class="mb-2">
                            <label for="">Country</label>
                            <select name="" id="mySelect" @change="selectCountry()" v-model="userData.country_id">
                                <option selected value="" >{{ userData.country }}</option>
                                <option v-for="(country, index) in countries" :key="index" :value="country.id"> {{ country.name }} </option>
                            </select>
                        </div>
                        <div class="mb-2">
                            <label for="">State</label>
                            <select name="" id="mySelect2" @change="selectState()" v-model="userData.state_id">
                            <option selected value="" >{{ userData.state }}</option>
                                <option v-for="(state, index) in states" :key="index" :value="state.id"> {{ state.name }} </option>
                            </select>
                        </div>
                        <div class="mb-3">
                            <label for="">City</label>
                            <select name="" id="" v-model="userData.city_id">
                            <option selected :value="userData.city" >{{ userData.city }}</option>
                                <option v-for="(city, index) in cities" :key="index" :value="city.id">{{ city.name}} </option>
                            </select>
                        </div>
                        <div class="mb-3">
                            <label for="">Bio</label>
                           <textarea name="" v-model="userData.bio" id="" cols="30" rows="5"></textarea>
                        </div>
                    </div>

                </div>
            </div>
        </div>

        <div class="photo--preview" v-show="preview_photo">
            <div class="photo--preview_content">
                <h2 class="mb-3 text-center">Photo preview</h2>
                <img :src="imgContent" alt="">
                <div class="text-center mt-3">
                    <button @click="updatePhoto">Update Profile Photo</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    components: {
	},
    data(){
        return{
            userData: {
                username: '',
                email: '',
                country_id: '',
                state_id: '',
                city_id: '',
                bio: '',
            },
            preview_photo: false,
            countries: '',
            cities:'',
            states: '',
            selectedCountry: '',
            selectedState: '',
            imgContent: "",
            media:{
                imgContent: ''
            }
        }
    },
     methods: {
        close(){
            this.$emit('close')
        },
        updatePhoto(){
            const formData = new FormData();
            formData.append("media", this.media.imgContent);
            this.$axios.post('user/update-profile-picture/', formData)
            .then((res)=>{
                console.log(res);
                this.updateUserData()
                this.getUser()
            })
            .catch((err)=>{
                console.log(err);
            })
            .finally(()=>{
                this.preview_photo = false
            })
        },
        onFileChange2(e) {
            var input = e.target;
            this.media.imgContent = input.files[0];
            console.log(this.imgContent);
            if (e.target.files.length > 0) {
                var src = URL.createObjectURL(e.target.files[0]);
                this.imgContent = src;
            }
            this.preview_photo = true
            },
            selectCountry(){
            var priceOptions = document.getElementById("mySelect");
            var selOption = priceOptions.options[priceOptions.selectedIndex].value;
            this.selectedCountry = selOption
            console.log(selOption);
            this.getStates()
        },
        selectState(){
            var priceOptions = document.getElementById("mySelect2");
            var selOption = priceOptions.options[priceOptions.selectedIndex].value;
            this.selectedState = selOption
            this.getCities()
        },
        async getStates(){
             try {
                let res = await this.$axios.get(`locations/countries/${this.selectedCountry}/states/`)
                console.log(res.data);
                this.states = res.data
            } catch (error) {
                console.log(error);
            }
        },
         async getCities(){
             try {
                let res = await this.$axios.get(`locations/states/${this.selectedState}/cities/`)
                console.log(res.data);
                this.cities = res.data
            } catch (error) {
                console.log(error);
            }
        },
        updateUser(){
            let payload = {
                country_id: this.userData.country_id,
                state_id: this.userData.state_id,
                city_id: this.userData.city_id,
                bio: this.userData.bio,
                email: this.userData.email,
                username: this.userData.username
            }
            console.log(payload);
            this.$axios.patch('/auth/users/me', payload)
            .then((res)=>{
                console.log(res);
            })
            .catch((err)=>{
                console.log(err);
            })
            .finally(()=>{
                this.updateUserData()
                this.getUser()
            })
        },
    async getUser(){
      try {
        let res = await this.$axios.get('auth/users/me/')
        this.userData = res.data
        console.log(res.data);
      } catch (error) {
        console.log(error);
      }
    },
    async updateUserData(){
      try {
        let res = await this.$axios.get('auth/users/me/')
        let userData = res.data
        this.$store.dispatch('updateUser', {userData})
      } catch (error) {
        console.log(error);
      }
    },
    async getCountries(){
        try {
        let res = await this.$axios.get('locations/countries')
        console.log(res.data);
        this.countries = res.data
      } catch (error) {
        console.log(error);
      }
    },
    // async updateUser(){

    // }
  },
  mounted(){
    this.getUser();
    this.getCountries();
  },
  computed:{
    
  }
}
</script>