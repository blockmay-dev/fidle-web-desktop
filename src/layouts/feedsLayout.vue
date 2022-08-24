<template>
  <div>
    <div id="main">
      <AppHeader/>
      <router-view />
    </div>
  </div>
</template>

<script>
import AppHeader from "@/components/navigation/appHeader.vue";
export default {
  components: { AppHeader},
  data() {
    return {
      
    };
  },
  created() {},
};
</script>