# Use an official node.js runtime as a parent image
FROM node:22-alpine

# Set the working directory in the container.
WORKDIR /app

# Copy the package.json and package-lock.json to the container
COPY package*.json .
#* is for all the package followed by names(package.json, package-lock.json)

# Install the Dependencies
RUN npm install

# Copy the rest of the application code
COPY src/ ./src/

# Expose the port that the app runs on 
EXPOSE 5003:5003

#Define the command to run your application
CMD [ "node", "./src/server.js" ]