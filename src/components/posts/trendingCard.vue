<template>
  <div>
    <div>
      <div class="rounded--card">
        <h6 class="text-secondary p-3">Trends for You</h6>
        <hr class="m-0">
        <div class="p-3" style="height:200px; overflow-y: auto;">
            <div class="trend d-flex justify-content-between mt-2" v-for="tag in tags" :key="tag.id" role="button" @click="searchTag(tag)">
                <div>
                    <h6> {{ tag.tag }} </h6>
                    <small class="text-secondary"> {{ tag.posts_count }} post<span v-if="tag.posts_count > 1">s</span>  </small>
                </div>
                <!-- <div>
                    <IconComponent icon="akar-icons:more-horizontal" />
                </div> -->
            </div>
            
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    data(){
        return{
        }
    },
    methods:{
        
        searchTag(tag) {
      let url = tag.tag;
      this.$router.push({ name: "search-results", query: { q: url } });
    },
    },
    beforeMount(){
        this.$store.dispatch("extras/getTags")
    },
    computed:{
        tags(){
            return this.$store.getters["extras/getTags"]
        }
    }
   
}
</script>