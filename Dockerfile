# Stage 1: Build
FROM node:18-alpine AS build

# Set working directory
WORKDIR /app

# Copy package files
COPY package.json pnpm-lock.yaml ./

# Install pnpm
RUN npm install -g pnpm

# Install dependencies
RUN pnpm install

# Copy application code
COPY . .

# Generate Prisma client
RUN npx prisma generate

# Build the application (e.g., for TypeScript or bundling)
RUN npm run build

# Stage 2: Runtime
FROM node:18-alpine AS runtime

# Set working directory
WORKDIR /app

# Copy dependencies from the build stage
COPY --from=build /app/node_modules ./node_modules

# Copy the built application and Prisma files
COPY --from=build /app/build ./build
COPY --from=build /app/prisma ./prisma

# Expose the application port
EXPOSE 3000

# Start the application
CMD ["pnpm", "start"]
