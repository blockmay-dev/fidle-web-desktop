<template>
  <div>
    <div id="data-area">
      <form action="" @submit.prevent="nextPage()">
        <div class="mb-4">
          <label for="" class="d-block small"
            >Country<sup class="text-danger">*</sup>
          </label>
          <select
            name=""
            id="mySelect"
            @change="selectCountry()"
            v-model="payload.country_id"
          >
            <option
              v-for="country in countries"
              :key="country.id"
              :value="country.id"
            >
              {{ country.name }}
            </option>
          </select>
          <small
            class="text-danger"
            v-show="errMessages.country_id"
            v-for="err in errMessages.country_id"
            :key="err"
          >
            *{{ err }}
          </small>
        </div>
        <div class="mb-4">
          <div
            class="d-flex align-items-center"
            @change="selectState()"
            style="gap: 20px"
          >
            <div class="w-100">
              <label for="" class="d-block small"
                >State<sup class="text-danger">*</sup>
              </label>
              <select name="" id="mySelect2" v-model="payload.state_id">
                <option
                  v-for="state in states"
                  :key="state.id"
                  :value="state.id"
                >
                  {{ state.name }}
                </option>
              </select>
              <small
                class="text-danger"
                v-show="errMessages.state_id"
                v-for="err in errMessages.state_id"
                :key="err"
              >
                *{{ err }}
              </small>
            </div>
            <div class="w-100">
              <label for="" class="d-block small"
                >City<sup class="text-danger">*</sup>
              </label>
              <select name="" id="" v-model="payload.city_id">
                <option v-for="city in cities" :key="city.id" :value="city.id">
                  {{ city.name }}
                </option>
              </select>
              <small
                class="text-danger"
                v-show="errMessages.city_id"
                v-for="err in errMessages.city_id"
                :key="err"
              >
                *{{ err }}
              </small>
            </div>
          </div>
        </div>
        <div class="mb-4">
          <label for="" class="d-block small"
            >Gender<sup class="text-danger">*</sup>
          </label>
          <select name="" id="" v-model="payload.gender">
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          <small
            class="text-danger"
            v-show="errMessages.gender"
            v-for="err in errMessages.gender"
            :key="err"
          >
            *{{ err }}
          </small>
        </div>
        <div class="mb-3 mt-4">
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
    return {
      payload: {
        country_id: "",
        gender: "",
        state_id: "",
        city_id: "",
        username: this.$store.getters["auth/getUser"].username,
      },
      selectedCountry: "",
      selectedState: "",
    };
  },
  methods: {
    selectCountry() {
      var priceOptions = document.getElementById("mySelect");
      var selOption = priceOptions.options[priceOptions.selectedIndex].value;
      this.selectedCountry = selOption;
      this.$store.dispatch("extras/listStates", this.selectedCountry)
    },
    selectState() {
      var priceOptions = document.getElementById("mySelect2");
      var selOption = priceOptions.options[priceOptions.selectedIndex].value;
      this.selectedState = selOption;
      this.$store.dispatch("extras/listCities", this.selectedState)
    },
    nextPage() {
      this.$store.dispatch("auth/updateUser", this.payload)
    },
  },
  computed: {
    getYearRange() {
      let date = new Date().getFullYear();
      let yearRange = date - 18;
      return yearRange;
    },
    countries() {
      return this.$store.getters["extras/countriesList"];
    },
    states(){
      return this.$store.getters["extras/statesList"]
    },
    cities(){
      return this.$store.getters["extras/lgasList"]
    },
    loading(){
      return this.$store.getters['auth/isUpdateLoading']
    },
    errMessages(){
      return this.$store.getters["auth/isError"]
    }
  },
};
</script>