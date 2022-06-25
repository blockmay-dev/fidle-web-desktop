<template>
  <div>
    <div class="row">
      <div class="col-md-9">
        <ul
          class="nav nav-pills mb-3 search--results p-3 rounded-lg"
          id="pills-tab"
          role="tablist"
        >
          <li class="nav-item" role="presentation">
            <a
              class="nav-link active"
              id="pills-home-tab"
              data-toggle="pill"
              href="#pills-home"
              role="tab"
              aria-controls="pills-home"
              aria-selected="true"
              >All Notifications
            </a>
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
              >Unread Notifications
              <span class="badge badge-pill badge-danger">
                {{
                notifications_count
              }}
              </span>
            </a>
          </li>
        </ul>
        <div class="tab-content" id="pills-tabContent">
          <div
            class="tab-pane fade show active"
            id="pills-home"
            role="tabpanel"
            aria-labelledby="pills-home-tab"
          >
            <all-notifications/>
          </div>
          <div
            class="tab-pane fade"
            id="pills-profile"
            role="tabpanel"
            aria-labelledby="pills-profile-tab"
          >
            <unread-notifications/>
          </div>
        </div>
      </div>
      <div class="col-md-3">
        <right-side />
      </div>
    </div>
  </div>
</template>

<script>
import rightSide from "@/pages/user/profile/rightSide.vue";
import AllNotifications from "./allNotifications.vue";
import UnreadNotifications from "./unreadNotifications.vue";
export default {
  components: { rightSide, AllNotifications, UnreadNotifications },
  data(){
    return{
    }
  },
  methods: {
  },
  computed:{
    notifications_count(){
      return this.$store.getters.getNotificationsCount
    },
  }
};
</script>