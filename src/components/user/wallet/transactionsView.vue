<template>
  <div>
    <div class="bg-white p-3">
        <h5 class="mb-3">Transaction History</h5>
      <table class="table table-bordered">
  <thead>
    <tr>
      <th scope="col">Date</th>
      <th scope="col">Transaction Type</th>
      <th scope="col">Description</th>
      <th scope="col">Amount</th>
      <th scope="col">Status</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="transaction in transactions.results" :key="transaction.id">
      <td>  {{timeStamp(new Date(transaction.date_created * 1000.0))}}  </td>
      <td>
        <span class="transaction--type">
            <img v-if="transaction.transaction_type == 'credit' " src="@/assets/img/deposit.svg" alt="" srcset="">
            <img v-else src="@/assets/img/withdrawal.svg" alt="" srcset="">
        </span>
        <span class="text-capitalize">
            {{ transaction.transaction_type }}
        </span>
        </td>
      <td> {{ transaction.description }} </td>
      <td> {{ transaction.amount }}{{ transaction.currency }} </td>
      <td> <span :class="transaction.status"> {{ transaction.status }} </span> </td>
    </tr>
  </tbody>
</table>
    </div>
  </div>
</template>

<script>
import {
  timeRange,
  sliceContent,
  dollarFilter,
  colorSplit,
  timeStamp,
} from "@/plugins/filter";
  export default {
    data() {
        return {
            timeStamp,
            timeRange,
            sliceContent,
            dollarFilter,
            colorSplit,
            transactions: []
        };
    },
    methods:{
        getTransactions(){
            this.$axios.get('user/wallet/transactions/')
            .then((res)=>{
                console.log(res);
                this.transactions = res.data
            })
            .catch((err)=>{
                console.log(err);
            })
        }
    },
    mounted(){
        this.getTransactions()
    }
  }
</script>