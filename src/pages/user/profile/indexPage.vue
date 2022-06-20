<template>
    <div>
        <div class="profile">
            <div class="row">
                <div class="col-md-9">
                <MainProfile/>
            </div>
            <div class="col-md-3">
                <RightSide/>
            </div>
            </div>
        </div>
    </div>
</template>

<script>
import RightSide from './rightSide.vue';
import MainProfile from './mainProfile.vue';
export default {
    components: { RightSide, MainProfile }
}
</script>