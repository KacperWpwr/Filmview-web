
FROM node:14.8.0-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm install
# Have a .dockerignore file ignoring node_modules and build
COPY . ./
RUN npm run build
FROM nginx:stable-alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx/nginx.conf /etc/nginx/nginx.conf
CMD ["nginx", "-g", "daemon off;"]








