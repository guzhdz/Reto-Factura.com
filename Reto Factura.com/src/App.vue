<script setup>
  //Imports
  import AppBar from './components/AppBar.vue'
  import NavDrawer from './components/NavDrawer.vue'
  import ListFacturasCard from './components/ListFacturasCard.vue'
  import NuevoCFIDCard from './components/NuevoCFIDCard.vue'
  import { ref } from 'vue'

  //State
  let option = ref(0);
  let title = ref("Lista Facturas");

  //Metodos
  let changeOption = (newOption) => {
    option.value = newOption;
    changeTitle(newOption);
  }

  let changeTitle = (newOption) => {
    switch (newOption) {
      case 0:
        title.value = "Lista Facturas";
        break;
      
      case 1:
        title.value = "Nuevo CFDI"
        break;

      default:
        break;
    }
  }
  
</script>

<template>
  <v-app>
    <AppBar :title="title"/>
    <NavDrawer :option="option" @menu-option="(newOption) => changeOption(newOption)"/>
    
    
    <v-main class="w-100 mt-4">
      <v-container class="w-100">
        <ListFacturasCard v-if="option == 0" @menu-option="(newOption) => changeOption(newOption)"/>

        <NuevoCFIDCard v-if="option == 1" @menu-option="(newOption) => changeOption(newOption)"/>
      </v-container>
    </v-main>
  </v-app>
</template>

<style scoped>

</style>
