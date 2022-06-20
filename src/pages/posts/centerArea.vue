<template>
    <div>
        <div class="">
            <ViewStories/>
        </div>

        <div class="mt-3">
            <MainPost/>
        </div>
    </div>
</template>

<script>
import ViewStories from '@/components/posts/viewStories.vue';
import MainPost from '../../components/posts/mainPost.vue';
export default {
    components: { ViewStories, MainPost }
}
</script>