<template>
  <div>
    <div class="">
      <div>
        <div
          class="bg-white rounded-lg notifications-bar p-3 mb-3"
          v-for="notification in notifications"
          :key="notification.id"
        >
          <div class="d-flex" style="gap:20px">
            <div>
              <span class="notification--type" v-if="notification.type">
                <IconComponent
                  v-show="notification.data.type == 'post_like'"
                  icon="flat-color-icons:like"
                />
                <IconComponent
                  v-show="notification.data.type == 'comment'"
                  icon="ep:comment"
                />
                <IconComponent
                  v-show="notification.data.type == 'post'"
                  icon="material-symbols:post-add"
                />
                <IconComponent
                  v-show="notification.data.type == 'follow'"
                  icon="carbon:user-follow"
                />
              </span>
            </div>
            <div>
              <p>{{ notification.title }}</p>
              <small style="color: var(--blue-300)">{{
                timeRange(new Date(notification.date_created * 1000.0))
              }}</small>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  timeRange,
  sliceContent,
  dollarFilter,
  colorSplit,
  timeStamp,
} from "@/plugins/filter";
export default {
  data() {
    return {
      timeStamp,
      timeRange,
      sliceContent,
      dollarFilter,
      colorSplit,
    };
  },
  methods: {
  },
  computed:{
    notifications(){
      let items = this.$store.getters.getNotifications
      const value = items.filter((elem) => !elem.read);
      return value
    }
  }
};
</script>