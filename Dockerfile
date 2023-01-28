FROM nginx:stable-alpine
COPY build /usr/share/nginx/html
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf
COPY nginx/cert.crt /etc/nginx/cert.crt
COPY nginx/private.key /etc/nginx/private.key
CMD ["nginx", "-g", "daemon off;"]
