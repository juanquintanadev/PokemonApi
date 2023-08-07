# Install dependencies only when needed
# creamos un nueva imagen limpia con el from
FROM node:18-alpine3.15 AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
# esto crea una imagen de los modulos de node
# y esto va a actualizar las dependencias una vez instalado y  vuelto a levantar
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile

# Build the app with cache dependencies
# va a copiar los modulos de node en el nuevo contenedor
FROM node:18-alpine3.15 AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
# copia todo lo q este en la raiz en el wrkdir
COPY . .
# buil de produccicon
RUN yarn build


# Production image, copy all the files and run next
# creamos una nueva imagen basado en esta version y lo llamo a correr
FROM node:18-alpine3.15 AS runner

# Set working directory
WORKDIR /usr/src/app

COPY package.json yarn.lock ./

# instalamos las dependencias de produccion
RUN yarn install --prod

# copiamos del builder la carpeta de distribucion
COPY --from=builder /app/dist ./dist

# # Copiar el directorio y su contenido
# RUN mkdir -p ./pokedex

# COPY --from=builder ./app/dist/ ./app
# COPY ./.env ./app/.env

# # Dar permiso para ejecutar la applicación
# RUN adduser --disabled-password pokeuser
# RUN chown -R pokeuser:pokeuser ./pokedex
# USER pokeuser

# EXPOSE 3000

# ejecutamos el comando de node
CMD [ "node","dist/main" ]