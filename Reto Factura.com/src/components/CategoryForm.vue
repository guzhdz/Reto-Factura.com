<script setup>
    //Props
    // eslint-disable-next-line no-unused-vars
    let props = defineProps({
        icon: String,
        subtitle: String
    });
</script>

<template>
    <v-container class="form-subtitle-container d-flex align-center border-b-lg mb-5">
        <v-icon :icon="icon" size="x-large" class="mr-2" color="var(--secondary)"></v-icon>
         <p class="text-h6">{{subtitle}}</p>
    </v-container>
</template>

<style scope>
    .form-subtitle-container {
        padding: 4px 0 !important;
        border-color: var(--secondary) !important;
    }
</style>