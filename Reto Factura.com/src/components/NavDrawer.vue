<script setup>
    //Imports
    import { ref, onMounted, onBeforeUnmount} from 'vue'

    //Props
    // eslint-disable-next-line no-unused-vars
    let props = defineProps({
        option: Number
    });

    //Emits
    let emit = defineEmits(['menuOption']);

    //State
    let smallScreen = ref(false);

    //Metodos
    onMounted(() => {
        checkScreenSize();

        window.addEventListener('resize', checkScreenSize);
    });

    onBeforeUnmount(() => {
        window.removeEventListener('resize', checkScreenSize);
    });

    const checkScreenSize = () => {
        if(window.innerWidth < 960) {
            smallScreen.value = true;
        } else {
            smallScreen.value = false;
        }
    }
    
</script>

<template>
    <v-navigation-drawer :width="250" :elevation="1" class="drawer" permanent>
        <v-list density="compact">
            <v-list-subheader>CFDI</v-list-subheader>
            <v-list-item 
                link 
                prepend-icon="mdi-file-document" 
                title="Lista Facturas" 
                class="menu-option"
                :class="{'selected-option': option == 0}"
                @click="emit('menuOption', 0)"
            ></v-list-item>
            <v-list-item 
                link 
                prepend-icon="mdi-plus-box" 
                title="Nuevo CFDI" 
                class="menu-option"
                :class="{'selected-option': option == 1}"
                @click="emit('menuOption', 1)"
            ></v-list-item>
        </v-list>


        <template v-slot:append>
            <v-divider></v-divider>
            <v-list>
                <v-list-item 
                    prepend-avatar="../src/assets/avatar-icon.jpg"
                    subtitle="guzhdz22@gmail.com"
                    title="Gustavo Hernández"
                    class="account-section"
                ></v-list-item>
            </v-list>
        </template>
    </v-navigation-drawer>
</template>

<style scope>
    .selected-option {
        background-color: var(--gray)
    }

    .menu-option .v-list-item__prepend > .v-icon {
        color: var(--primary)!important;
        opacity: .9 !important;
    }


</style>