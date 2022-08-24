<template>
  <div id="app" class="">
    <router-view :key="$route.fullPath"/>
  </div>
</template>



<script>
export default {
  mounted(){
    console.log(this.$store.getters["auth/isLoggedIn"]);
  }
}
</script>
<style>

</style>
