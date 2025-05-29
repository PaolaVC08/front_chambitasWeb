FROM node:20

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

RUN npm run build -- --output-path=dist/frontend

RUN npm install -g http-server

EXPOSE 8080

CMD ["http-server", "dist/frontend", "-p", "8080", "-c-1", "--fallback", "index.html"]
