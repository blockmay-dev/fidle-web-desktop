<template>
  <div>
    <div id="main">
      <AppHeader />
      <router-view />
    </div>
  </div>
</template>

<script>
import AppHeader from "@/components/navigation/appHeader.vue";
export default {
  components: { AppHeader },
  data() {
    return {};
  },

//   beforeRouteEnter(to, from, next) {
//     var loggedIn;
//     loggedIn = localStorage.getItem("loggedIn")
//     if (!loggedIn) {
//       next({
//         name: "sign-in",
//         query: { redirectFrom: to.fullPath },
//       });
//     } else {
//       next();
//     }
//   },

  created() {},
};
</script>