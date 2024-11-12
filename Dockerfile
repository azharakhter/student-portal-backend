# # Use Node.js 16.14.2 as the base image
# FROM node:16.14.2

# # Set the working directory in the container
# WORKDIR /app

# # Copy package.json and package-lock.json
# COPY package*.json ./

# # Set NODE_ENV to development to ensure devDependencies are installed
# ENV NODE_ENV=development

# # Install all dependencies, including devDependencies
# RUN npm install

# # Copy the entire project to the working directory
# COPY . .

# # Run the build command to generate the 'dist' folder
# RUN npm run build

# # Expose the port the app runs on
# EXPOSE 3000

# # Command to run the app
# CMD ["npm", "start"]

# Use Node.js 16.14.2 as the base image
FROM node:16.14.2

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Set NODE_ENV to development to ensure devDependencies are installed
ENV NODE_ENV=development

# Install all dependencies, including devDependencies for testing
RUN npm install

# Copy the entire project to the working directory (including test files)
COPY . .

# Run the tests, stop the build if tests fail
RUN npm test && echo "Tests ran successfully"

# Run the build command to generate the 'dist' folder
RUN npm run build

# Expose the port the app runs on
EXPOSE 8080

# Command to run the app
CMD ["npm", "start"]
