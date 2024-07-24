<script setup>
    //Props
    // eslint-disable-next-line no-unused-vars
    const props = defineProps({
        text: String
    });
</script>

<template>
    <v-card>
        <v-card-title>{{text}}</v-card-title>
        <v-card-text class="w-100 d-flex">
            <v-progress-circular 
                color="var(--primary)" 
                indeterminate size="40" 
                class="mx-auto"
            ></v-progress-circular>
        </v-card-text>
    </v-card>
</template>

<style scope>
</style>