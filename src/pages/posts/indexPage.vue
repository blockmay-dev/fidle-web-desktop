<template>
    <div>
        <div class="container-fluid py-4">
            <div class="row">
                <div class="">
                    <LeftSide class="position-fixed" style="width:205px; z-index:9999;"/>
                </div>
                <div class="col-9">
                    <CenterArea style="margin-left:220px;"/>
                </div>
                <div class="col-3">
                    <RightSide class="position-fixed" style="width:320px; height: 80vh; overflow-y: auto; top: 100px;"/>
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