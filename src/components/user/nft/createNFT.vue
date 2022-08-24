<template>
  <div>
    <div>
      <div class="profile--section create--nft p-4 mb-4">
        <h4 class="font-weight-bold mb-4">Create NFT Collection</h4>
        <form action="" @submit.prevent="createNewCollection = true">
          <div class="mb-4">
            <label for="">Name</label>
            <input
              type="text"
              class="input"
              placeholder="What do you want to call your NFT Collection?"
              v-model="payload.name"
              required
            />
          </div>
          <div class="mb-4">
            <label for="">Symbol</label>
            <input
              type="text"
              class="input"
              placeholder="Add a symbol for your NFT Collection?"
              v-model="payload.symbol"
              required
            />
          </div>
          <div class="mb-4">
            <label for="">Description</label>
            <textarea
              name=""
              id=""
              placeholder="Add a description for the collection"
              cols="30"
              rows="5"
              v-model="payload.description"
              required
            ></textarea>
          </div>
          <div>
            <button class="primary--btn w-25 mx-auto">
              <span>Create NFT Collection</span>
            </button>
          </div>
        </form>
      </div>
    </div>
    <CreateCollection
      @closeModal="closeCollectionModal"
      v-show="createNewCollection"
      @createCollection="createNFTCollection"
      @toProfile="backToProfile"
    />
  </div>
</template>

<script>
import CreateCollection from "./modal/createCollection.vue";
export default {
  data() {
    return {
      imgSrc3: null,
      imgPreview: false,
      payload: {
        name: "",
        description: "",
        symbol: "",
      },
      createNewCollection: false,
    };
  },
  methods: {
    createNFTCollection() {
      let payload = {
        name: this.payload.name,
        description: this.payload.description,
        symbol: this.payload.symbol.toUpperCase(),
      };
      console.log(payload);
      this.$store.dispatch("nft/createCollection", payload);
    },
    closeCollectionModal() {
      this.createNewCollection = false;
    },
     backToProfile() {
      this.$router.push("/profile/nft-collections");
      this.$store.dispatch("nft/removeNFTCreationSuccess")
    },
  },
  computed: {
    loading() {
      return this.$store.getters["nft/isLoading"];
    },
  },
  components: { CreateCollection },
};
</script>