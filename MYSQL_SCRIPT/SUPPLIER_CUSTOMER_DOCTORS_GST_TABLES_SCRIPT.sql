CREATE TABLE suppliers (

    id INT AUTO_INCREMENT PRIMARY KEY,

    supplier_code VARCHAR(20) UNIQUE NOT NULL,

    supplier_name VARCHAR(150) NOT NULL,

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

    status ENUM('Active','Inactive') DEFAULT 'Active',

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE customers (

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

    status ENUM('Active','Inactive') DEFAULT 'Active',

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE doctors (

    id INT AUTO_INCREMENT PRIMARY KEY,

    doctor_name VARCHAR(150),

    qualification VARCHAR(100),

    specialization VARCHAR(100),

    mobile VARCHAR(15),

    clinic_name VARCHAR(150),

    address TEXT,

    status ENUM('Active','Inactive') DEFAULT 'Active'
);
CREATE TABLE gst_rates (

    id INT AUTO_INCREMENT PRIMARY KEY,

    gst_name VARCHAR(30),

    cgst DECIMAL(5,2),

    sgst DECIMAL(5,2),

    igst DECIMAL(5,2)
);


CREATE TABLE hsn_codes (

    id INT AUTO_INCREMENT PRIMARY KEY,

    hsn_code VARCHAR(20),

    description VARCHAR(255),

    gst_rate DECIMAL(5,2)
);


CREATE TABLE racks (

    id INT AUTO_INCREMENT PRIMARY KEY,

    rack_code VARCHAR(20),

    rack_name VARCHAR(50),

    description VARCHAR(200)
);


CREATE TABLE warehouses (

    id INT AUTO_INCREMENT PRIMARY KEY,

    warehouse_name VARCHAR(100),

    address TEXT,

    status ENUM('Active','Inactive') DEFAULT 'Active'
);