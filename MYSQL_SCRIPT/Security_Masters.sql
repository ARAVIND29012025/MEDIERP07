-- ==========================================
-- MEDICAL ERP DATABASE - PART 1
-- Security + Masters
-- MySQL 8+
-- ==========================================

DROP DATABASE IF EXISTS medical_erp;
CREATE DATABASE medical_erp CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE medical_erp;

SET FOREIGN_KEY_CHECKS=0;

-- ==========================================
-- ROLES
-- ==========================================

CREATE TABLE roles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    role_name VARCHAR(100) NOT NULL UNIQUE,
    description VARCHAR(255),
    status TINYINT DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

INSERT INTO roles(role_name,description) VALUES
('Super Admin','System Administrator'),
('Admin','Administrator'),
('Manager','Store Manager'),
('Billing','Billing Staff'),
('Pharmacist','Pharmacist'),
('Store Keeper','Store Keeper');

-- ==========================================
-- USERS
-- ==========================================

CREATE TABLE users(

    id INT AUTO_INCREMENT PRIMARY KEY,

    role_id INT NOT NULL,

    username VARCHAR(50) UNIQUE NOT NULL,

    password VARCHAR(255) NOT NULL,

    full_name VARCHAR(150) NOT NULL,

    mobile VARCHAR(15),

    email VARCHAR(100),

    status ENUM('Active','Inactive') DEFAULT 'Active',

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_user_role
        FOREIGN KEY(role_id)
        REFERENCES roles(id)

)ENGINE=InnoDB;

-- ==========================================
-- PERMISSIONS
-- ==========================================

CREATE TABLE permissions(

    id INT AUTO_INCREMENT PRIMARY KEY,

    module_name VARCHAR(100),

    can_view TINYINT DEFAULT 1,

    can_add TINYINT DEFAULT 0,

    can_edit TINYINT DEFAULT 0,

    can_delete TINYINT DEFAULT 0,

    can_print TINYINT DEFAULT 0,

    can_export TINYINT DEFAULT 0

)ENGINE=InnoDB;

-- ==========================================
-- USER PERMISSIONS
-- ==========================================

CREATE TABLE user_permissions(

    id INT AUTO_INCREMENT PRIMARY KEY,

    user_id INT,

    permission_id INT,

    FOREIGN KEY(user_id)
    REFERENCES users(id),

    FOREIGN KEY(permission_id)
    REFERENCES permissions(id)

)ENGINE=InnoDB;

-- ==========================================
-- COMPANY MASTER
-- ==========================================

CREATE TABLE companies(

    id INT AUTO_INCREMENT PRIMARY KEY,

    company_code VARCHAR(20) UNIQUE,

    company_name VARCHAR(150) NOT NULL,

    contact_person VARCHAR(100),

    mobile VARCHAR(15),

    email VARCHAR(100),

    gst_no VARCHAR(20),

    dl_no VARCHAR(50),

    address TEXT,

    city VARCHAR(100),

    state VARCHAR(100),

    pincode VARCHAR(10),

    status ENUM('Active','Inactive') DEFAULT 'Active',

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP

)ENGINE=InnoDB;

-- ==========================================
-- CATEGORY MASTER
-- ==========================================

CREATE TABLE categories(

    id INT AUTO_INCREMENT PRIMARY KEY,

    category_code VARCHAR(20) UNIQUE,

    category_name VARCHAR(100) NOT NULL,

    description VARCHAR(255),

    status ENUM('Active','Inactive') DEFAULT 'Active',

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP

)ENGINE=InnoDB;

-- ==========================================
-- MANUFACTURERS
-- ==========================================

CREATE TABLE manufacturers(

    id INT AUTO_INCREMENT PRIMARY KEY,

    manufacturer_name VARCHAR(150),

    mobile VARCHAR(15),

    email VARCHAR(100),

    address TEXT,

    status ENUM('Active','Inactive') DEFAULT 'Active'

)ENGINE=InnoDB;

-- ==========================================
-- GENERIC MASTER
-- ==========================================

CREATE TABLE generics(

    id INT AUTO_INCREMENT PRIMARY KEY,

    generic_name VARCHAR(150),

    description TEXT,

    status ENUM('Active','Inactive') DEFAULT 'Active'

)ENGINE=InnoDB;

-- ==========================================
-- UNIT MASTER
-- ==========================================

