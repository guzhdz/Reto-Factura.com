<script setup>
    //Props
    // eslint-disable-next-line no-unused-vars
    let props = defineProps({
        message: String
    });

    //Emits
    let emit = defineEmits(['close']);
</script>

<template>
    <v-card>
        <v-card-item prepend-icon="mdi-alert-circle" class="card-header-error mb-3">
            <v-card-title>Error</v-card-title>
        </v-card-item>

        <v-card-text>
            <span class="card-subtitle mb-3">{{message}}</span>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
            <v-btn 
                color="#4265F0" 
                variant="elevated" 
                class="text-none ml-2"
                @click="emit('close')"
            >Aceptar</v-btn>
        </v-card-actions>
    </v-card>
</template>

<style scope>
    .card-header-error {
        background-color: #F44336;
        color: white;
    }

    .card-subtitle {
        display: block;
        font-size: 16px;
        text-align: center;
    }
</style>