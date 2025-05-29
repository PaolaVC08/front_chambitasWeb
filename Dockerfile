FROM node:20

WORKDIR /app

# Copia los archivos de package y instala dependencias
COPY package*.json ./
RUN npm ci

# Copia todo el código fuente
COPY . .

# Construye la app Angular en dist/frontend
RUN npm run build -- --output-path=dist/frontend

# Instala http-server globalmente
RUN npm install -g http-server

# Expone el puerto 8080 para Render o tu entorno
EXPOSE 8080

# Comando para servir la app con http-server en dist/frontend
CMD ["http-server", "dist/frontend", "-p", "8080"]
