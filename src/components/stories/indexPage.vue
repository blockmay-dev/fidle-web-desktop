<template>
  <div>
    <div>
      <div class="mt-3">
        <SidePane/>
        <div id="main-story">
            <router-view/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SidePane from './sidePane.vue';
export default {
    components: { SidePane }
}
</script>