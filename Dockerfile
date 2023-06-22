FROM node:16.17.0 as build
# Create and change to the app directory.
WORKDIR /usr/src/app
# Copy application dependency manifests to the container image.
COPY package*.json ./
COPY yarn.lock ./
COPY nx.json ./
COPY tsconfig.base.json ./
# Install dependencies.
# Copy application
COPY apps/cake ./apps/cake
COPY libs ./libs
COPY tools ./tools
RUN yarn
RUN yarn generate
# Build the app
RUN yarn build cake --configuration=production
# Run the web service on container startup.
