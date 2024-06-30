FROM node:19 AS build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

# RUN npm run build

EXPOSE 3000

# FROM nginx:alpine
#
# COPY --from=build /app/dist /usr/share/nginx/html
# COPY nginx.conf /etc/nginx/conf.d/default.conf
#
# CMD ["nginx", "-g", "daemon off;"]

CMD ["sh", "-c", "yarn start:dev"]

