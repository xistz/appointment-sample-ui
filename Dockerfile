FROM node:14-alpine as build

WORKDIR /app

COPY package.json .
COPY package-lock.json .

RUN npm ci

COPY . .

RUN npm run build

FROM nginx:stable-alpine as release

COPY --from=build /app/build /usr/share/nginx/html
