<template>
  <div>
    <div id="data-area">
      <form action="" @submit.prevent="nextPage()">
         <!-- <div class="mb-4">
          <label for="" class="d-block small"
            >Email<sup class="text-danger">*</sup>
          </label>
          <input type="text" v-model="payload.email" class="input--text" />
        </div> -->
        <div class="mb-4">
          <select name="" id="mySelect" @change="selectCountry()"  v-model="payload.country_id">
            <option value="">Country</option>
            <option v-for="country in countries" :key="country.id" :value="country.id"> {{ country.name }} </option>
          </select>
          <small class="text-danger" v-show="errMessages.country_id" v-for="err in errMessages.country_id" :key="err"> *{{ err }} </small>
        </div>
        <div class="mb-3">
          <div class="d-flex align-items-center" @change="selectState()" style="gap:20px">
            <div class="w-100">
              <select name="" id="mySelect2" v-model="payload.state_id">
                <option value="">State</option>
                <option v-for="state in states" :key="state.id" :value="state.id"> {{ state.name }} </option>
              </select>
              <small class="text-danger" v-show="errMessages.state_id" v-for="err in errMessages.state_id" :key="err"> *{{ err }} </small>
            </div>
             <div class="w-100">
              <select name="" id="" v-model="payload.city_id">
                <option value="">City</option>
                <option v-for="city in cities" :key="city.id" :value="city.id"> {{ city.name }} </option>
              </select>
              <small class="text-danger" v-show="errMessages.city_id" v-for="err in errMessages.city_id" :key="err"> *{{ err }} </small>
            </div>
          </div>
        </div>
        <!-- <div class="mb-3">
          <label for="" class="d-block small"
            >Date of Birth<sup class="text-danger">*</sup>
          </label>
          <small class="">
            This will not be shown publicly, Confirm your age, even if this
            account is for your business or pet
          </small>
          <div class="d-flex mt-4" style="gap: 20px">
            <div class="w-100">
              <select @change="selectMonth()" name="" id="selectedMonth">
                <option value="---">Month</option>
                <option v-for="item in monthNames" :key="item" :value="item"> {{ item }} </option>
              </select>
            </div>
            <div class="w-100">
              <select name="" id="">
                <option value="---">Day</option>
                <option v-for="(item, index) in monthCount" :key="index" value=""> {{ monthCount - (monthCount - index - 1) }} </option>
              </select>
            </div>
            <div class="w-100">
              <select name="" @change="selectYear()" id="selectYear">
                <option value="---">Year</option>
                <option v-for="(item, index) in 50" value="" :key="index">
                  {{ getYearRange - index }}
                </option>
              </select>
            </div>
          </div>
        </div> -->
        
        <div class="mb-2">
          <select name="" id="" v-model="payload.gender">
            <option value="">Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          <small class="text-danger" v-show="errMessages.gender" v-for="err in errMessages.gender" :key="err"> *{{ err }} </small>
        </div>
        <div class="mb-3 mt-5">
          <div class="d-flex justify-content-center" v-if="loading">
              <div class="spinner-border" role="status">
                  <span class="sr-only">Loading...</span>
              </div>
          </div>
          <button v-else @click="nextPage">Next</button>
        </div>
        <div class="text-center"></div>
      </form>
    </div>
  </div>
</template>


<script>
export default {
  data() {
      return{
        monthNames: [ "January", 
                      "February", 
                      "March", 
                      "April", 
                      "May", 
                      "June",
                      "July", 
                      "August", 
                      "September", 
                      "October", 
                      "November", 
                      "December" ],
      monthCount: 31,
      payload:{
          country_id: '',
          gender: '',
          state_id: '',
          city_id: '',
          username: this.$store.getters.getUser.username
        },
        loading: false,
        selectedCountry: '',
        selectedState: '',
        states: [],
        cities: [],
        errMessages: {}
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
    selectMonth(){
      var monthOptions = document.getElementById("selectedMonth");
      var selOption = monthOptions.options[monthOptions.selectedIndex].value;
        if ( selOption == "September" || selOption == "April" || selOption == "June" || selOption == "November" ){
          this.monthCount = 30;
        } 
        else if(selOption == "February" )   {
          this.monthCount = 29
        }
        else {
          this.monthCount = 31
        }
     },
     selectYear(){
      var yearOptions = document.getElementById("selectYear");
      var selOption = yearOptions.options[yearOptions.selectedIndex].innerHTML;
        console.log(selOption);   
     },
     
    nextPage(){
      this.loading = true
      this.$axios.put('auth/users/me/', this.payload)
      .then((res)=>{
        console.log(res);
      this.$router.push('/follow-to-continue')
      })
      .catch((err)=>{
        console.log(err);
        console.log(err.response.data);
        this.errMessages = err.response.data
      })
      .finally(()=>{
        this.loading = false
        this.payload = {}
      })
    },
  },
  mounted(){
    console.log(this.$store.getters.isAuthenticated);
  },
  computed:{
    getYearRange(){
      let date =  new Date().getFullYear();
      let yearRange = date - 18
      return yearRange
    },
      countries() {
        return this.$store.getters['auth/countriesList'];
      }
  },
};
</script>