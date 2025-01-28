FROM node as builder

WORKDIR /app/
COPY . .

RUN ["npm", "i"]
RUN ["npm", "run", "build"]

FROM nginx:alpine

RUN rm -rf /usr/share/nginx/html/*

COPY ./nginx.conf /etc/nginx
COPY --from=builder ./app/dist /usr/share/nginx/html

ENTRYPOINT ["nginx", "-g", "daemon off;"]
