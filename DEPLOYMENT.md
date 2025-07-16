# DES-BOMS Deployment Guide

## 🚀 Quick Deployment Options

### 1. Local Development
```bash
# Start development environment
pnpm install
docker-compose up db -d
pnpm db:migrate
pnpm dev
```

### 2. Docker Development Stack
```bash
# Start full stack with Docker
docker-compose up -d

# Check status
docker-compose ps

# View logs
docker-compose logs -f app
```

### 3. Production Deployment

#### Prerequisites
- Docker Engine 20.10+
- Docker Compose v2.0+
- 2GB+ RAM
- 10GB+ disk space

#### Environment Setup
```bash
# Create production environment file
cp .env.example .env.production

# Edit with production values
nano .env.production
```

#### Deploy to Production
```bash
# Build and start production stack
docker-compose -f docker-compose.prod.yml up -d

# Check deployment
docker-compose -f docker-compose.prod.yml ps
docker-compose -f docker-compose.prod.yml logs -f
```

## 🌐 Server Deployment (VPS/Cloud)

### Option A: Direct Docker Deployment
```bash
# On your server
git clone https://github.com/B0OGI3/DES-BOMS.git
cd DES-BOMS

# Set up environment
cp .env.example .env
nano .env  # Edit with your production values

# Deploy
docker-compose -f docker-compose.prod.yml up -d
```

### Option B: CI/CD with GitHub Actions
1. Fork the repository
2. Set up GitHub secrets:
   - `DOCKER_HOST` (your server SSH connection)
   - `DEPLOY_KEY` (SSH private key)
   - `DATABASE_URL` (production database URL)
3. Push to main branch triggers auto-deployment

## 🔧 Production Configuration

### Environment Variables (.env.production)
```env
# Database
DATABASE_URL="postgresql://user:password@db:5432/boms"
POSTGRES_USER=your_db_user
POSTGRES_PASSWORD=your_secure_password
POSTGRES_DB=boms

# Application
NODE_ENV=production
NEXT_PUBLIC_APP_URL="https://your-domain.com"
```

### Reverse Proxy (Nginx)
```nginx
server {
    listen 80;
    server_name your-domain.com;
    
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### SSL with Certbot
```bash
# Install certbot
sudo apt install certbot python3-certbot-nginx

# Get SSL certificate
sudo certbot --nginx -d your-domain.com
```

## 📊 Monitoring & Maintenance

### Health Checks
- Application: `http://localhost:3000/api/health`
- Database: `docker-compose exec db pg_isready`

### Backup Database
```bash
# Create backup
docker-compose exec db pg_dump -U desadmin boms > backup_$(date +%Y%m%d_%H%M%S).sql

# Restore backup
docker-compose exec -T db psql -U desadmin boms < backup_file.sql
```

### Log Management
```bash
# View logs
docker-compose logs -f --tail=100 app
docker-compose logs -f --tail=100 db

# Log rotation (add to crontab)
0 2 * * * docker system prune -f
```

### Updates & Maintenance
```bash
# Update application
git pull origin main
docker-compose build --no-cache
docker-compose -f docker-compose.prod.yml up -d

# Database migration
docker-compose exec app pnpm db:deploy
```

## 🔐 Security Checklist

- [ ] Change default database credentials
- [ ] Use strong passwords (20+ characters)
- [ ] Enable firewall (UFW/iptables)
- [ ] Set up SSL certificates
- [ ] Regular security updates
- [ ] Monitor access logs
- [ ] Backup database regularly
- [ ] Use Docker secrets for sensitive data

## 🚨 Troubleshooting

### Common Issues

**Port already in use:**
```bash
sudo lsof -i :3000
sudo lsof -i :5432
```

**Database connection failed:**
```bash
docker-compose logs db
docker-compose restart db
```

**Build failures:**
```bash
docker system prune -a
docker-compose build --no-cache
```

**Permission issues:**
```bash
sudo chown -R $USER:$USER ./
chmod +x *.sh
```

### Performance Optimization

**Database tuning:**
```sql
-- Add to PostgreSQL config
shared_buffers = 256MB
effective_cache_size = 1GB
maintenance_work_mem = 64MB
checkpoint_completion_target = 0.9
```

**Application optimization:**
- Enable Next.js compression
- Use CDN for static assets
- Implement Redis caching
- Monitor with APM tools

## 📱 Mobile & PWA Support

The application is responsive and can be configured as a PWA:

1. Add service worker
2. Create manifest.json
3. Enable offline capabilities
4. Add to homescreen support

## 📧 Support

For deployment issues:
1. Check this guide first
2. Review application logs
3. Check Docker/database status
4. Create GitHub issue with logs
