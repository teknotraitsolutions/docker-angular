## STAGE 1: Build ###
FROM node:15.11.0-alpine3.13 AS build
WORKDIR /app
COPY package.json ./
##RUN rm -rf package-lock.json
RUN npm install --legacy-peer-deps
COPY . .
RUN npm run build 

### STAGE 2: Run ###
FROM nginx:1.18.0-alpine
## Remove default nginx website
RUN rm -rf /usr/share/nginx/html/*

## Copy our default nginx config
COPY setup/default.conf /etc/nginx/conf.d/default.conf

## From 'build' stage copy over the artifacts in dist folder to default nginx public folder
COPY --from=build /app/dist/Frontend /usr/share/nginx/html

# CMD ["nginx", "-g", "daemon off;"] 
# When the container starts, replace the env.js with values from environment variables
CMD ["/bin/sh",  "-c",  "envsubst < /usr/share/nginx/html/assets/env.template.js > /usr/share/nginx/html/assets/env.js && exec nginx -g 'daemon off;'"]