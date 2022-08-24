<template>
    <div>
         <div class="signup--page-wrapper row">
            <div class="signup--page-left-side col-md-6">
                <div class="text-center">
                    <img src="@/assets/img/login-img.png" class="animated-content animate__animated animate__pulse animate__slow animate__infinite	infinite" width="50%" alt="">
                    <div class="mt-1">
                        <h1 class="text-white font-weight-bold">Get access to more <br> exciting packages. </h1>
                    </div>
                </div>
            </div>
            <div class="signup-page-right-side col-md-6">
                 <div class="signup-page-content">
                    <div class="signup-page-header mb-4">
                        <img src="@/assets/img/logo.svg" width="20%" alt="">
                        <div class="my-4">
                            <h1 class="font-weight-bold">Create your account </h1>
                            <p class="small text-center text-secondary">Create Original Posts To Earn Money.</p>
                        </div>
                    </div>
                    
                    <div>
                        <router-view/>
                    </div>
                </div>
            </div>
        </div> 
    </div>
</template>

<script>
    import 'animate.css';
export default {
    components: { 
        },
    data() {
        return {
        
        };
    },
    methods: {
        
    },
    beforeMount() {
      this.$store.dispatch('extras/listCountries')
    }
    
}
</script>

<style>
.animated-content{
  --animate-duration: 4s;
}
</style>
