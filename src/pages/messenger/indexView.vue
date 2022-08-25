<template>
  <div>
    <div class="messenger pb-4">
      <div>
        <div class="d-flex" style="gap: 18px">
          <!-- Chat Listing area  -->
          <div class="w-25">
            <SidePane/>
          </div>

          <!-- Chat Box Area  -->
          <div class="w-75">
            <router-view/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SidePane from "./sidePane.vue";
export default {
    data() {
        return {};
    },
    components: { SidePane }
}
</script>
