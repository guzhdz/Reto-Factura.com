# Backend
El backend fue programado en node.js. Para ejecutarlo hay que seguir los siguientes pasos:
- Descarga del proyecto la carpeta llamada backend
- Navega a la ubicacion del archico en la linea de comandos
- Ejecuta el comando npm install (Hay que tener instalada la ultima version de node.js)
- Ejecuta el comando npm start
- Ahora deberia estar escuchando peticiones del link: http://localhost:4000

Nota: Hay que tomar en cuanta que todo esto es en local, si se realiza un despliegue, se harian peticiones a la url que proporcione el servidor.

## Peticiones
A continuacion presentaremos la serie de peticiones que se pueden realizar a este backend.

### Listar Facturas:
Metodo: GET

HOST: http://localhost:4000

Endpoint: /list-cfdis/page/num

Params:
- page: Indica número de página a consultar, por default posiciona en la página 1.
- num: Indica el limite de resultados para mostrar, por default retorna 100 registros.

### Buscar por UID:
Metodo: GET

HOST: http://localhost:4000

Endpoint: /search-UID/uid

Params:
- uid: Es el identificador interno para la plataforma de Factura.com asignado al CFDI cuando lo creamos.

### Enviar CFDI por email:
Metodo: GET

HOST: http://localhost:4000

Endpoint: /send-CFDI/uid

Params:
- uid: Es el identificador interno para la plataforma de Factura.com asignado al CFDI cuando lo creamos.

### Consultar un cliente:
Metodo: GET

HOST: http://localhost:4000

Endpoint: /client-info/rfc

Params:
- rfc: Indica el RFC del cliente a buscar.

### Cancelar Factura:
Metodo: POST

HOST: http://localhost:4000

Endpoint: /cancel-CFDI

Body:
- uid: Indica el UID o UUID del CFDI que deseas cancelar.
- motivo: Indica motivo por el cual es solicitada la cancelación del CFDI.
- sustituto: Indica el UID o UUID del CFDI que reemplazara el CFDI cancelado.

### Listar clientes:
Metodo: GET

HOST: http://localhost:4000

Endpoint: /listClients

### Listar uso CFDI:
Metodo: GET

HOST: http://localhost:4000

Endpoint: /use-CFDI-catalog

### Listar series:
Metodo: GET

HOST: http://localhost:4000

Endpoint: /series-catalog

### Listar metodos de pago:
Metodo: GET

HOST: http://localhost:4000

Endpoint: /metodos-de-pago-catalog

### Listar formas de pago:
Metodo: GET

HOST: http://localhost:4000

Endpoint: /formas-de-pago-catalog

### Listar monedas:
Metodo: GET

HOST: http://localhost:4000

Endpoint: /monedas-catalog

### Listar claves unidad:
Metodo: GET

HOST: http://localhost:4000

Endpoint: /claves-unidad-catalog


### Listar crear CFDI:
Metodo: POST

HOST: http://localhost:4000

Endpoint: /nuevo-CFDI

Body:
- Se envian todos los datos obligatorios que pide la API de factura.com para crear un nuevo CFDI

