<template>
    <div class="">
        <div class="">
            <TrendingCard/>
        </div>
        <div class="mt-3">
            <SuggestionsCard/>
        </div>
    </div>
</template>

<script>
import TrendingCard from '@/components/posts/trendingCard.vue';
import SuggestionsCard from '@/components/posts/suggestionsCard.vue';
export default {
    components: { TrendingCard, SuggestionsCard }
}
</script>