# Use an official Node.js runtime as a parent image
FROM node:18

# Set the working directory inside the container
WORKDIR /frontend

# Copy the package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the application for production
RUN npm run build

# Install a lightweight web server to serve the static files
RUN npm install -g serve

# Expose the port the app will run on
EXPOSE 3000

# Start the web server to serve the built files
CMD ["serve", "-s", "dist"]
