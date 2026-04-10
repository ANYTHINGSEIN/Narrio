# Stage 1: Build
FROM node:20-alpine AS builder

# Enable pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app

# Copy package files
COPY package.json pnpm-lock.yaml ./

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy source code
COPY . .

# Build argument for API URL (can be overridden during build)
ARG VITE_API_BASE_URL
ENV VITE_API_BASE_URL=${VITE_API_BASE_URL}

# Build the application
RUN pnpm run build

# Stage 2: Serve
FROM nginx:alpine

# Install envsubst for runtime environment variable substitution
RUN apk add --no-cache gettext

# Remove default nginx static assets
RUN rm -rf /usr/share/nginx/html/*

# Copy built assets from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy custom nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Create runtime config template
RUN echo 'window.__ENV__ = { API_BASE_URL: "${VITE_API_BASE_URL}" };' > /usr/share/nginx/html/env-config.js.template

# Create startup script for runtime environment variable substitution
RUN echo '#!/bin/sh' > /docker-entrypoint.sh && \
    echo 'envsubst < /usr/share/nginx/html/env-config.js.template > /usr/share/nginx/html/env-config.js' >> /docker-entrypoint.sh && \
    echo 'nginx -g "daemon off;"' >> /docker-entrypoint.sh && \
    chmod +x /docker-entrypoint.sh

EXPOSE 80

CMD ["/docker-entrypoint.sh"]
