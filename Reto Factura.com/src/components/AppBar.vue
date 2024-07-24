<script setup>
    //Props
    // eslint-disable-next-line no-unused-vars
    const props = defineProps({
        title: String
    });
</script>

<template>
    <v-app-bar :elevation="1" class="app-bar">
        <div class="img-container">
            <v-img 
            :width="200"
            src="../src/assets/factura-logo.svg"
            class="mx-auto"></v-img>
        </div>

        <v-app-bar-title class="font-weight-bold bar-title" >{{title || "Sin titulo"}}</v-app-bar-title>
    </v-app-bar>
</template>

<style scope>

    .img-container {
        width: 250px;
        border-right: 2px solid var(--gray);

    }

    .bar-title {
        font-size: 25px;

        color: var(--secondary-dark);
    }
</style>