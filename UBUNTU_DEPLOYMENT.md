# Ubuntu Server Deployment Guide

Complete guide for deploying DES-BOMS with QuickBooks integration on Ubuntu Server.

## 🖥️ **System Requirements**

- Ubuntu Server 20.04+ (22.04 LTS recommended)
- Node.js 18+ 
- PostgreSQL 14+
- Nginx (for reverse proxy)
- SSL Certificate (Let's Encrypt recommended)

## 📦 **Step 1: Initial Server Setup**

### **Update System**
```bash
sudo apt update && sudo apt upgrade -y
```

### **Install Node.js**
```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
```

### **Install pnpm**
```bash
npm install -g pnpm
```

### **Install PostgreSQL**
```bash
sudo apt install postgresql postgresql-contrib -y
sudo systemctl start postgresql
sudo systemctl enable postgresql
```

### **Install Nginx**
```bash
sudo apt install nginx -y
sudo systemctl start nginx
sudo systemctl enable nginx
```

### **Install Git**
```bash
sudo apt install git -y
```

## 🗄️ **Step 2: Database Setup**

### **Create Database User**
```bash
sudo -u postgres psql
```

```sql
CREATE USER desadmin WITH PASSWORD 'DES6040';
CREATE DATABASE boms OWNER desadmin;
GRANT ALL PRIVILEGES ON DATABASE boms TO desadmin;
\q
```

### **Configure PostgreSQL**
```bash
sudo nano /etc/postgresql/14/main/postgresql.conf
```

Uncomment and modify:
```
listen_addresses = 'localhost'
```

```bash
sudo nano /etc/postgresql/14/main/pg_hba.conf
```

Add line:
```
local   boms    desadmin                md5
```

Restart PostgreSQL:
```bash
sudo systemctl restart postgresql
```

## 🚀 **Step 3: Application Deployment**

### **Clone Repository**
```bash
cd /var/www
sudo git clone https://github.com/YOUR_USERNAME/DES-BOMS.git
sudo chown -R $USER:$USER /var/www/DES-BOMS
cd /var/www/DES-BOMS
```

### **Install Dependencies**
```bash
pnpm install
```

### **Environment Configuration**
```bash
cp .env.example .env
nano .env
```

**Production .env file:**
```env
# Database
DATABASE_URL="postgresql://desadmin:DES6040@localhost:5432/boms"

# NextAuth
NEXTAUTH_SECRET="your-production-secret-here"
NEXTAUTH_URL="https://yourdomain.com"

# QuickBooks Production Configuration
QB_CONSUMER_KEY="your_production_qb_key"
QB_CONSUMER_SECRET="your_production_qb_secret"  
QB_SANDBOX="false"
QB_REDIRECT_URI="https://yourdomain.com/api/quickbooks/callback"

# OAuth Tokens (set after OAuth flow)
QB_ACCESS_TOKEN=""
QB_COMPANY_ID=""
```

### **Database Migration**
```bash
npx prisma migrate deploy
npx prisma generate
```

### **Build Application**
```bash
pnpm build
```

## 🔧 **Step 4: Process Management with PM2**

### **Install PM2**
```bash
npm install -g pm2
```

### **Create PM2 Ecosystem File**
```bash
nano ecosystem.config.js
```

```javascript
module.exports = {
  apps: [{
    name: 'des-boms',
    script: 'npm',
    args: 'start',
    env: {
      NODE_ENV: 'production',
      PORT: 3000
    },
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
  }]
}
```

### **Start Application**
```bash
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

## 🌐 **Step 5: Nginx Configuration**

### **Create Nginx Config**
```bash
sudo nano /etc/nginx/sites-available/des-boms
```

```nginx
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;
    
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

### **Enable Site**
```bash
sudo ln -s /etc/nginx/sites-available/des-boms /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

## 🔒 **Step 6: SSL Certificate (Let's Encrypt)**

### **Install Certbot**
```bash
sudo apt install certbot python3-certbot-nginx -y
```

### **Get SSL Certificate**
```bash
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
```

### **Auto-renewal**
```bash
sudo systemctl status certbot.timer
```

## 🔗 **Step 7: QuickBooks Integration Setup**

### **Option A: Using ngrok (Development/Testing)**

**Install ngrok:**
```bash
# Download and install ngrok
curl -s https://ngrok-agent.s3.amazonaws.com/ngrok.asc | sudo tee /etc/apt/trusted.gpg.d/ngrok.asc >/dev/null
echo "deb https://ngrok-agent.s3.amazonaws.com buster main" | sudo tee /etc/apt/sources.list.d/ngrok.list
sudo apt update && sudo apt install ngrok
```

**Configure ngrok:**
```bash
ngrok config add-authtoken YOUR_NGROK_TOKEN
```

**Start ngrok tunnel:**
```bash
ngrok http 3000
```

**Update .env with ngrok URL:**
```env
QB_REDIRECT_URI="https://your-ngrok-url.ngrok-free.app/api/quickbooks/callback"
```

### **Option B: Production Domain**

**Update QuickBooks Developer App with:**
- Host domain: `yourdomain.com`
- Redirect URI: `https://yourdomain.com/api/quickbooks/callback`
- Launch URL: `https://yourdomain.com`
- Disconnect URL: `https://yourdomain.com`

## 🔐 **Step 8: QuickBooks OAuth Setup**

### **Complete OAuth Flow**
1. Visit: `https://yourdomain.com/api/quickbooks/auth`
2. Sign in to QuickBooks
3. Authorize the application
4. Copy tokens from success page

### **Update Environment**
```bash
nano .env
```

Add the tokens:
```env
QB_ACCESS_TOKEN="your_access_token_here"
QB_COMPANY_ID="your_company_id_here"
```

### **Restart Application**
```bash
pm2 restart des-boms
```

## 🔥 **Step 9: Firewall Configuration**

```bash
sudo ufw allow ssh
sudo ufw allow 'Nginx Full'
sudo ufw enable
```

## 📊 **Step 10: Monitoring & Logs**

### **PM2 Monitoring**
```bash
pm2 status
pm2 logs des-boms
pm2 monit
```

### **Nginx Logs**
```bash
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log
```

### **Application Logs**
```bash
pm2 logs des-boms --lines 100
```

## 🔄 **Step 11: Deployment Updates**

### **Create Update Script**
```bash
nano update.sh
```

```bash
#!/bin/bash
cd /var/www/DES-BOMS
git pull origin main
pnpm install
pnpm build
npx prisma migrate deploy
pm2 restart des-boms
echo "Deployment complete!"
```

```bash
chmod +x update.sh
```

## 🛡️ **Step 12: Backup Strategy**

### **Database Backup Script**
```bash
nano backup-db.sh
```

```bash
#!/bin/bash
BACKUP_DIR="/var/backups/des-boms"
DATE=$(date +%Y%m%d_%H%M%S)

mkdir -p $BACKUP_DIR
pg_dump -h localhost -U desadmin boms > $BACKUP_DIR/boms_$DATE.sql
find $BACKUP_DIR -name "*.sql" -mtime +7 -delete
```

### **Cron Job for Daily Backups**
```bash
crontab -e
```

Add:
```
0 2 * * * /path/to/backup-db.sh
```

## 🧪 **Step 13: Testing Deployment**

### **Health Checks**
```bash
# Test application
curl http://localhost:3000/api/health

# Test database
pm2 logs des-boms | grep "Ready"

# Test QuickBooks integration
curl https://yourdomain.com/api/quickbooks/status
```

### **Create Test Customer**
1. Go to: `https://yourdomain.com/orders`
2. Create new order with customer
3. Verify customer appears in QuickBooks

## 🚨 **Troubleshooting**

### **Common Issues**

**Application won't start:**
```bash
pm2 logs des-boms
# Check for database connection issues
```

**Database connection failed:**
```bash
sudo systemctl status postgresql
# Check PostgreSQL logs
sudo tail -f /var/log/postgresql/postgresql-14-main.log
```

**QuickBooks OAuth errors:**
- Verify redirect URI matches exactly
- Check ngrok tunnel is active
- Validate QuickBooks app configuration

**SSL Certificate issues:**
```bash
sudo certbot certificates
sudo certbot renew --dry-run
```

## 📞 **Support Commands**

```bash
# Check all services
systemctl status nginx postgresql
pm2 status

# Restart everything
sudo systemctl restart nginx postgresql
pm2 restart all

# View all logs
pm2 logs --lines 50
sudo tail -f /var/log/nginx/error.log
```

## 🎯 **Production Checklist**

- [ ] Server updated and secured
- [ ] PostgreSQL installed and configured
- [ ] Application deployed and built
- [ ] PM2 process manager configured
- [ ] Nginx reverse proxy configured
- [ ] SSL certificate installed
- [ ] QuickBooks OAuth completed
- [ ] Firewall configured
- [ ] Monitoring setup
- [ ] Backup strategy implemented
- [ ] Health checks passing

## 🔗 **Useful Links**

- [PM2 Documentation](https://pm2.keymetrics.io/)
- [Nginx Configuration](https://nginx.org/en/docs/)
- [Let's Encrypt](https://letsencrypt.org/)
- [QuickBooks Developer](https://developer.intuit.com/)
- [ngrok Documentation](https://ngrok.com/docs)

---

**🎉 Your DES-BOMS application with QuickBooks integration is now ready for production!**
