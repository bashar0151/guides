# --- Stage 1: Build ---
FROM node:20-alpine AS build
WORKDIR /app

# Install dependencies first (better caching)
COPY package*.json ./
RUN npm install --legacy-peer-deps

# Copy source and build
COPY . .
RUN npm run build

# --- Stage 2: Production ---
FROM nginx:stable-alpine
# Copy the 'build' output from the first stage to Nginx's web root
COPY --from=build /app/build /usr/share/nginx/html

# Optional: Add a custom Nginx config if you need special redirects
# COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]