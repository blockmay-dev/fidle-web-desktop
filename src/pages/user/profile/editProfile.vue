<template>
    <div>
        <div class="update-profile-modal">
            <div class="update-profile-content">
                <div class="d-flex p-3 bg-white shadow-lg align-items-center justify-content-between sticky-top">
                    <div class="d-flex align-items-center" style="gap:10px">
                        <div role="button" @click="$emit('close')">
                            <Icon icon="carbon:close-outline" style="font-size:25px"/>
                        </div>
                        <h5>Edit Profile</h5>
                    </div>
                    <div>
                        <button class="save--btn" @click="$emit('close')">Save</button>
                    </div>
                </div>
                <div :style="{'background-image': `userData.profile_image`}" class="user--image p-3">
                    <img v-if="userData.current_profile_image"
                        :src="userData.current_profile_image"
                        class=""
                        alt=""
                    />
                    <img v-else
                        src="https://cdn.pixabay.com/photo/2015/03/04/22/35/head-659652_960_720.png"
                        class=""
                        alt=""
                    />
                    <div class="update--profile" role="button">
                        <Icon icon="bxs:camera-plus" />
                    </div>
                </div>

                <!-- Main Profile Details  -->
                <div class="update--form">
                    <form action="">
                        <div class="mb-2">
                            <label for="">Username</label>
                            <input type="text" v-model="userData.username">
                        </div>
                        <div class="mb-2">
                            <label for="">Email</label>
                            <input type="text" v-model="userData.email">
                        </div>
                        <div class="mb-2">
                            <label for="">Country</label>
                            <select name="" id="mySelect" @change="selectCountry()" v-model="userData.country">
                                <option selected value="---" >---</option>
                                <option v-for="(country, index) in countries" :key="index" :value="country.id"> {{ country.name }} </option>
                            </select>
                        </div>
                        <div class="mb-2">
                            <label for="">State</label>
                            <select name="" id="mySelect2" @change="selectState()" v-model="userData.state">
                                <option v-for="(state, index) in states" :key="index" :value="state.id"> {{ state.name }} </option>
                            </select>
                        </div>
                        <div class="mb-3">
                            <label for="">City</label>
                            <select name="" id="" v-model="userData.city">
                                <option v-for="(city, index) in cities" :key="index" :value="city.id">{{ city.name}} </option>
                            </select>
                        </div>
                    </form>

                    <div class="update--password">
                        <h6 class="mb-3 font-weight-bold" style="color: var(--main-color)">Update Password</h6>
                         <div class="mb-2">
                            <label for="">Old Password</label>
                            <input type="text">
                        </div>
                         <div class="mb-2">
                            <label for="">New Password</label>
                            <input type="text">
                        </div>
                         <div class="mb-2">
                            <label for="">Confirm Password</label>
                            <input type="text">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { Icon } from '@iconify/vue2';
export default {
    components: {
		Icon,
	},
    data(){
        return{
            userData: {
                username: '',
                email: '',
                country_id: '',
                state_id: '',
                city_id: '',
            },
            countries: '',
            cities:'',
            states: '',
            selectedCountry: '',
            selectedState: '',
        }
    },
     methods: {
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
    async getUser(){
      try {
        let res = await this.$axios.get('auth/users/me/')
        this.userData = res.data
        console.log(res.data);
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
    async updateUser(){

    }
  },
  mounted(){
    this.getUser();
    this.getCountries();
  }
}
</script>