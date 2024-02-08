FROM node:18-alpine AS builder
# Set the working directory to /app inside the container
USER root
RUN mkdir /app
WORKDIR /app
# Copy app files
COPY ./package.json .
COPY . .
# Install yarn package manager
# RUN npm install yarn
# Install dependencies (npm ci makes sure the exact versions in the lockfile gets installed)
RUN yarn install --immutable --immutable-cache --check-cache
# Build the app
RUN yarn run build 

# Bundle static assets with nginx
FROM nginx:1.21.0-alpine AS production
ENV NODE_ENV production
# Copy built assets from `builder` image
COPY --from=builder /app/build /usr/share/nginx/html
# Add your nginx.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf


# Start nginx
CMD ["nginx", "-g", "daemon off;"]


