<template>
    <div>
        <div class="profile">
            <div class="row">
                <div class="col-md-9">
                <CreateNFT/>
            </div>
            <div class="col-md-3">
                <RightSide/>
            </div>
            </div>
        </div>
    </div>
</template>

<script>
import RightSide from '@/pages/user/profile/rightSide.vue';
import CreateNFT from './createNFT.vue';
export default {
    components: { RightSide, CreateNFT }
}
</script>

