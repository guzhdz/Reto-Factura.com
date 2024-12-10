<script setup>
    //Imports
    import ListaFacturas from './ListaFacturas.vue';
    import axios from 'axios';
    import { ref, watch, computed, onMounted } from 'vue';

    //State
    let inputUID = ref("");
    let numRes = ref(20);
    let tab = ref(0);
    let facturas = ref([]);
    let loadingData = ref(false);

    //Emits
    const emit = defineEmits(['menu-option']);

    //Watchers
    watch(numRes, () => {
        getFacturas();
    });

    //Metodos
    onMounted(async () => {
        getFacturas();
    });

    const getFacturas = async () => {
        loadingData.value = true;
        const response = await axios.get(`https://reto-factura-com.onrender.com/list-cfdis/1/${numRes.value}`);
        facturas.value = response.data.data.filter(factura => factura.Status != "eliminada");
        loadingData.value = false;
    };

    const searchUID = async () => {
        if (inputUID.value) {
            const response = await axios.get(`https://reto-factura-com.onrender.com/search-UID/${inputUID.value}`);
            if(response.data.status != "error")
                facturas.value = [response.data.data];
            else
                facturas.value = [];
        } else {
            getFacturas();
        }

    }

    const filteredFacturas = computed(() => {
        switch (tab.value) {
            case 1:
                return facturas.value.filter((factura) => factura.Status == 'enviada');

            case 2:
                return facturas.value.filter((factura) => factura.Status == 'cancelada')
        
            default:
                return facturas.value;
        }
    });

    const sort = (type) => { 
        switch(type) {
            case 0:
                facturas.value.sort((a, b) => a.Folio.localeCompare(b.Folio));
                break;
            
            case 1:
                facturas.value.sort((a, b) => parseFloat(a.Version) - parseFloat(b.Version));
                break;
            
            case 2:
                facturas.value.sort((a, b) => parseFloat(a.Total) - parseFloat(b.Total));
                break;

            case 3:
                facturas.value.sort((a, b) => new Date(a.FechaTimbrado) - new Date(b.FechaTimbrado));
                break;

            default:
                break;
        }
    };
</script>

<template>
    <article class="d-flex">
        <v-text-field 
            clearable 
            label="Buscar por UID" 
            variant="outlined"
            density="compact"
            rounded="lg"
            max-width="600"
            color="#FF6C0A"
            v-model="inputUID"
            @keydown.enter="searchUID"
        ></v-text-field>

        <v-btn 
            icon="mdi-magnify" 
            size="small" 
            class="ml-2" 
            variant="tonal" 
            color="var(--primary)"
            @click="searchUID"
        ></v-btn>

        <v-select 
            label="Resultados" 
            :items="[20, 100, 1000]" 
            density="compact" 
            v-model="numRes"
            variant="outlined"
            color="#FF6C0A"
            max-width="100"
            class="ml-auto"
        ></v-select>
    </article>
        

    <article class="d-flex w-100 options">
        <v-tabs color="var(--secondary)" class="mr-auto" v-model="tab">
            <v-tab :value="0">Todos</v-tab>
            <v-tab :value="1">Enviados</v-tab>
            <v-tab :value="2">Cancelados</v-tab>
        </v-tabs>

        <v-btn 
            prepend-icon="mdi-plus" 
            class="text-capitalize mr-2" 
            variant="elevated" 
            color="#FF6C0A"
            @click="emit('menu-option', 1)"
        >Nueva</v-btn>
            
        <v-btn 
            prepend-icon="mdi-order-alphabetical-ascending" 
            class="text-capitalize mr-2" 
            variant="elevated" 
            color="#171D64"
        >
            Ordenar
            <v-menu activator="parent">
                <v-list>
                    <v-list-subheader>Ordenar por</v-list-subheader>
                    <v-list-item link @click="sort(0)">Folio</v-list-item>
                    <v-list-item link @click="sort(1)">Serie</v-list-item>
                    <v-list-item link @click="sort(2)">Total</v-list-item>
                    <v-list-item link @click="sort(3)">Fecha</v-list-item>
                </v-list>
            </v-menu>
        </v-btn>

        <v-btn 
            prepend-icon="mdi-swap-vertical" 
            class="text-capitalize" 
            variant="elevated" 
            color="#171D64"
            @click="facturas.reverse()"
        >Invertir</v-btn>
            
    </article>

    <ListaFacturas :facturas="filteredFacturas" @reload="getFacturas" :loadingData="loadingData"/>
</template> 

<style scope>
    .options {
        align-items: center;
        margin-bottom: 25px;
    }
</style>