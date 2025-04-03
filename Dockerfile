# Build stage
FROM node:18-alpine as build

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Build the app
RUN npm run build

# Production stage
FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install production dependencies only
RUN npm install --production

# Copy built assets and server file from build stage
COPY --from=build /app/dist ./dist
COPY --from=build /app/server.js ./

# Expose port
EXPOSE 3000

# Start the server with proper signal handling
CMD ["node", "server.js"] 