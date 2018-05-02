# Software como servicio para la gestión de tickets de soporte (client)

Aplicación multitenant.

Este software se vale principalmente de las siguientes tecnologías:

- Webpack
- React
- Redux
- GraphQL
- Apollo client
- Material UI

## Instalación

##### Pre-requisitos

- Apache o Nginx
- Node.js (Current or LTS)
- NPM

##### Instrucciones

- Configurar el archivo `dev/config.js`.
    - HOST: URL del servidor donde se aloja el frontend
    - SERVER_HOST: URL del sevidor donde se aloja el backend
- `npm install`
- `npm run dev`: Levanta servidor de desarrollo
- `npm run build`: Construye bundle para desplegar
