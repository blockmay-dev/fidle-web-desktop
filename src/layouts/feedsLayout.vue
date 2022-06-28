<template>
    <div>
        <div id="main">
            <AppHeader/>
            <router-view/>
        </div>
    </div>
</template>

<script>
import AppHeader from '@/components/navigation/appHeader.vue';
export default {
    components: { AppHeader },
    created(){
    if(!this.$store.getters.isLoggedIn ){
      this.$router.push("/")
    }
    }
}
</script>