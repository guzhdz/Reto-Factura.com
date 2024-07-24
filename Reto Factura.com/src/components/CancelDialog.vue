<script setup>
    import { ref, watch } from 'vue';

    //Props
    // eslint-disable-next-line no-unused-vars
    const props = defineProps({
        info: {
            uid: String,
            folio: String,
            facturas: Array
        }
    });

    //Emits
    const emit = defineEmits(['close']);

    //State
    const selectMotivo = ref(null);
    const selectCFDI = ref(null);
    const motivos = ref([
        {
            key: "01",
            motivo: "Comprobante emitido con errores con relación"
        },
        {
            key: "02",
            motivo: "Comprobante emitido con errores sin relación"
        },
        {
            key: "03",
            motivo: "No se llevó a cabo la operación"
        }, 
        {
            key: "04",
            motivo: "Operación nominativa relacionada en la factura global"
        }
    ]);
    const valid = ref(true);

    //Watchers
    watch(selectMotivo, () => {
        validate();
    });

    watch(selectCFDI, (newCFDI, oldCFDI) => {
        if(!oldCFDI && newCFDI) {
            validate()
        }
    });

    //Metodos
    const itemProps = (item) => {
        return {
            title: `Folio: ${item.Folio}`,
            subtitle: `Cliente: ${item.RazonSocialReceptor}`
        }
    }

    const validate = () => {
        if(selectMotivo.value) {
            if(selectMotivo.value == "01") {
                valid.value = !selectCFDI.value
            } else
                valid.value = false;
        } else 
            valid.value = true;
    }

</script>

<template>
    <v-card>
        <v-card-item prepend-icon="mdi-delete-alert" class="card-header mb-3">
            <v-card-title>Cancelar CFDI {{info.folio}}</v-card-title>
        </v-card-item>

        <v-card-text>
            <span class="card-subtitle mb-3">¿Seguro que deseas cancelar esta factura? Si es asi llena los campos</span>
            <v-select 
                label="Motivo de cancelacion" 
                :items="motivos" 
                item-title="motivo"
                item-value="key"
                density="compact" 
                v-model="selectMotivo"
                variant="outlined"
                color="#FF6C0A"
            ></v-select>

            <v-select v-if="selectMotivo == '01'"
                label="CFDI que lo reemplazara" 
                :items="info.facturas" 
                :item-props="itemProps"
                item-value="UID"
                density="compact" 
                v-model="selectCFDI"
                variant="outlined"
                color="#FF6C0A"
            ></v-select>
        </v-card-text>
        <v-divider></v-divider>

        <v-card-actions>
            <v-btn 
                color="red" 
                variant="elevated" 
                class="text-none" 
                @click="emit('close', false)"
            >NO cancelar</v-btn>

            <v-btn 
                color="#4265F0" 
                variant="elevated" 
                class="text-none ml-2" 
                @click="emit('close', true, {motivo: selectMotivo, UID: selectCFDI})"
                :disabled="valid"
            >Si cancelar</v-btn>
        </v-card-actions>
    </v-card>
</template>

<style scope>
    .card-header {
        background-color: var(--secondary-dark);
        color: white;
    }

    .card-subtitle {
        display: block;
        font-size: 16px;
    }
</style>