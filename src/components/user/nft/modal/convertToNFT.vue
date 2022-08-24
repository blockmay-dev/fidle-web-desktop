<template>
  <div>
    <div>
      <div class="modal--mask">
        <div class="modal--content">
          <div v-if="!submitted">
          <div class="text-right mb-3" @click="close" role="button">
                <i class="el-icon-close" style="color:#ff0000; font-size:1.3rem"></i>
            </div>
            <div class="mb-3" v-for="media in post.media" :key="media.id">
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
            <h6 class="text-center">
              You will be charged &#36;10 worth of FIDLE for this creation.
            </h6>
            <div class="mt-3">
              <button class="continue--btn" @click="convertToNFT">
              <span v-if="loading"
                ><i class="el-icon-loading" style="font-size: 35px"></i
              ></span>
                <span v-else>
                    Convert to NFT
                </span>
              </button>
              <router-link v-if="!loading" to="/profile"
                ><button class="cancel--btn mt-3">
                  Back to Profile
                </button></router-link
              >
            </div>
          </div>
          <!-- Convert to NFT Successful  -->
          <div
            class=""
            v-else
          >
            <div class="">
              <div class="text-center">
                <img
                  src="@/assets/img/transfer_success.png"
                  width="200px"
                  alt=""
                />
              </div>
              <div class="text-center my-3">
                <h3
                  class="m-0 font-weight-bold"
                  style="color: var(--main-color)"
                >
                  Conversion to NFT Successful
                </h3>
                <p class="text-secondary" style="font-size: 12px">
                  Congratulations, this post is now an NFT!!!
                </p>
              </div>
              <div class="text-center" >
                <button @click="backToProfile" class="cancel--btn mt-3">
                    Back to Profile
                  </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    data(){
        return{
            
        }
    },
    convertToNFT() {
      this.$emit("convert");
    },
    backToProfile(){
        this.$emit("toProfile")
    },
    close(){
        this.$emit("closeModal")
    }
  },
  computed: {
    post() {
      return this.$store.getters["posts/getSinglePost"];
    },
    submitted(){
        return this.$store.getters["nft/isSuccess"]
    },
    loading() {
      return this.$store.getters["nft/isLoading"];
    },
  },
};
</script>