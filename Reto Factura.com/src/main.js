import './assets/main.css'

//Imports vue and cuetify
import { createApp } from 'vue'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.css'

//Components
import App from './App.vue'

const vuetify = createVuetify({
    components,
    directives,
    icons: {
        iconfont: 'mdi' 
    }
})

createApp(App).use(vuetify).mount('#app')
