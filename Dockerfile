FROM node:14-alpine as build

WORKDIR /app

COPY package.json .
COPY package-lock.json .

RUN npm ci

COPY . .

ARG REACT_APP_AUTH0_DOMAIN
ARG REACT_APP_AUTH0_CLIENT_ID
ARG REACT_APP_AUTH0_AUDIENCE
ARG REACT_APP_AUTH0_NAMESPACE

RUN npm run build

FROM nginx:stable-alpine as release

COPY --from=build /app/build /usr/share/nginx/html
