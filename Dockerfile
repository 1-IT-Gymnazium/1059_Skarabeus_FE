# Use Node.js to build the Angular app
FROM node:20 AS build
WORKDIR /app

# Copy package files and install dependencies
COPY ../Skarabeus_Ui/package*.json ./
RUN npm install

# Copy the entire Angular project from the parent directory
COPY ../Skarabeus_Ui ./
RUN npm run build --configuration=production

# Use Nginx to serve the Angular app
FROM nginx:alpine
COPY --from=build /Skarabeus_Ui/dist/Skarabeus_Ui /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
