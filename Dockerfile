FROM nginx:1.21.5-alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf

WORKDIR /usr/share/nginx/html

RUN rm -rf *

COPY _site .

ENTRYPOINT ["nginx", "-g", "daemon off;"]