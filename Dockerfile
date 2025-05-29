# Stage 1: Build Angular app
FROM node:20 AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build -- --output-path=dist/mycv

# Stage 2: Serve app with nginx
FROM nginx:stable-alpine
COPY --from=build /app/dist/mycv /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
