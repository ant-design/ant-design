FROM node:12 as builder

# install and cache app dependencies
ENV NODE_OPTIONS="--max_old_space_size=4096"
COPY package.json package-lock.json ./
RUN npm install && mkdir /react-frontend && mv ./node_modules ./react-frontend

WORKDIR /react-frontend

COPY . .

RUN npm run dist
RUN npm run compile