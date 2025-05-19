# Chat Microservice

Este es un microservicio de chat en tiempo real construido con Node.js, Express, MongoDB y Socket.IO.

## Requisitos previos

Antes de comenzar, asegúrate de tener instalados los siguientes programas:

- [Node.js](https://nodejs.org/) (versión 16 o superior)
- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

## Configuración del proyecto

1. Clona este repositorio:

   ```bash
   git clone url
   cd chat-microservice

2.Crea un archivo .env en la raíz del proyecto con las siguientes variables de entorno:

   ```bash
   MONGO_URI=mongodb://db:27017/nest-chat
   JWT_SECRET=tu_secreto_jwt_aqui
   PORT=5000
   CLIENT_URL=http://localhost:3000

3.Instala las dependencias del proyecto:

   ```bash
   npm install


## Configuración del proyecto

1.Construye y levanta los contenedores con Docker Compose:

   ```bash
   docker-compose up --build

2.Accede a la aplicación en tu navegador en http://localhost:5000 e inicia el servidor:
 
   ```bash
   npm run dev