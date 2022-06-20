<template>
    <div>
        <div id="main">
            <AppHeader/>
            <div class="container-fluid my-3">
                <SidePane/>
                <div class="main--content">
                    <router-view :key="$route.fullPath"/>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import AppHeader from '@/components/navigation/appHeader.vue';
import SidePane from '@/components/user/sidePane.vue';
export default {
    components: { AppHeader, SidePane }
}
</script>