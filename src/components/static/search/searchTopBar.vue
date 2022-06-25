<template>
  <div>
    <div>
      <ul class="nav nav-pills mb-3 search--results p-3 rounded-lg" id="pills-tab" role="tablist">
        <li class="nav-item" role="presentation">
          <a
            class="nav-link active"
            id="pills-home-tab"
            data-toggle="pill"
            href="#pills-home"
            role="tab"
            aria-controls="pills-home"
            aria-selected="true"
            >User<span v-if="users_count > 1 ">s</span> <span class="badge badge-pill badge-danger">{{ users_count }}</span> </a
          >
        </li>
        <li class="nav-item" role="presentation">
          <a
            class="nav-link"
            id="pills-profile-tab"
            data-toggle="pill"
            href="#pills-profile"
            role="tab"
            aria-controls="pills-profile"
            aria-selected="false"
            >Posts <span class="badge badge-pill badge-danger">{{ posts_count }}</span> </a
          >
        </li>
      </ul>
      <div class="tab-content" id="pills-tabContent">
        <div
          class="tab-pane fade show active"
          id="pills-home"
          role="tabpanel"
          aria-labelledby="pills-home-tab"
        >
          <UserResults/>
        </div>
        <div
          class="tab-pane fade"
          id="pills-profile"
          role="tabpanel"
          aria-labelledby="pills-profile-tab"
        >
          <post-results/>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import PostResults from '@/components/static/search/postResults.vue'
import UserResults from '@/components/static/search/userResults.vue'
export default {
    components:{
        PostResults, UserResults
    },
    data(){
        return {
            posts_count: '',
            users_count: ''
        }
    },
    methods: {
        getPosts() {
      let searchItem =  this.$route.query.q
      console.log(searchItem);
      this.$axios
        .get("user/feeds?search="+searchItem)
        .then((res) => {
          console.log(res.data);
          this.posts_count = res.data.count
          console.log(this.posts_count);
        })
    },
     getUsers() {
      let searchItem =  this.$route.query.q
      console.log(searchItem);
      this.$axios
        .get("users?search="+searchItem)
        .then((res) => {
          console.log(res.data);
          this.users_count = res.data.count
          console.log(this.users_count);
        })
    },
    },
    mounted(){
        this.getPosts();
        this.getUsers();
    }
}
</script>