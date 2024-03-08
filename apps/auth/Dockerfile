# Development stage
FROM node:alpine As development

WORKDIR /usr/src/app

# Copy package.json and pnpm-lock.yaml to the working directory
COPY package.json ./
COPY pnpm-lock.yaml ./
COPY tsconfig.json tsconfig.json
COPY nest-cli.json nest-cli.json

RUN npm install -g pnpm

# Copy the apps/auth and libs directories
COPY apps/auth apps/auth
COPY libs libs

# Install dependencies and build the project
RUN pnpm install -r
RUN pnpm run build auth

# Production stage
FROM node:alpine as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

# Copy package.json and pnpm-lock.yaml files
COPY package.json ./
COPY pnpm-lock.yaml ./

RUN npm install -g pnpm

# Install production dependencies
RUN pnpm install --prod

# Copy the built files from the development stage
COPY --from=development /usr/src/app/dist ./dist

# Set the command to run the application
CMD [ "node", "dist/apps/auth/main" ]
