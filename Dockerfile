# Use a stable Node.js version
FROM node:20-alpine

# Install necessary packages for native binaries
RUN apk add --no-cache libc6-compat

# Create app directory
WORKDIR /app

# Copy package files
COPY package.json pnpm-lock.yaml ./

# Copy Prisma schema first (needed for postinstall)
COPY prisma ./prisma/

# Install pnpm globally and install dependencies
RUN npm i -g pnpm && pnpm install --frozen-lockfile

# Copy the rest of your app files
COPY . .

# Build the Next.js app
RUN pnpm build

# Copy and make entrypoint script executable
COPY docker-entrypoint.sh ./
RUN chmod +x docker-entrypoint.sh

# Expose the port Next.js runs on
EXPOSE 3000

# Use custom entrypoint
ENTRYPOINT ["./docker-entrypoint.sh"]
