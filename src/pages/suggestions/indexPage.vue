<template>
    <div class="container-fluid py-4">
        <div class="row">
            <div class="col-md-4">
                <SuggestionsList/>
            </div>
            <div class="col-md-8">
                <MainProfile/>
            </div>
        </div>
    </div>
</template>

<script>
import SuggestionsList from './suggestionsList.vue';
import MainProfile from '../fidler/mainProfile.vue';
export default {
    components: { SuggestionsList, MainProfile }
}
</script>