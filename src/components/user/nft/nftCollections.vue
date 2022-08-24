<template>
  <div>
    <div class="">
      <div class="">
        <!-- No NFT Collections yet -->
        <div class="text-center p-5" v-if="nftCollections.results.length === 0">
            <div class="top mb-3">
                <img src="@/assets/img/noNFT.svg" alt="">
            </div>
            <h4 class="font-weight-bold" style="color:var(--main-color)">No Collection Found</h4>
            <p class="small w-50 mx-auto my-3">Your NFTs will be stored in collections, You haven’t created any collections yet. </p>
            <router-link to="/create-nft-collection"><button class="primary--btn w-25 small mx-auto">Create NFT Collection</button></router-link>
        </div>

        <!-- NFT Collections -->
        <div v-else>
          <router-link to="/create-nft-collection"><button class=" position-static primary--btn shadow-lg w-25 small ml-auto mb-3">Create NFT Collection</button></router-link>
          <div class="nft--collections" >
            <div v-for="item in nftCollections.results" class="nft--collection" :key="item.id" role="button" @click="viewCollection(item)">
            <img :src="item.image" alt="">
            <h6 class="text-capitalize text-center font-weight-bold"> {{ item.name }} </h6>
          </div>
          </div>
        </div>

      </div>
      
    </div>
  </div>
</template>

<script>
export default {
  methods:{
    viewCollection(item){
      this.$router.push(`/profile/nft-collections/${item.id}`)
      this.$store.dispatch('nft/getCollectionById', item.id)
    }
  },
  beforeMount(){
    let id = this.$store.getters["auth/getUser"].username
    this.$store.dispatch("nft/getCollections", id)
  },
  computed: {
    nftCollections(){
      return this.$store.getters["nft/nftCollections"]
    }
  }
}
</script>