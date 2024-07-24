# Frontend
El backend fue programado en vue.js con el framework de vuetify incluido. Para ejecutarlo hay que seguir los siguientes pasos:
- Descarga del proyecto la carpeta llamada Reto Factura.com
- Navega a la ubicacion del archivo en la linea de comandos
- Ejecuta el comando npm install (Hay que tener instalada la ultima version de node.js)
- Ejecuta el comando npm run dev
- Ahora deberia indicarle un link al cual ingresar donde vera ejecutada la pagina
- Nota: Asegurarse de estar ejecutando antes el backend ya que de ahi se hacen peticiones para obteenr los datos y realziar operaciones.

Nota: Hay que tomar en cuanta que todo esto es en local, si se realiza un despliegue, se deberia cambair parte del codigo para las peticiones al backend,
ya que son hechas directamente al URL http://localhost:4000 que es elq ue se crea al ejecutar el backend localmente.

## Listar facturas
![image](https://github.com/user-attachments/assets/e6e50e63-39e1-4a10-ba34-85b589bf468c)

Aqui podemos ver el listado de facturas y pdoer intercatuar con ellas

##Crar CFDI
![image](https://github.com/user-attachments/assets/045aa719-0891-4974-98e3-d497c25b5e8e)

![image](https://github.com/user-attachments/assets/9f0d0813-e69d-4865-a5f3-d4fb0361af96)

Y aqui podemos ver el formualrio a llenar y validar para poder ingresar una nueva factura CFDI

# Reto Factura.com

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

