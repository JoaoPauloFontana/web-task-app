# Use official Node.js image as base
FROM node:18-alpine AS build

RUN if [ ! -x "$(command -v yarnpkg)" ]; then \
      npm install -g yarn; \
    fi

ENV PATH /app/node_modules/.bin:$PATH

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install

COPY . .

RUN yarn build

FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
