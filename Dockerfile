# Use official Node.js LTS image
FROM node:20

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all backend files
COPY . .

# Expose port your backend runs on
EXPOSE 8000

# Command to run the backend
CMD ["npm", "run", "dev"]
