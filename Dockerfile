# Base image with Node.js
FROM node:18-alpine

COPY . .
WORKDIR /Frontend

# install dependencies
RUN npm install

# Expose the port the application runs on
EXPOSE 3000

# Run the startup script to start the application
CMD ["npm","start"]

