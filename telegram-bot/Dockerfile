FROM node:20 AS build

WORKDIR /app

COPY package*.json ./

# Add certs
ADD ./certs/russian_trusted_root_ca_pem.crt /usr/local/share/ca-certificates/ca_root.crt
ADD ./certs/russian_trusted_sub_ca_pem.crt /usr/local/share/ca-certificates/ca_sub.crt
RUN apt-get install -y ca-certificates -y && update-ca-certificates

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