CREATE TABLE units(

    id INT AUTO_INCREMENT PRIMARY KEY,

    unit_name VARCHAR(50) UNIQUE,

    short_name VARCHAR(20),

    status TINYINT DEFAULT 1

)ENGINE=InnoDB;

INSERT INTO units(unit_name,short_name) VALUES
('Tablet','Tab'),
('Capsule','Cap'),
('Strip','Strip'),
('Box','Box'),
('Carton','Ctn'),
('Bottle','Bottle'),
('Tube','Tube'),
('Injection','Inj'),
('Drops','Drops'),
('Vial','Vial'),
('Sachet','Sach');

-- ==========================================
-- SUPPLIERS
-- ==========================================

CREATE TABLE suppliers(

    id INT AUTO_INCREMENT PRIMARY KEY,

    supplier_code VARCHAR(20) UNIQUE,

    supplier_name VARCHAR(150),

    contact_person VARCHAR(100),

    mobile VARCHAR(15),

    whatsapp VARCHAR(15),

    email VARCHAR(100),

    gst_no VARCHAR(20),

    dl_no VARCHAR(50),

    address TEXT,

    city VARCHAR(100),

    state VARCHAR(100),

    pincode VARCHAR(10),

    opening_balance DECIMAL(12,2) DEFAULT 0,

    credit_days INT DEFAULT 0,

    status ENUM('Active','Inactive') DEFAULT 'Active'

)ENGINE=InnoDB;

-- ==========================================
-- CUSTOMERS
-- ==========================================

CREATE TABLE customers(

    id INT AUTO_INCREMENT PRIMARY KEY,

    customer_code VARCHAR(20) UNIQUE,

    customer_name VARCHAR(150),

    mobile VARCHAR(15),

    whatsapp VARCHAR(15),

    email VARCHAR(100),

    address TEXT,

    city VARCHAR(100),

    state VARCHAR(100),

    pincode VARCHAR(10),

    gst_no VARCHAR(20),

    customer_type ENUM('Retail','Wholesale','Hospital') DEFAULT 'Retail',

    credit_limit DECIMAL(12,2) DEFAULT 0,

    opening_balance DECIMAL(12,2) DEFAULT 0,

    status ENUM('Active','Inactive') DEFAULT 'Active'

)ENGINE=InnoDB;

-- ==========================================
-- DOCTORS
-- ==========================================

CREATE TABLE doctors(

    id INT AUTO_INCREMENT PRIMARY KEY,

    doctor_name VARCHAR(150),

    qualification VARCHAR(100),

    specialization VARCHAR(100),

    mobile VARCHAR(15),

    clinic_name VARCHAR(150),

    address TEXT,

    status ENUM('Active','Inactive') DEFAULT 'Active'

)ENGINE=InnoDB;

-- ==========================================
-- GST MASTER
-- ==========================================

CREATE TABLE gst_rates(

    id INT AUTO_INCREMENT PRIMARY KEY,

    gst_name VARCHAR(20),

    cgst DECIMAL(5,2),

    sgst DECIMAL(5,2),

    igst DECIMAL(5,2)

)ENGINE=InnoDB;

INSERT INTO gst_rates(gst_name,cgst,sgst,igst) VALUES
('0%',0,0,0),
('5%',2.5,2.5,5),
('12%',6,6,12),
('18%',9,9,18),
('28%',14,14,28);

-- ==========================================
-- HSN MASTER
-- ==========================================

CREATE TABLE hsn_codes(

    id INT AUTO_INCREMENT PRIMARY KEY,

    hsn_code VARCHAR(20),

    description VARCHAR(255),

    gst_rate DECIMAL(5,2)

)ENGINE=InnoDB;

-- ==========================================
-- RACK MASTER
-- ==========================================

CREATE TABLE racks(

    id INT AUTO_INCREMENT PRIMARY KEY,

    rack_code VARCHAR(20),

    rack_name VARCHAR(100),

    description VARCHAR(255)

)ENGINE=InnoDB;

-- ==========================================
-- WAREHOUSE MASTER
-- ==========================================

CREATE TABLE warehouses(

    id INT AUTO_INCREMENT PRIMARY KEY,

    warehouse_name VARCHAR(150),

    address TEXT,

    status ENUM('Active','Inactive') DEFAULT 'Active'

)ENGINE=InnoDB;

SET FOREIGN_KEY_CHECKS=1;

SELECT 'PART-1 COMPLETED SUCCESSFULLY' AS STATUS;