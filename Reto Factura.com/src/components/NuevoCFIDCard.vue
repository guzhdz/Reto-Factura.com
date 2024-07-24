<script setup>
    //Imports
    import NewCFDIForm from './NewCFDIForm.vue';
    import LoadingDialog from './LoadingDialog.vue'
    import SuccessDialog from './SuccessDialog.vue';
    import ErrorDialog from './ErrorDialog.vue';
    import { ref } from 'vue'

    //State
    let loadingDialog = ref(false);
    let successDialog = ref(false);
    let errorDialog = ref(false);
    let msgSuccess = ref('Success');
    let msgError = ref('Error');

    //Emits
    const emit = defineEmits(['menu-option']);

    //Metodos
    const closeSuccessDialog = (value) => {
        successDialog.value = false;
        emit('menu-option', value);
    }

    const handleSuccess = (msg) => {
        msgSuccess.value = msg;
        loadingDialog.value = false;
        successDialog.value = true;
    }

    const handleError = (msg) => {
        msgError.value = msg;
        loadingDialog.value = false;
        errorDialog.value = true;
    }

</script>

<template>
    <v-card-item class="card-title mb-4">
        <v-card-title class="text-h6 mb-2 title">Por favor ingresa la siguiente 
            informacion para la creacion de un nuevo CFDI
        </v-card-title>

        <v-chip color="#FF6C0A">Los campos con * son obligatorios</v-chip>

    </v-card-item>

    <v-container>
        <NewCFDIForm 
            @crear="loadingDialog = true" 
            @success=" (msg) => handleSuccess(msg)" 
            @error="(msg) => handleError(msg)"
        />
    </v-container>

    <v-dialog v-model="loadingDialog" width="auto" min-width="250" transition="dialog-bottom-transition">
        <LoadingDialog :text="'Creando CFDI'"/>
    </v-dialog>

    <v-dialog v-model="successDialog" width="auto" min-width="250" transition="dialog-bottom-transition" persistent>
        <SuccessDialog :message="msgSuccess" @close="(value) => closeSuccessDialog(value)"/>
    </v-dialog>

    <v-dialog v-model="errorDialog" width="auto" min-width="250" transition="dialog-bottom-transition">
        <ErrorDialog :message="msgError" @close="errorDialog = false"/>
    </v-dialog>
</template>

<style scope>
    .title {
        color: var(--secondary-dark) !important;
    }

    .card-title .v-card-item__prepend > .v-icon {
        color: var(--primary-light)!important;
    }
</style>