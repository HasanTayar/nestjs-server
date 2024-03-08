# Development stage
FROM node:alpine As development

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and pnpm-lock.yaml to the working directory
COPY package.json ./
COPY pnpm-lock.yaml ./
COPY tsconfig.json tsconfig.json
COPY nest-cli.json nest-cli.json

# Install pnpm globally
RUN npm install -g pnpm

# Copy the 'apps/payments' and 'libs' directories to the working directory
COPY apps/payments apps/payments
COPY libs libs

# Install dependencies using pnpm
RUN pnpm install -r

# Build the application
RUN pnpm run build payments

# Production stage
FROM node:alpine as production

# Set the NODE_ENV environment variable to 'production'
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and pnpm-lock.yaml to the working directory
COPY package.json ./
COPY pnpm-lock.yaml ./

# Install pnpm globally
RUN npm install -g pnpm

# Install production dependencies using pnpm
RUN pnpm install --prod

# Copy the built application from the development stage to the production stage
COPY --from=development /usr/src/app/dist ./dist

# Specify the command to run the application
CMD [ "node", "dist/apps/notifications/main" ]
