<template>
  <div>
    <div>
      <div class="go--back mb-2" role="button">
        <span>
          <i class="el-icon-arrow-left"></i>
        </span>
        <span> back </span>
      </div>

      <!-- View Nfts In Collection  -->
      <div>
         <!-- No NFT in this Collections yet -->
        <div class="text-center p-5" v-if="viewCollection.results.length === 0">
            <div class="top mb-3">
                <img src="@/assets/img/noNFT.svg" alt="">
            </div>
            <h4 class="font-weight-bold" style="color:var(--main-color)">No NFT in this Collection Yet</h4>
            <p class="small w-50 mx-auto my-3">No NFTs in this collection, go to <router-link to="/profile">your posts</router-link> to convert to NFT </p>
            <!-- <router-link to="/create-nft-collection"><button class="primary--btn w-25 small mx-auto"></button></router-link> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    computed: {
        viewCollection(){
            return this.$store.getters["nft/singleCollection"]
        }
    }
}
</script>