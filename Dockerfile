# Multi-stage production build for BZU University Portal
FROM node:20-alpine AS builder

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm ci

# Copy application source code
COPY . .

# Build Vite client assets into /app/dist
RUN npm run build

# Production image
FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000

# Install runtime dependencies only
COPY package*.json ./
RUN npm ci --omit=dev && npm install -g tsx

# Copy built frontend assets and server backend
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/server.ts ./server.ts
COPY --from=builder /app/src ./src
COPY --from=builder /app/schema.sql ./schema.sql
COPY --from=builder /app/.env.example ./.env.example

# Create data directory for persistent local database storage
RUN mkdir -p /app/.data && chown -R node:node /app

USER node

EXPOSE 3000

CMD ["tsx", "server.ts"]
