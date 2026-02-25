# Deployment Guide

## 🚀 Deployment Options

WasteAI can be deployed on multiple platforms. This guide covers the most common deployment scenarios.

---

## 📦 Prerequisites

- Node.js 18+
- npm or yarn
- Git
- MongoDB Atlas account (for production)
- Netlify/Vercel account

---

## 🌐 Netlify Deployment

### Method 1: Netlify CLI

1. **Install Netlify CLI**
```bash
npm install -g netlify-cli
```

2. **Build the project**
```bash
npm run build
```

3. **Deploy**
```bash
netlify deploy --prod
```

### Method 2: GitHub Integration

1. **Push to GitHub**
```bash
git push origin main
```

2. **Connect to Netlify**
   - Go to [Netlify](https://netlify.com)
   - Click "New site from Git"
   - Select your repository
   - Configure build settings:
     - Build command: `npm run build`
     - Publish directory: `dist`

3. **Environment Variables**
   - Add in Netlify dashboard under Site settings > Environment variables:
   ```
   VITE_API_URL=https://your-api-url.com
   VITE_MONGODB_URI=your_mongodb_connection_string
   VITE_JWT_SECRET=your_jwt_secret
   ```

4. **Deploy**
   - Netlify will automatically deploy on every push to main

### netlify.toml Configuration
```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[build.environment]
  NODE_VERSION = "18"
```

---

## ▲ Vercel Deployment

### Method 1: Vercel CLI

1. **Install Vercel CLI**
```bash
npm install -g vercel
```

2. **Deploy**
```bash
vercel --prod
```

### Method 2: GitHub Integration

1. **Push to GitHub**
```bash
git push origin main
```

2. **Connect to Vercel**
   - Go to [Vercel](https://vercel.com)
   - Click "New Project"
   - Import your repository
   - Configure:
     - Framework Preset: Vite
     - Build Command: `npm run build`
     - Output Directory: `dist`

3. **Environment Variables**
   - Add in Vercel dashboard:
   ```
   VITE_API_URL=https://your-api-url.com
   VITE_MONGODB_URI=your_mongodb_connection_string
   VITE_JWT_SECRET=your_jwt_secret
   ```

### vercel.json Configuration
```json
{
  "version": 2,
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/static-build",
      "config": {
        "distDir": "dist"
      }
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/index.html"
    }
  ]
}
```

---

## 🐳 Docker Deployment

### Dockerfile
```dockerfile
# Build stage
FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# Production stage
FROM nginx:alpine

COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
```

### nginx.conf
```nginx
server {
    listen 80;
    server_name localhost;
    root /usr/share/nginx/html;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location /api {
        proxy_pass http://backend:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### docker-compose.yml
```yaml
version: '3.8'

services:
  frontend:
    build: .
    ports:
      - "80:80"
    depends_on:
      - backend
    environment:
      - VITE_API_URL=http://backend:5000

  backend:
    build: ./server
    ports:
      - "5000:5000"
    environment:
      - MONGODB_URI=${MONGODB_URI}
      - JWT_SECRET=${JWT_SECRET}
    depends_on:
      - mongodb

  mongodb:
    image: mongo:6
    ports:
      - "27017:27017"
    volumes:
      - mongodb_data:/data/db

volumes:
  mongodb_data:
```

### Deploy with Docker
```bash
docker-compose up -d
```

---

## ☁️ AWS Deployment

### S3 + CloudFront

1. **Build the project**
```bash
npm run build
```

2. **Create S3 Bucket**
```bash
aws s3 mb s3://wasteai-app
```

3. **Upload files**
```bash
aws s3 sync dist/ s3://wasteai-app --delete
```

4. **Configure S3 for static hosting**
```bash
aws s3 website s3://wasteai-app --index-document index.html --error-document index.html
```

5. **Create CloudFront Distribution**
   - Origin: S3 bucket
   - Default Root Object: index.html
   - Error Pages: 404 → /index.html (200)

### Elastic Beanstalk (Full Stack)

1. **Install EB CLI**
```bash
pip install awsebcli
```

2. **Initialize**
```bash
eb init -p node.js-18 wasteai
```

3. **Create environment**
```bash
eb create wasteai-prod
```

4. **Deploy**
```bash
eb deploy
```

---

## 🔧 Environment Variables

### Development (.env.development)
```env
VITE_API_URL=http://localhost:5000
VITE_ENABLE_ANALYTICS=false
VITE_DEBUG_MODE=true
```

### Production (.env.production)
```env
VITE_API_URL=https://api.wasteai.com
VITE_ENABLE_ANALYTICS=true
VITE_DEBUG_MODE=false
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/wasteai
JWT_SECRET=your_production_jwt_secret_here
PORT=5000
NODE_ENV=production
```

---

## 🗄️ Database Setup

### MongoDB Atlas

1. **Create Cluster**
   - Go to [MongoDB Atlas](https://cloud.mongodb.com)
   - Create new cluster (Free tier available)

2. **Create Database User**
   - Database Access → Add New User
   - Username: wasteai
   - Password: [secure password]

3. **Whitelist IP**
   - Network Access → Add IP Address
   - Allow access from anywhere: 0.0.0.0/0 (for production, use specific IPs)

4. **Get Connection String**
   - Clusters → Connect → Connect your application
   - Copy connection string
   - Replace `<password>` with your password

5. **Update Environment Variables**
```env
MONGODB_URI=mongodb+srv://wasteai:<password>@cluster0.xxxxx.mongodb.net/wasteai?retryWrites=true&w=majority
```

---

## 🔐 SSL/HTTPS Setup

### Netlify/Vercel
- Automatic HTTPS with Let's Encrypt
- No configuration needed

### Custom Domain
1. Add custom domain in platform settings
2. Update DNS records (A/CNAME)
3. Wait for SSL certificate provisioning (automatic)

### Nginx (Self-hosted)
```bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx

# Get certificate
sudo certbot --nginx -d wasteai.com -d www.wasteai.com

# Auto-renewal
sudo certbot renew --dry-run
```

---

## 📊 Monitoring & Analytics

### Setup Google Analytics
```typescript
// src/config/analytics.ts
export const GA_TRACKING_ID = 'G-XXXXXXXXXX';

// Add to index.html
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
```

### Setup Sentry (Error Tracking)
```bash
npm install @sentry/react
```

```typescript
// src/main.tsx
import * as Sentry from '@sentry/react';

Sentry.init({
  dsn: 'your-sentry-dsn',
  environment: import.meta.env.MODE,
});
```

---

## 🚦 Health Checks

### API Health Endpoint
```typescript
// server/routes/health.ts
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});
```

### Frontend Health Check
```typescript
// src/utils/healthCheck.ts
export const checkAPIHealth = async () => {
  const response = await fetch('/api/health');
  return response.ok;
};
```

---

## 🔄 CI/CD Pipeline

### GitHub Actions (Automated)
```yaml
# .github/workflows/deploy.yml
name: Deploy to Production

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run build
      - uses: netlify/actions/cli@master
        with:
          args: deploy --prod
        env:
          NETLIFY_AUTH_TOKEN: ${{ secrets.NETLIFY_AUTH_TOKEN }}
          NETLIFY_SITE_ID: ${{ secrets.NETLIFY_SITE_ID }}
```

---

## 🧪 Pre-Deployment Checklist

- [ ] All tests passing
- [ ] No console errors
- [ ] Environment variables configured
- [ ] Database migrations run
- [ ] SSL certificate active
- [ ] Analytics configured
- [ ] Error tracking setup
- [ ] Performance optimized (Lighthouse score > 90)
- [ ] SEO meta tags added
- [ ] Favicon and PWA icons
- [ ] robots.txt configured
- [ ] sitemap.xml generated

---

## 🔧 Troubleshooting

### Build Fails
```bash
# Clear cache
rm -rf node_modules package-lock.json
npm install
npm run build
```

### API Connection Issues
- Check CORS configuration
- Verify API URL in environment variables
- Check network tab in DevTools

### Database Connection Fails
- Verify MongoDB URI
- Check IP whitelist
- Confirm database user credentials

### 404 on Refresh
- Ensure SPA redirect rules configured
- Check netlify.toml or vercel.json

---

## 📞 Support

For deployment issues:
- GitHub Issues: [Report Issue](https://github.com/SaiyamJain468/wasteai/issues)
- Email: support@wasteai.com

---

**Last Updated**: January 2024
