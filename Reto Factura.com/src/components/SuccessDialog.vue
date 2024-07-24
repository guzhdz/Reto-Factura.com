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
        <v-card-item prepend-icon="mdi-check-decagram" class="card-header-success mb-3">
            <v-card-title>Se ha creado el CFDI con exito</v-card-title>
        </v-card-item>

        <v-card-text>
            <span class="card-subtitle mb-3">{{message}}</span>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
            <v-btn 
                color="#171D64" 
                variant="elevated" 
                class="text-none"
                @click="emit('close', 1)"
            >Nuevo CFDI</v-btn>

            <v-btn 
                color="#4265F0" 
                variant="elevated" 
                class="text-none ml-2"
                @click="emit('close', 0)"
            >Lista facturas</v-btn>
        </v-card-actions>
    </v-card>
</template>

<style scope>
    .card-header-success {
        background-color: #4CAF50;
        color: white;
    }

    .card-subtitle {
        display: block;
        font-size: 16px;
        text-align: center;
    }
</style>