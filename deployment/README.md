# DES-BOMS Deployment Scripts

This directory contains deployment and development scripts for the DES-BOMS system.

## 🚀 Deployment Scripts

### Production Deployment
- **`deploy-production.bat`** - Windows production deployment
- **`deploy-production.sh`** - Linux production deployment  
- **`deploy-linux.sh`** - Linux-specific deployment script

### Docker Deployment
- **`docker-entrypoint.sh`** - Docker container entry point
- **`start-docker.bat`** - Start Docker containers (Windows)
- **`start-docker.sh`** - Start Docker containers (Linux)

### Development
- **`dev.bat`** - Development environment startup (Windows)

### Automation
- **`refresh-qb-tokens-scheduler.bat`** - QuickBooks token refresh scheduler

## 📋 Usage

### For Production Deployment

**Windows:**
```cmd
deployment\deploy-production.bat
```

**Linux:**
```bash
./deployment/deploy-production.sh
```

### For Docker Development

**Windows:**
```cmd
deployment\start-docker.bat
```

**Linux:**
```bash
./deployment/start-docker.sh
```

### For Local Development

**Windows:**
```cmd
deployment\dev.bat
```

## ⚙️ Configuration

- Ensure environment variables are configured in `.env` files
- Docker configurations are in the root `docker-compose.yml` files
- Database migrations should be run before deployment

## 🔒 Security Notes

- Review environment variables before production deployment
- Ensure proper file permissions on Linux systems
- Use HTTPS in production environments
