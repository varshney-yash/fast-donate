FROM node:16-alpine as build

WORKDIR /app

COPY ./frontend/package.json ./frontend/package-lock.json* /app/

RUN npm install

COPY ./frontend /app

RUN npm run build

FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]