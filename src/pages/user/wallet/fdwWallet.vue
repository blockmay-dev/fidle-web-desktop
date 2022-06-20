<template>
    <div>
        <div>
            <!-- Wallets Containers  -->
            <div class="mt-4">
                <WalletsView/>
            </div>

            <!-- Transaction History Table -->
            <div class="my-4">
                <TransactionsView/>
            </div>
        </div>
    </div>
</template>

<script>
import TransactionsView from '@/components/user/wallet/transactionsView.vue'
import WalletsView from '@/components/user/wallet/fdwWallet.vue'
export default {
    data() {
        return {
            transactions: []
        };
    },
    components: { TransactionsView, WalletsView },
    methods:{
        
    },
    mounted(){
    }
}
</script>