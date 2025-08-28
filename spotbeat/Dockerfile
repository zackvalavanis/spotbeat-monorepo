FROM node:20-alpine

WORKDIR /app

# Copy package files first
COPY package.json package-lock.json* ./

# Install dependencies
RUN npm install

# Copy the rest of the project
COPY . .

EXPOSE 5173

CMD ["npm", "run", "dev", "--", "--host"]
