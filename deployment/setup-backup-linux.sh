#!/bin/bash
# DES-BOMS Linux Server Backup Setup Script

echo "Setting up DES-BOMS backup system..."

# Create backup directory
sudo mkdir -p /opt/des-boms/backups
sudo mkdir -p /opt/des-boms/scripts
sudo mkdir -p /var/log/des-boms

# Create backup script
sudo tee /opt/des-boms/scripts/backup.sh > /dev/null << 'EOF'
#!/bin/bash

# Configuration
BACKUP_DIR="/opt/des-boms/backups"
DB_NAME="des_boms"
DATE=$(date +%Y%m%d_%H%M%S)
RETENTION_DAYS=30
LOG_FILE="/var/log/des-boms/backup.log"

# Ensure backup directory exists
mkdir -p $BACKUP_DIR

# Create backup
echo "$(date): Starting backup..." >> $LOG_FILE
if pg_dump $DATABASE_URL > "$BACKUP_DIR/des_boms_$DATE.sql"; then
    # Compress the backup
    gzip "$BACKUP_DIR/des_boms_$DATE.sql"
    
    # Clean old backups
    find $BACKUP_DIR -name "*.sql.gz" -mtime +$RETENTION_DAYS -delete
    
    # Log success
    BACKUP_SIZE=$(du -h "$BACKUP_DIR/des_boms_$DATE.sql.gz" | cut -f1)
    echo "$(date): Backup completed successfully - des_boms_$DATE.sql.gz ($BACKUP_SIZE)" >> $LOG_FILE
else
    echo "$(date): Backup failed!" >> $LOG_FILE
    exit 1
fi
EOF

# Make backup script executable
sudo chmod +x /opt/des-boms/scripts/backup.sh

# Create systemd service
sudo tee /etc/systemd/system/des-boms-backup.service > /dev/null << 'EOF'
[Unit]
Description=DES-BOMS Database Backup
Wants=des-boms-backup.timer

[Service]
Type=oneshot
User=postgres
Environment=DATABASE_URL=postgresql://username:password@localhost:5432/des_boms
ExecStart=/opt/des-boms/scripts/backup.sh
StandardOutput=journal
StandardError=journal

[Install]
WantedBy=multi-user.target
EOF

# Create systemd timer
sudo tee /etc/systemd/system/des-boms-backup.timer > /dev/null << 'EOF'
[Unit]
Description=Run DES-BOMS backup daily at 2 AM
Requires=des-boms-backup.service

[Timer]
OnCalendar=*-*-* 02:00:00
Persistent=true
RandomizedDelaySec=30m

[Install]
WantedBy=timers.target
EOF

# Set proper permissions
sudo chown -R postgres:postgres /opt/des-boms/backups
sudo chown postgres:postgres /opt/des-boms/scripts/backup.sh
sudo chown postgres:postgres /var/log/des-boms

# Enable and start the timer
sudo systemctl daemon-reload
sudo systemctl enable des-boms-backup.timer
sudo systemctl start des-boms-backup.timer

# Create logrotate configuration
sudo tee /etc/logrotate.d/des-boms > /dev/null << 'EOF'
/var/log/des-boms/*.log {
    daily
    missingok
    rotate 30
    compress
    delaycompress
    notifempty
    copytruncate
}
EOF

echo "✅ Backup system setup complete!"
echo ""
echo "Commands to manage backups:"
echo "  View timer status:    sudo systemctl status des-boms-backup.timer"
echo "  Run manual backup:    sudo systemctl start des-boms-backup.service"
echo "  View backup logs:     sudo journalctl -u des-boms-backup.service"
echo "  List backups:         ls -la /opt/des-boms/backups/"
echo ""
echo "⚠️  Remember to:"
echo "1. Update DATABASE_URL in /etc/systemd/system/des-boms-backup.service"
echo "2. Test the backup: sudo systemctl start des-boms-backup.service"
echo "3. Configure remote backup storage (optional)"
