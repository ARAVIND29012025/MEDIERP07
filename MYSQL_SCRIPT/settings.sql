USE medical_erp;

SET FOREIGN_KEY_CHECKS=0;

-- ===========================================
-- SETTINGS
-- ===========================================

CREATE TABLE settings(

    id INT AUTO_INCREMENT PRIMARY KEY,

    setting_key VARCHAR(100) UNIQUE,

    setting_value TEXT

);

-- ===========================================
-- AUDIT LOGS
-- ===========================================

CREATE TABLE audit_logs(

    id INT AUTO_INCREMENT PRIMARY KEY,

    user_id INT,

    module_name VARCHAR(100),

    action_name VARCHAR(100),

    record_id INT,

    action_date DATETIME DEFAULT CURRENT_TIMESTAMP,

    ip_address VARCHAR(50),

    remarks TEXT,

    FOREIGN KEY(user_id)
        REFERENCES users(id)

);

-- ===========================================
-- NOTIFICATIONS
-- ===========================================

CREATE TABLE notifications(

    id INT AUTO_INCREMENT PRIMARY KEY,

    title VARCHAR(200),

    message TEXT,

    notification_type ENUM(

        'General',

        'Expiry',

        'Low Stock',

        'Purchase',

        'Sales'

    ),

    is_read TINYINT DEFAULT 0,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP

);

-- ===========================================
-- OTP LOGS
-- ===========================================

CREATE TABLE otp_logs(

    id INT AUTO_INCREMENT PRIMARY KEY,

    mobile VARCHAR(20),

    email VARCHAR(100),

    otp VARCHAR(10),

    purpose VARCHAR(100),

    is_verified TINYINT DEFAULT 0,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP

);

-- ===========================================
-- EMAIL LOGS
-- ===========================================

CREATE TABLE email_logs(

    id INT AUTO_INCREMENT PRIMARY KEY,

    email_to VARCHAR(100),

    subject VARCHAR(255),

    body TEXT,

    sent_status TINYINT DEFAULT 0,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP

);

-- ===========================================
-- WHATSAPP LOGS
-- ===========================================

CREATE TABLE whatsapp_logs(

    id INT AUTO_INCREMENT PRIMARY KEY,

    mobile VARCHAR(20),

    message TEXT,

    sent_status TINYINT DEFAULT 0,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP

);

SET FOREIGN_KEY_CHECKS=1;

SELECT 'SYSTEM MODULE COMPLETED';