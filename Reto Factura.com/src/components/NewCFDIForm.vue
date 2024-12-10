<script setup>
    //Imports
    import CategoryForm from './CategoryForm.vue';
    import axios from 'axios';
    import { ref, onMounted } from 'vue'

    //Emits
    let emit = defineEmits(['crear', 'success', 'error']);
	
    //State
    let form = ref(null);
    let formData = ref({
        TipoDocumento: "factura",
        FechaFromAPI: null,
        Receptor: null,
        UsoCFDI: null,
        Serie: null,
        MetodoPago: null,
        FormaPago: null,
        NumOrder: null,
        Moneda: "MXN",
        TipoCambio: "0",
        Conceptos: []
    });

    let conceptoData = ref({
        Descripcion: null,
        Cantidad: 1,
        ClaveUnidad: null,
        Unidad: null,
        ValorUnitario: null,
        Impuestos: {
            Traslados: []
        },
        ClaveProdServ: null
    });

    let catalogos = ref({
        tipoDocumentoCatalogo: [
            {
                key: "factura",
                tipo: "Factura"
            },
            {
                key: "factura_hotel",
                tipo: "Factura para hoteles"
            },
            {
                key: "honorarios",
                tipo: "Recibo de honorarios"
            },
            {
                key: "nota_cargo",
                tipo: "Nota de cargo"
            },
            {
                key: "donativos",
                tipo: "Donativo"
            },
            {
                key: "arrendamiento",
                tipo: "Recibo de arrendamiento"
            },
            {
                key: "nota_credito",
                tipo: "Nota de crédito"
            },
            {
                key: "nota_debito",
                tipo: "Nota de débito"
            },
            {
                key: "nota_devolucion",
                tipo: "Nota de devolución"
            },
            {
                key: "carta_porte",
                tipo: "Carta porte"
            },
            {
                key: "carta_porte_ingreso",
                tipo: "Carta porte de Ingreso"
            },
            {
                key: "pago",
                tipo: "Pago"
            },
            {
                key: "retencion",
                tipo: "Retención"
            },
        ],
        fechaCFDICatalogo: [
            {
                key: 1,
                name: "Fecha de hoy"
            },
            {
                key: 2,
                name: "Fecha de ayer"
            },
            {
                key: 3,
                name: "Fecha de hace dos días"
            },
            {
                key: 4,
                name: "Fecha de hace tres días"
            }
        ],
        clientesCatalogo: [],
        usoCFDICatalogo: [],
        seriesCatalogo: [],
        metodosPagoCatalogo: [],
        formasPagoCatalogo: [],
        monedasPagoCatalogo: [],
        clavesUnidadCatalogo: []
    });

    let rules = ref({
        tipoDocumentoRules: [
            value => getRule(0, value, 'un tipo documento')
        ],
        fechaCFDIRules: [
            value => getRule(0, value, 'una fecha de timbrado')
        ],
        clienteRules: [
            value => getRule(0, value, 'un cliente')
        ],
        usoCFDIRules: [
            value => getRule(0, value, 'un uso de CFDI')
        ],
        serieRules: [   
            value => getRule(0, value, 'un ID de serie')
        ],
        metodosPagoRules: [
            value => getRule(0, value, 'un metodo de pago')
        ],
        formaPagoRules: [
            value => getRule(0, value, 'una forma de pago')
        ],
        monedaRules: [
            value => getRule(0, value, 'una Moneda')
        ],
        tipoCambioRules: [
            value => getRule(1, value, 'un tipo de cambio'),
            value => getRule(2, value, null)
        ]
    });

    //Metodos
    const getClientes = async() => {
        const response = await axios.get(`https://reto-factura-com.onrender.com/listClients`);
        if(response.data.status == "success") {
            catalogos.value.clientesCatalogo = response.data.data.map(cliente => {
                return {
                    key: {
                        ResidencialFiscal: cliente.ResidencialFiscal || null,
                        UID: cliente.UID
                    },
                    name: `${cliente.RFC} - ${cliente.RazonSocial}`
                }
            });
        }
    }

    const getRule = (type, value, name) => {
        switch(type) {
            case 0:
                if(value) 
                    return true
                else
                    return `Escoge ${name}`

            case 1:
                if(value) 
                    return true
                else
                    return `Ingresa ${name}`

            case 2:
                if(!/[^\d.]/g.test(value))
                    return true
                else
                    return `Solo permiten digitos`
            
            default:
                break;
        }
    }

    const getUsoCFDI = async() => {
        const response = await axios.get(`https://reto-factura-com.onrender.com/use-CFDI-catalog`);
        if(response.data.response == "success") {
            catalogos.value.usoCFDICatalogo = response.data.data.map(uso => {
                return {
                    key: uso.key,
                    name: uso.name
                }
            });
        }
    }

    const getSeries = async() => {
        const response = await axios.get(`https://reto-factura-com.onrender.com/series-catalog`);
        if(response.data.status == "success") {
            catalogos.value.seriesCatalogo = response.data.data.map(serie => {
                return {
                    key: serie.SerieID,
                    name: serie.SerieName,
                    type: serie.SerieType
                }
            });
        }
    }

    const getMetodosPago = async() => {
        const response = await axios.get(`https://reto-factura-com.onrender.com/metodos-de-pago-catalog`);
        if(response.data.response == "success") {
            catalogos.value.metodosPagoCatalogo = response.data.data.map(metodo => {
                return {
                    key: metodo.key,
                    name: metodo.name,
                }
            });
        }
    }

    const getFormasPago = async() => {
        const response = await axios.get(`https://reto-factura-com.onrender.com/formas-de-pago-catalog`);
        if(response.data.response == "success") {
            catalogos.value.formasPagoCatalogo = response.data.data.map(forma => {
                return {
                    key: forma.key,
                    name: forma.name
                }
            });
        }
    }

    const getMonedas = async() => {
        const response = await axios.get(`https://reto-factura-com.onrender.com/monedas-catalog`);
        if(response.data.response == "success") {
            catalogos.value.monedasPagoCatalogo = response.data.data.map(moneda => {
                return {
                    key: moneda.key,
                    name: `${moneda.key} - ${moneda.name}`
                }
            });
        }
    }

    const getClavesUnidad = async() => {
        const response = await axios.get(`https://reto-factura-com.onrender.com/claves-unidad-catalog`);
        if(response.data.response == "success") {
            catalogos.value.clavesUnidadCatalogo = response.data.data.map(clave => {
                return {
                    key: clave.key,
                    name: `${clave.key} - ${clave.name}`,
                    name2: clave.name
                }
            });
        }
    }

    const crearCFDI = async(factura) => {
        const body = factura;

        const response = await axios.post(`https://reto-factura-com.onrender.com/nuevo-CFDI`, body);
        if(response.data.response == "success") {
            return {status: true, message: response.data.message};
        } else if(response.data.response == "error") {
            if(response.data.message.message)
                return {status: false, message: response.data.message.message};
            else {
                return {status: false, message: response.data.message}
            }
            
        }
    }

    const dateFormat = (date, num) => {

        switch (num) {
            case 2:
                date.setDate(date.getDate() - 1);
                break;

            case 3:
                date.setDate(date.getDate() - 2);
                break;

            case 4:
                date.setDate(date.getDate() - 3);
                break;
        
            default:
                break;
        }
        const year = date.getFullYear();
        const month = twoDigits(date.getMonth() + 1);
        const day = twoDigits(date.getDate());
        const hours = twoDigits(date.getHours());
        const minutes = twoDigits(date.getMinutes());
        const seconds = twoDigits(date.getSeconds());

        return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
    }

    const twoDigits = (num) => {
        return num < 10 ? '0' + num : num;
    }

    const submit = async () => {
        if(await validateForm()) {
            let factura = formData.value;

            let facturaCopia = JSON.parse(JSON.stringify(factura));

            facturaCopia.FechaFromAPI = dateFormat(new Date(), factura.FechaFromAPI);

            if(facturaCopia.Moneda == "MXN") {
                facturaCopia.TipoCambio = null;
            }

            emit('crear');
            let {status, message} = await crearCFDI(facturaCopia);
            if(status) {
                emit('success', message);
                formData.value = {
                    TipoDocumento: "factura",
                    FechaFromAPI: null,
                    Receptor: null,
                    UsoCFDI: null,
                    Serie: null,
                    MetodoPago: null,
                    FormaPago: null,
                    NumOrder: null,
                    Moneda: "MXN",
                    TipoCambio: "0",
                    Conceptos: []
                }
            }
            else 
                emit('error', message);

        }
    }

    const submitConcepto = () => {
        if(validateComceptoForm()) {
            let conceptoOriginal = conceptoData.value;
            let concepto = JSON.parse(JSON.stringify(conceptoOriginal));

            concepto.Cantidad = parseInt(concepto.Cantidad);
            concepto.ValorUnitario = parseFloat(concepto.ValorUnitario);

            let index = catalogos.value.clavesUnidadCatalogo.findIndex(
                claveUnidad => claveUnidad.key == concepto.ClaveUnidad
            );
            concepto.Unidad = catalogos.value.clavesUnidadCatalogo[index].name2;

            let traslado = {
                Base: concepto.ValorUnitario,
                Impuesto: "002",
                TipoFactor: "Tasa",
                TasaOCuota: "0.16",
                Importe: concepto.ValorUnitario * .16
            }
            concepto.Impuestos.Traslados.push(traslado);

            formData.value.Conceptos.push(concepto);

            conceptoData.value = {
                Descripcion: null,
                Cantidad: 1,
                ClaveUnidad: null,
                Unidad: null,
                ValorUnitario: null,
                Impuestos: {
                    Traslados: []
                },
                ClaveProdServ: null
            }
        } else {
            emit('error', "Complete todos los campos requeridos* del concepto de manera correcta")
        }
    }

    const validateForm = async () => {
        let { valid } = await form.value.validate();
        if(valid) {
            if(formData.value.Conceptos.length != 0) {
                return true;
            } else {
                emit('error', "Debe al menos haber un concepto en la lista");
                return false;
            }
        } else {
            emit('error', "Complete todos los campos requeridos* de manera correcta");
            return valid;
        }
        
    }

    const validateComceptoForm = () => {
        let concepto = conceptoData.value;
        if(concepto.Descripcion && concepto.Cantidad > 0 && 
        concepto.ClaveUnidad && concepto.ValorUnitario && 
        concepto.ClaveProdServ && (!/[^\d.]/g.test(concepto.ValorUnitario)))
            return true;
        else
            return false;
    }

    const removeConcepto = (index) => {
        formData.value.Conceptos.splice(index, 1);
    }

    onMounted(() => {
        getClientes();
        getUsoCFDI();
        getSeries();
        getMetodosPago();
        getFormasPago();
        getMonedas();
        getClavesUnidad();
    })
