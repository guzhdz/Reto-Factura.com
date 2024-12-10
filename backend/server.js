//Anñadimos librerias necesarias y inicializar la app
require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();


//Indicamos que usaremos JSON
app.use(express.json());
app.use(cors());

//Escuchamos al puerto y redirijimos al html
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log('listening to requests on prt ', PORT);
});

//Metodo general
app.get('/', (req, res) => {
    res.send('Hello from factura.com backend!');
});

//Url Global
const globalUrl = "https://sandbox.factura.com/api";

//Headers
const headers = {
    'ContentType': 'application/json',
    'F-PLUGIN': process.env.F_PLUGIN,
    'F-Api-Key': process.env.F_APIKEY,
    'F-Secret-Key': process.env.F_SECRETKEY
}

//Get list of Facturas
app.get('/list-cfdis/:page/:num', async (req, res) => {
    const {page, num} = req.params;

    const body = {
        rfc: "",
        type_document: "factura",
        page: page,
        per_page: num
    }

    try {
        const response = await axios.post(`${globalUrl}/v4/cfdi/list`, body, {headers});
        console.log(response.data);
        res.status(200).send(response.data);
    } catch (error) {

        console.log("Error POST list-cfdis: ", error);
        res.status(500).send(error);
    }
});

//Buscar por UDI
app.get('/search-UID/:uid', async (req, res) => {
    const uid = req.params.uid;

    try {
        const response = await axios.get(`${globalUrl}/v4/cfdi/uid/${uid}`, {headers});
        res.status(200).send(response.data);
    } catch (error) {

        console.log("Error GET search-UID: ", error);
        res.status(500).send(error);
    }
});

//Enviar CFDI por correo
app.get('/send-CFDI/:uid', async (req, res) => {
    const uid = req.params.uid;

    try {
        const response = await axios.get(`${globalUrl}/v4/cfdi40/${uid}/email`, {headers});
        res.status(200).send(response.data);
    } catch (error) {

        console.log("Error GET send-UID: ", error);
        res.status(500).send(error);
    }
});

//Get Cliente
app.get('/client-info/:rfc', async (req, res) => {
    const rfc = req.params.rfc;

    try {
        const response = await axios.get(`${globalUrl}/v1/clients/${rfc}`, {headers});
        res.status(200).send(response.data);
    } catch (error) {

        console.log("Error GET cliente: ", error);
        res.status(500).send(error);
    }
});

//Cancelar Factura
app.post('/cancel-CFDI', async (req, res) => {
    const {uid, motivo, sustituto} = req.body;

    const body = {
        motivo: motivo,
        folioSustituto: sustituto
    }

    try {
        const response = await axios.post(`${globalUrl}/v4/cfdi40/${uid}/cancel`, body, {headers});
        res.status(200).send(response.data);
    } catch (error) {

        console.log("Error POST cancel factura: ", error);
        res.status(500).send(error);
    }
});

//Get Clientes
app.get('/listClients', async (req, res) => {

    try {
        const response = await axios.get(`${globalUrl}/v1/clients`, {headers});
        res.status(200).send(response.data);
    } catch (error) {

        console.log("Error GET lista clientes: ", error);
        res.status(500).send(error);
    }
});

//Get Uso CFDI Catalogo
app.get('/use-CFDI-catalog', async (req, res) => {

    try {
        const response = await axios.get(`${globalUrl}/v3/catalogo/UsoCfdi`, {headers});
        res.status(200).send(response.data);
    } catch (error) {

        console.log("Error GET uso CFDI catalogo: ", error);
        res.status(500).send(error);
    }
});

//Get Series
app.get('/series-catalog', async (req, res) => {

    try {
        const response = await axios.get(`${globalUrl}/v4/series`, {headers});
        res.status(200).send(response.data);
    } catch (error) {

        console.log("Error GET series catalogo: ", error);
        res.status(500).send(error);
    }
});

//Get Metodos de pago
app.get('/metodos-de-pago-catalog', async (req, res) => {

    try {
        const response = await axios.get(`${globalUrl}/v3/catalogo/MetodoPago`, {headers});
        res.status(200).send(response.data);
    } catch (error) {

        console.log("Error GET metodos de pago catalogo: ", error);
        res.status(500).send(error);
    }
});

//Get Formas de pago
app.get('/formas-de-pago-catalog', async (req, res) => {

    try {
        const response = await axios.get(`${globalUrl}/v3/catalogo/FormaPago`, {headers});
        res.status(200).send(response.data);
    } catch (error) {
        console.log("Error GET formas de pago catalogo: ", error);
        res.status(500).send(error);
    }
});

//Get Monedas
app.get('/monedas-catalog', async (req, res) => {

    try {
        const response = await axios.get(`${globalUrl}/v3/catalogo/Moneda`, {headers});
        res.status(200).send(response.data);
    } catch (error) {
        console.log("Error GET monedas catalogo: ", error);
        res.status(500).send(error);
    }
});

//Get Claves unidad
app.get('/claves-unidad-catalog', async (req, res) => {

    try {
        const response = await axios.get(`${globalUrl}/v3/catalogo/ClaveUnidad`, {headers});
        res.status(200).send(response.data);
    } catch (error) {
        console.log("Error GET claves unidad catalogo: ", error);
        res.status(500).send(error);
    }
});

//crear CFDI
app.post('/nuevo-CFDI', async (req, res) => {
    const body = req.body;

    try {
        const response = await axios.post(`${globalUrl}/v4/cfdi40/create`, body, {headers});
        res.status(200).send(response.data);
    } catch (error) {

        console.log("Error POST nuevo CFDI: ", error);
        res.status(500).send(error);
    }
});
