<template>
    <div>
        <div class="row">
            <div class="col-md-9">
                <div class="">
                    <search-top-bar/>
                </div>
            </div>
            <div class="col-md-3">
                <right-side/>
            </div>
        </div>
    </div>
</template>


<script>
import rightSide from '@/pages/user/profile/rightSide.vue'
import SearchTopBar from './searchTopBar.vue'
export default {
  components: { rightSide, SearchTopBar },
    
}
</script>