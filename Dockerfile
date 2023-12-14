FROM node:14.5.0-alpine
WORKDIR /home/node
COPY . .
RUN yarn
RUN yarn build --no-force-exit

 

FROM nginx:1.16.0-alpine
COPY --from=0 /home/node/dist /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d
EXPOSE 443
CMD ["nginx", "-g", "daemon off;"]
