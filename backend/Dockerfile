# Use an official Node.js runtime as a parent image
FROM node:18

# Set the working directory inside the container
WORKDIR /backend

# Copy the package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# # Rebuild native modules
# RUN npm rebuild bcrypt --build-from-source

# Copy the rest of the application code
COPY . .

# Expose the port the app runs on
EXPOSE 3030

# Start the application
CMD ["npm", "run", "start"]

