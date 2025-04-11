FROM node:20-alpine AS base
WORKDIR /app

# Instalar pnpm
RUN npm install -g pnpm

# Por copiar solo el package.json y pnpm-lock.yaml aquí, nos aseguramos que los siguientes pasos `-deps` son independientes del código fuente.
# Por lo tanto, los pasos `-deps` se omitirán si solo cambia el código fuente.
COPY package.json ./
COPY pnpm-lock.yaml ./

FROM base AS prod-deps
RUN pnpm install --prod

FROM base AS build-deps
RUN pnpm install

FROM build-deps AS build
COPY . .
RUN pnpm run build

# Usar nginx para servir el sitio estático
FROM nginx:alpine

# Copiar la configuración personalizada de nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copiar los archivos de construcción desde la etapa anterior
COPY --from=build /app/dist /usr/share/nginx/html

# Exponer el puerto 80
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
