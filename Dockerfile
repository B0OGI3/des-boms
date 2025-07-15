# Use a stable Node.js version
FROM node:20-alpine

# Create app directory
WORKDIR /app

# Copy only necessary files first to leverage Docker caching
COPY package.json pnpm-lock.yaml ./

# Install pnpm globally and install dependencies
RUN npm i -g pnpm && pnpm install --frozen-lockfile

# Copy the rest of your app files
COPY . .

# Ensure .env.production is available if needed at build time
# COPY .env.production .env.production

# Build the Next.js app
RUN pnpm build

# Expose the port Next.js runs on
EXPOSE 3000

# Start the app in production mode
CMD ["pnpm", "start"]
