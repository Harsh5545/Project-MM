# Use official Node.js image
FROM node:18

# Set working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json first (for efficient caching)
COPY package.json package-lock.json ./

# Install dependencies with --legacy-peer-deps to avoid conflicts
RUN npm i --legacy-peer-deps

# Check if prisma schema exists and run prisma generate if so
RUN if [ -f "prisma/schema.prisma" ]; then npx prisma generate; fi

# Copy the rest of the application files
COPY . .
RUN npx prisma generate
# Build the Next.js application
RUN npm run build

# Expose the default Next.js port
EXPOSE 3040

# Start the Next.js app
CMD ["npm", "run", "start"]
