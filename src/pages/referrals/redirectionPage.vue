<template>
    <div>
        <div>
            <div class="container text-center mt-5">
                <div>
                    <i class="el-icon-loading" style="font-size:60px"></i>
                </div>
                <h4>Redirecting</h4>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    created(){
        let referral_code = this.$route.query.referral_code
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|OperaMini/i.test(navigator.userAgent)) {
            window.location.href = `https://m.fidle.io/r?referral_code=${referral_code}`;
        }
        else{
            this.$router.push(`/sign-up?referral_code=${referral_code}`)
        }
    }
}
</script>
