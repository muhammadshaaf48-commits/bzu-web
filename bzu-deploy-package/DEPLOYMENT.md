# Bahauddin Zakariya University (BZU) Multan — Production Deployment Guide

This guide details the complete deployment, database provisioning, and hosting setup for the modernized BZU University Portal.

---

## 1. System Requirements & Architecture

- **Node.js**: v20.x or v22.x LTS
- **Database Engine**: PostgreSQL 14+ (or MySQL 8+)
- **Reverse Proxy / SSL**: Nginx with Let's Encrypt Certbot
- **Runtime Manager**: PM2 or Docker / Container Orchestrator
- **AI Intelligence**: Google Gemini API (`gemini-3.1-flash-lite` for low latency, `gemini-4-carbon` with `ThinkingLevel.HIGH` for deep academic advisory)

---

## 2. Environment Configuration (`.env`)

Create a `.env` file in the project root:

```env
PORT=3000
NODE_ENV=production

# Public University Domain
APP_URL=https://bzu.edu.pk

# AI Studio Gemini API Key
GEMINI_API_KEY="your-gemini-api-key-here"

# (Optional) External PostgreSQL Database Connection String
DATABASE_URL="postgresql://bzu_user:StrongPasswordHere@localhost:5432/bzu_production"
```

---

## 3. Database Migration & Provisioning

The portal comes with an atomic JSON/file database store for zero-friction standalone execution, as well as an enterprise SQL schema (`schema.sql`) for production PostgreSQL/MySQL clusters:

### Running SQL Migrations on PostgreSQL
```bash
# 1. Create the database and user
sudo -u postgres psql -c "CREATE USER bzu_user WITH PASSWORD 'StrongPasswordHere';"
sudo -u postgres psql -c "CREATE DATABASE bzu_production OWNER bzu_user;"

# 2. Run schema.sql
psql -h localhost -U bzu_user -d bzu_production -f schema.sql
```

---

## 4. Build & Production Start

### Step 1: Install dependencies
```bash
npm install
```

### Step 2: Build frontend and verify types
```bash
npm run build
npm run lint
```

### Step 3: Run with PM2 Process Manager
```bash
# Install PM2 globally
npm install -g pm2

# Start the full-stack server
pm2 start "npm run start" --name "bzu-portal"

# Save PM2 configuration to restart automatically on system reboot
pm2 save
pm2 startup
```

---

## 5. Nginx Reverse Proxy with HTTPS (SSL)

Configure `/etc/nginx/sites-available/bzu.edu.pk`:

```nginx
server {
    listen 80;
    server_name bzu.edu.pk www.bzu.edu.pk;
    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl http2;
    server_name bzu.edu.pk www.bzu.edu.pk;

    ssl_certificate /etc/letsencrypt/live/bzu.edu.pk/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/bzu.edu.pk/privkey.pem;

    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

Enable the configuration and obtain SSL certificate:
```bash
sudo ln -s /etc/nginx/sites-available/bzu.edu.pk /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
sudo certbot --nginx -d bzu.edu.pk -d www.bzu.edu.pk
```

---

## 6. Verification Checklist

- [x] Responsive layout on Desktop, Tablet, and Mobile
- [x] Real-time banner ticker with academic notices
- [x] Academic Explorer with all 10 Faculties & 200+ Degree programs
- [x] Admissions Portal with application form, status tracker, and aggregate calculator
- [x] Official fee challan and printable confirmation receipt
- [x] Examination Results verification with course grades, GPA, and CGPA
- [x] Official 600 Faculty Census & searchable scholar directory
- [x] Dual-mode BZU AI Assistant (Low-latency `gemini-3.1-flash-lite` & High Thinking `gemini-4-carbon`)
- [x] Working Contact & Grievance desk with tracking ticket generation
- [x] Newsletter subscription API
