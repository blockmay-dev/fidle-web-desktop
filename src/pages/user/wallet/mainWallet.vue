<template>
    <div>
        <div>
            <!-- Wallets Containers  -->
            <div class="mt-4">
                <WalletsView/>
            </div>
        </div>
    </div>
</template>

<script>
import WalletsView from '@/components/user/wallet/walletsView.vue'
export default {
    data() {
        return {
            transactions: []
        };
    },
    components: { WalletsView },
    methods:{
        
    },
    mounted(){
    }
}
</script>