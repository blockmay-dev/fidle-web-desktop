<template>
    <div>
        <div class="container-fluid py-4">
            <div class="row">
                <div class="col-md-2">
                    <LeftSide class="position-fixed" style="width:15%"/>
                </div>
                <div class="col-md-7">
                    <CenterArea/>
                </div>
                <div class="col-md-3">
                    <RightSide/>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import LeftSide from './leftSide.vue';
import CenterArea from './centerArea.vue';
import RightSide from './rightSide.vue';
export default {
    components: { LeftSide, CenterArea, RightSide }
}
</script>