</script>

<template>
    <v-form ref="form">
        <CategoryForm :icon="'mdi-text-box'" :subtitle="'Informacion General'"/>

        <v-container>
            <v-row>
                <v-col>
                    <v-autocomplete 
                        label="Tipo de CFDI*" 
                        :items="catalogos.tipoDocumentoCatalogo" 
                        item-title="tipo"
                        item-value="key"
                        density="compact" 
                        v-model="formData.TipoDocumento"
                        variant="outlined"
                        color="#FF6C0A"
                        :rules="rules.tipoDocumentoRules"
                        required
                    ></v-autocomplete>
                </v-col>

                <v-col>
                    <v-autocomplete
                        label="Fecha de CFDI*" 
                        :items="catalogos.fechaCFDICatalogo" 
                        item-title="name"
                        item-value="key"
                        density="compact" 
                        v-model="formData.FechaFromAPI"
                        variant="outlined"
                        color="#FF6C0A"
                        :rules="rules.fechaCFDIRules"
                        required
                        clearable
                    ></v-autocomplete>
                </v-col>
            </v-row>

            <v-row>
                <v-col>
                    <v-autocomplete 
                        label="Cliente*" 
                        :items="catalogos.clientesCatalogo" 
                        item-title="name"
                        item-value="key"
                        density="compact" 
                        v-model="formData.Receptor"
                        variant="outlined"
                        color="#FF6C0A"
                        :rules="rules.clienteRules"
                        required
                        clearable
                    ></v-autocomplete>
                </v-col>

                <v-col>
                    <v-autocomplete
                        label="Uso CFDI*" 
                        :items="catalogos.usoCFDICatalogo" 
                        item-title="name"
                        item-value="key"
                        density="compact" 
                        v-model="formData.UsoCFDI"
                        variant="outlined"
                        color="#FF6C0A"
                        :rules="rules.usoCFDIRules"
                        required
                        clearable
                    ></v-autocomplete>
                </v-col>
            </v-row>

            <v-row>
                <v-col>
                    <v-autocomplete 
                        label="Serie*" 
                        :items="catalogos.seriesCatalogo.filter(serie => serie.type == formData.TipoDocumento)" 
                        item-title="name"
                        item-value="key"
                        density="compact" 
                        v-model="formData.Serie"
                        variant="outlined"
                        color="#FF6C0A"
                        :rules="rules.serieRules"
                        required
                        clearable
                    ></v-autocomplete>
                </v-col>

                <v-col>
                    <v-autocomplete 
                        label="Método de pago*" 
                        :items="catalogos.metodosPagoCatalogo" 
                        item-title="name"
                        item-value="key"
                        density="compact" 
                        v-model="formData.MetodoPago"
                        variant="outlined"
                        color="#FF6C0A"
                        :rules="rules.metodosPagoRules"
                        required
                        clearable
                    ></v-autocomplete>
                </v-col>
            </v-row>

            <v-row>
                <v-col>
                    <v-autocomplete 
                        label="Forma de pago*" 
                        :items="catalogos.formasPagoCatalogo" 
                        item-title="name"
                        item-value="key"
                        density="compact" 
                        v-model="formData.FormaPago"
                        variant="outlined"
                        color="#FF6C0A"
                        :rules="rules.formaPagoRules"
                        required
                        clearable
                    ></v-autocomplete>
                </v-col>

                <v-col>
                    <v-text-field 
                        clearable 
                        label="N. de orden/pedido" 
                        variant="outlined"
                        density="compact"
                        color="#FF6C0A"
                        v-model="formData.NumOrder"
                    ></v-text-field>
                </v-col>
            </v-row>

            <v-row class="mb-5">
                <v-col>
                    <v-autocomplete
                        label="Moneda*" 
                        :items="catalogos.monedasPagoCatalogo" 
                        item-title="name"
                        item-value="key"
                        density="compact" 
                        v-model="formData.Moneda"
                        variant="outlined"
                        color="#FF6C0A"
                        :rules="rules.monedaRules"
                        required
                    ></v-autocomplete>
                </v-col>

                <v-col>
                    <v-text-field v-if="formData.Moneda != 'MXN'"
                        label="Tipo de cambio*" 
                        variant="outlined"
                        density="compact"
                        color="#FF6C0A"
                        v-model="formData.TipoCambio"
                        :rules="rules.tipoCambioRules"
                        required
                    ></v-text-field>
                </v-col>
            </v-row>
        </v-container>
        
        <CategoryForm :icon="'mdi-text-box-plus'" :subtitle="'Conceptos'"/>

        <v-container>
            <v-row>
                <v-col>
                    <v-textarea
                        label="Descripción*" 
                        variant="outlined"
                        density="compact"
                        color="#FF6C0A"
                        auto-grow
                        v-model="conceptoData.Descripcion"
                        clearable
                        rows="1"
                    ></v-textarea>
                </v-col>
            </v-row>

            <v-row>
                <v-col>
                    <v-text-field
                        label="Cantidad*" 
                        variant="outlined"
                        density="compact"
                        color="#FF6C0A"
                        v-model="conceptoData.Cantidad"
                        type="number"
                        :min="1"
                    ></v-text-field>
                </v-col>

                <v-col>
                    <v-autocomplete 
                        label="Unidad*" 
                        :items="catalogos.clavesUnidadCatalogo" 
                        item-title="name"
                        item-value="key"
                        density="compact" 
                        v-model="conceptoData.ClaveUnidad"
                        variant="outlined"
                        color="#FF6C0A"
                        clearable
                    ></v-autocomplete>
                </v-col>

                <v-col>
                    <v-text-field
                        label="Precio unitario*"  
                        variant="outlined"
                        density="compact"
                        color="#FF6C0A"
                        v-model="conceptoData.ValorUnitario"
                        hint="Solo debe ingresar digitos"
                    ></v-text-field>
                </v-col>

                <v-col>
                    <v-text-field
                        label="Importe"  
                        variant="outlined"
                        density="compact"
                        color="#FF6C0A"
                        readonly
                        :model-value="conceptoData.ValorUnitario && conceptoData.Cantidad && !/[^\d.]/g.test(conceptoData.ValorUnitario) ? `${conceptoData.ValorUnitario * conceptoData.Cantidad}` : '0'"
                    ></v-text-field>
                </v-col>
            </v-row>

            <v-row>
                <v-col>
                    <v-text-field
                        label="Impuestos" 
                        variant="outlined"
                        density="compact"
                        color="#FF6C0A"
                        readonly
                        model-value="16%"
                    ></v-text-field>
                </v-col>

                <v-col>
                    <v-text-field
                        label="Clave SAT*" 
                        variant="outlined"
                        density="compact"
                        color="#FF6C0A"
                        v-model="conceptoData.ClaveProdServ"
                    ></v-text-field>
                </v-col>
            </v-row>

            <v-row>
                <v-col class="d-flex">
                    <v-btn class="text-none ml-auto" color="#FF6C0A" @click="submitConcepto">Agregar concepto</v-btn>
                </v-col>
            </v-row>
            
        </v-container>

        <CategoryForm :icon="'mdi-list-box'" :subtitle="'Conceptos Agregados'"/>

        <article>
            <v-table>
                <thead>
                    <tr>
                        <th class="text-left">#</th>
                        <th class="text-left">Cantidad</th>
                        <th class="text-left">Unidad</th>
                        <th class="text-left">Concepto</th>
                        <th class="text-left">Precio unitario</th>
                        <th class="text-left">Subtotal</th>
                        <th></th>
                    </tr>
                </thead>

                <tbody>
                    <tr v-for="(concepto, id) in formData.Conceptos" :key="id">
                        <td class="text-left">{{id + 1}}</td>
                        <td class="text-left">{{concepto.Cantidad}}</td>
                        <td class="text-left">{{concepto.Unidad}}</td>
                        <td class="text-left">{{concepto.Descripcion}}</td>
                        <td class="text-left">{{concepto.ValorUnitario}}</td>
                        <td class="text-left">{{concepto.Cantidad * concepto.ValorUnitario}}</td>
                        <td><v-btn 
                                icon="mdi-delete" 
                                size="small" 
                                variant="text" 
                                color="red" 
                                @click="removeConcepto(id)"
                            ></v-btn>
                        </td>
                    </tr>
                </tbody>
            </v-table>

            <div class="sin-resultados d-flex mx-auto mt-10" v-if="formData.Conceptos.length == 0">
                <v-icon icon="mdi-database-off" color="var(--secondary-dark)"></v-icon>
                <span>No se encontraron conceptos</span>
            </div>
        </article>


        <v-container class="d-flex">
            <v-btn class="ml-auto text-none" color="#FF6C0A" @click="submit">Generar CFDI</v-btn>
        </v-container>
    </v-form>
</template>

<style scope>
    .form-subtitle-container {
        padding: 4px 0 !important;
        border-color: var(--secondary) !important;
    }

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