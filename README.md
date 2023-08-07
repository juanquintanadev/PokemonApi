<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

# Ejecutar en desarrollo

1. Clonar el repositorio

2. Ejecutar
````
yarn install
````

3.Tener nest cli instalado
````
npm i -g @nestjs/cli
````

4. Levantar la base de datos
````
docker-compose up -d
`````

5. Clonar el archvivo __.env.template__ y renombrar la copia a __.env__

6. Llenar las variables de entorno definidas en __.env__

7. Ejecutar la aplicacion de desarrollo 
```
yarn sart:dev
```

8.Reconstruir la base de datos con la semilla
````
http://localhost:3000/api/v2/seed
````

## Stack usado
* MongoDB
* NestJS

# Production Build

1. Crear el archivo ```.env.prod```
2. Llenar las variables de entorno de production.
3. Construir la imagen de la base de datos.

``````
docker compose -f docker-compose.prod.yaml --env-file .env.prod up --build
```````



