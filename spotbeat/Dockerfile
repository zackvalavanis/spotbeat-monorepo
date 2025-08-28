FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package.json and lock file
COPY package.json pnpm-lock.yaml ./

# Install pnpm and dependencies
RUN npm install -g pnpm
RUN pnpm install

# Copy all project files
COPY . .

# Expose port
EXPOSE 5173

# Run the dev server
CMD ["pnpm", "run", "dev"]
