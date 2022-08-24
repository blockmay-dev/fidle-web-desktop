<template>
  <div>
    <div class="pb-4">
      <div class="profile--section create--nft p-4">
        <h4 class="font-weight-bold mb-4">Convert to NFT</h4>
        <div v-if="loading2" class="text-center">
          <i class="el-icon-loading" style="font-size: 35px"></i>
        </div>
        <form action="" @submit.prevent="convertToNFT = !convertToNFT" v-else>
          <!-- {{ post }} -->
          <div class="mb-4" v-for="media in post.media" :key="media.id">
            <img
              v-if="
                media.extension == 'jpg' ||
                media.extension == 'png' ||
                media.extension == 'jpeg' ||
                media.extension == 'webp' ||
                media.extension == 'svg'
              "
              :src="media.file"
              alt=""
              width="100%"
              height="300px"
              style="
                object-fit: cover;
                object-position: top;
                border-radius: 5px;
              "
            />
          </div>
          <div class="mb-4">
            <label for="">Name</label>
            <input
              type="text"
              class="input"
              placeholder="What do you want to call your NFT?"
              v-model="post.name"
            />
          </div>
          <div class="mb-4">
            <label for="">Description</label>
            <textarea
              name=""
              id=""
              placeholder="Add a description for your NFT"
              cols="30"
              rows="5"
              v-model="post.content"
            ></textarea>
          </div>
          <div class="mb-4">
            <label for="">Collection</label>
            <select name="" id="" v-model="post.collection_id">
              <option
                v-for="(collection, index) in nftCollections.results"
                :key="index"
                :value="collection.id"
              >
                {{ collection.name }}
              </option>
            </select>
          </div>
          <div class="">
            <label class=""
              >Meta Data <small style="color: #868686">*(Optional)</small>
            </label>
            <div
              v-for="(input, index) in phoneNumbers"
              :key="`phoneInput-${index}`"
            >
              <div class="d-flex align-items-center mb-3" style="gap: 20px">
                <input
                  type="text"
                  class="input w-50"
                  placeholder="Name"
                  v-model="input.key"
                />
                <input
                  type="text"
                  class="input"
                  placeholder="Description"
                  v-model="input.value"
                />
                <!-- Remove Icon-->
                <div
                  role="button"
                  v-show="phoneNumbers.length > 1"
                  @click="removeField(index, phoneNumbers)"
                >
                  <i class="el-icon-minus"></i>
                </div>
              </div>
            </div>
            <!-- Add Svg Icon-->
            <div
              class="small d-flex align-items-center"
              style="gap: 5px"
              @click="addField($event, phoneNumbers)"
              role="button"
            >
              <i class="el-icon-plus"></i>
              <span>Add Meta</span>
            </div>
          </div>

          <div>
            <button class="primary--btn w-25 mx-auto">
              
              <span>Create NFT</span>
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Confirmation of NFT Creation -->
    <ConvertToNFT
      @convert="convertItem"
      @toProfile="backToProfile"
      @closeModal="closeConvert"
      v-show="convertToNFT"
    />
  </div>
</template>

<script>
import request from '@/config/axios'
import ConvertToNFT from "./modal/convertToNFT.vue";
export default {
  components: {
    ConvertToNFT,
  },
  data() {
    return {
      imgSrc3: null,
      imgPreview: false,
      post: {
        name: "",
        collection_id: "",
        id: "",
        content: "",
      },
      phoneNumbers: [{ key: null, value: null }],
      mockValues: [],
      convertToNFT: false,
    };
  },
  methods: {
    backToProfile() {
      this.$router.push("/profile/nft-collections");
      this.$store.dispatch("nft/removeNFTCreationSuccess")
    },
    closeConvert(){
      this.convertToNFT = false
    },
    convertItem() {
      for (let i = 0; i < this.phoneNumbers.length; i++) {
        const propertyValues = Object.values(this.phoneNumbers[i]);
        this.mockValues.push(propertyValues);
      }
      const obj = Object.fromEntries(this.mockValues);
      let payload = {
        name: this.post.name,
        description: this.post.content,
        post: this.post.id,
        collection: this.post.collection_id,
        attributes: obj,
      };
      console.log(payload);

      // this.$store.dispatch("nft/convertToNFT", payload)
    },
    addField(value, fieldType) {
      fieldType.push({ value: "" });
    },
    removeField(index, fieldType) {
      fieldType.splice(index, 1);
    },
    getPost() {
      let id = this.$route.query.post_id;
      request()
        .get(`posts/${id}`)
        .then((res) => {
          console.log(res);
          this.post = res.data
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  mounted() {
    let id = this.$route.query.post_id;
    this.$store.dispatch("posts/singlePost", id);
    // View Post By Id
    // this.post = this.$store.getters["posts/getSinglePost"];
  },
  created() {
    let id = this.$route.query.post_id;
    this.$store.dispatch("posts/singlePost", id);
    this.getPost()
    // this.post = this.$store.getters["posts/getSinglePost"];
  },
  beforeMount() {
    // let post_id = this.$route.query.post_id;
    // this.$store.dispatch("posts/singlePost", post_id);

    let id = this.$store.getters["auth/getUser"].username;
    this.$store.dispatch("nft/getCollections", id);
  },

  computed: {
    loading() {
      return this.$store.getters["nft/isLoading"];
    },
    loading2() {
      return this.$store.getters["posts/isLoading"];
    },
    nftCollections() {
      return this.$store.getters["nft/nftCollections"];
    },
  },
};
</script>