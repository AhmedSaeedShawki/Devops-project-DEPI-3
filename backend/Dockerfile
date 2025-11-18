# backend/Dockerfile
FROM node:18-alpine

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./
RUN npm install --production

# Copy app source
COPY . .

# Expose port
ENV PORT=5000
EXPOSE 5000

# Start the app
CMD ["npm", "start"]

