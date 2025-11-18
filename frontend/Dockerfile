# frontend/Dockerfile
FROM nginx:stable-alpine
COPY . /usr/share/nginx/html
# nginx will serve index.html by default
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

