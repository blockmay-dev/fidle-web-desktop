<template>
    <div class="">
        <div>
            <ProfileCard/>
        </div>
        <div class="mt-3">
            <TrendingCard/>
        </div>
    </div>
</template>

<script>
import ProfileCard from '@/components/posts/profileCard.vue';
import TrendingCard from '../../components/posts/trendingCard.vue';
export default {
    components: { ProfileCard, TrendingCard }
}
</script>