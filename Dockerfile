# Build stage
FROM node:18-alpine as build

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code and public assets
COPY . .

# Make sure the public directory and its contents are properly accessible
RUN mkdir -p /app/public/img
RUN cp -r /app/public/assets/img/* /app/public/img/ || true

# Set default environment variables with fallback values
ENV VITE_ADMIN_EMAIL=${VITE_ADMIN_EMAIL}
ENV VITE_ADMIN_PASSWORD=${VITE_ADMIN_PASSWORD}

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