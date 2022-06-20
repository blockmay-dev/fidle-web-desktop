<template>
    <div class="">
        <div class="">
            <MessagesCard/>
        </div>
        <div class="mt-3">
            <SuggestionsCard/>
        </div>
    </div>
</template>

<script>
import MessagesCard from '@/components/posts/messagesCard.vue';
import SuggestionsCard from '../../components/posts/suggestionsCard.vue';
export default {
    components: { MessagesCard, SuggestionsCard }
}
</script>