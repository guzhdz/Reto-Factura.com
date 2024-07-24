<script setup>
    import CancelDialog from './CancelDialog.vue'
    import LoadingDialog from './LoadingDialog.vue'
    import axios from 'axios';
    import { ref } from 'vue';

    //Props
    const props = defineProps({
        facturas: Array,
        loadingData: Boolean
    });

    //Emits
    const emit = defineEmits(['reload']);

    //States
    let cancelDialog = ref(false);
    let cancelDialogInfo = ref({
        uid: "",
        folio: "",
        facturas: []
    }); 
    let snackbar = ref(false);
    let messageSnack  = ref("");
    let loadingDialog = ref(false);

    //Metodos
    const sendEmail = async (uid) => {
        let message = "";
        message = "Enviando CFDI...";
        openSnackbar(message);
        const response = await axios.get(`http://localhost:4000/send-CFDI/${uid}`);
        message = response.data.message;
        openSnackbar(message);
        emit('reload');
    };

    const cancelFactura = async (cancel, info) => {
        cancelDialog.value = false;
        let message = "";
        if(cancel) {
            loadingDialog.value = true;

            const body = {
                uid: cancelDialogInfo.value.uid,
                motivo: info.motivo,
                sustituto: info.motivo != '01'? null : info.UID
            }

            const response = await axios.post(`http://localhost:4000/cancel-CFDI`, body);
            loadingDialog.value = false;
            message = response.data.message;
            openSnackbar(message);
            emit('reload');
        }
    }

    const openCancelDialog = async (uid, folio, status) => {
        if(status != "cancelada") {
            cancelDialogInfo.value.uid = uid;
            cancelDialogInfo.value.folio = folio;
            cancelDialogInfo.value.facturas = props.facturas.filter((factura) => (factura.Status !="cancelada" && factura.UID != uid));
            cancelDialog.value = true;
        } else {
            openSnackbar("Esta factura ya fue cancelada");
        }
    }

    const openSnackbar = (message) => {
        messageSnack.value = message;
        snackbar.value = true;
    };

</script>

<template>
    <article>
        <v-table>
            <thead>
                <tr>
                    <th class="text-left">Tipo Documento</th>
                    <th class="text-left">Folio</th>
                    <th class="text-left">Serie</th>
                    <th class="text-left">Total</th>
                    <th class="text-left">Fecha</th>
                    <th class="text-left">Estatus</th>
                    <th class="text-left"></th>
                </tr>
            </thead>

            <tbody>
                <tr v-for="factura in facturas" :key="factura.UID">
                    <td>Factura</td>
                    <td>{{factura.Folio}}</td>
                    <td>{{factura.Version}}</td>
                    <td>$ {{parseFloat(factura.Total)}}</td>
                    <td>{{factura.FechaTimbrado}}</td>
                    <td>
                        <v-chip 
                            :color="factura.Status == ('cancelada') ? 'red' : 'green'">
                            {{factura.Status == ("cancelada") ? "Cancelada" : "Enviada"}}
                        </v-chip>
                    </td>
                    <td><v-btn icon="mdi-dots-vertical" size="small" variant="text"></v-btn>
                        <v-menu activator="parent">
                            <v-list>
                                <v-list-item 
                                    link 
                                    @click="openCancelDialog(factura.UID, factura.Folio, factura.Status)"
                                >Cancelar CFDI</v-list-item>
                                <v-list-item 
                                    link 
                                    @click="sendEmail(factura.UID)"
                                >Enviar CFDI</v-list-item>
                            </v-list>
                        </v-menu>
                    </td>
                </tr>
            </tbody>
        </v-table>

        <div class="sin-resultados d-flex mx-auto mt-10" v-if="facturas.length == 0 && !loadingData">
            <v-icon icon="mdi-folder-off" color="var(--secondary-dark)"></v-icon>
            <span v-if="!loadingData">No se encontraron resultados</span>
        </div>

        <div class="sin-resultados d-flex mx-auto mt-10" v-if="loadingData">
            <v-progress-circular
                color="var(--primary)" 
                indeterminate size="60" 
                class="mx-auto"
            ></v-progress-circular>
        </div>
    </article>

    <v-dialog v-model="cancelDialog" width="auto" transition="dialog-bottom-transition">
        <CancelDialog :info="cancelDialogInfo" @close="(cancel, info) => cancelFactura(cancel, info)"/>
    </v-dialog>

    <v-dialog v-model="loadingDialog" width="auto" transition="dialog-bottom-transition">
        <LoadingDialog :text="'Cancelando Factura'"/>
    </v-dialog>

    <v-snackbar v-model="snackbar">
        {{messageSnack}}
    </v-snackbar>
</template>

<style scope>
    thead {
        background-color: var(--secondary-light);
    }

    th {
        font-size: 16px;
        font-weight: 700 !important;
    }

    td {
        font-size: 16px;
    }

    .sin-resultados {
        flex-direction: column;
        justify-content: center;
        align-items: center;

        font-size: 16px;
    }
</style>