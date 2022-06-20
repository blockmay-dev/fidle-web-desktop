<template>
  <div>
    <div>
      <!-- Loader -->
      <div class="login--loader" v-show="loader">
        <div class="d-flex justify-content-center justify-content-center">
          <div class="spinner-border text-light" role="status">
            <span class="sr-only">Loading...</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
    props: ['loader']
    
}
</script>