FROM node:20 AS build

WORKDIR /app

COPY package*.json ./

# Install Yarn
RUN npm install -g --force yarn

# Install dependencies using Yarn
RUN yarn install

COPY . .

# RUN npm run build

EXPOSE 4000

# FROM nginx:alpine
#
# COPY --from=build /app/dist /usr/share/nginx/html
# COPY nginx.conf /etc/nginx/conf.d/default.conf
#
# CMD ["nginx", "-g", "daemon off;"]

CMD ["sh", "-c", "yarn start"]

