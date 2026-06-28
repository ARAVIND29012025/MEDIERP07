

CREATE TABLE financial_years
(
    id INT AUTO_INCREMENT PRIMARY KEY,
    year_name VARCHAR(20) UNIQUE,
    start_date DATE,
    end_date DATE,
    is_active TINYINT DEFAULT 1
);


CREATE TABLE tax_groups(
    id INT AUTO_INCREMENT PRIMARY KEY,
    tax_name VARCHAR(50),
    cgst DECIMAL(5,2),
    sgst DECIMAL(5,2),
    igst DECIMAL(5,2)
);




CREATE TABLE discount_schemes(
    id INT AUTO_INCREMENT PRIMARY KEY,
    scheme_name VARCHAR(100),
    buy_qty INT,
    free_qty INT,
    discount_percent DECIMAL(5,2),
    start_date DATE,
    end_date DATE,
    status TINYINT DEFAULT 1
);



CREATE TABLE price_lists(
    id INT AUTO_INCREMENT PRIMARY KEY,
    medicine_id INT,
    price_type ENUM(
        'Retail',
        'Wholesale',
        'Distributor',
        'Hospital'
    ),
    rate DECIMAL(12,2),
    effective_date DATE,
    FOREIGN KEY(medicine_id)
        REFERENCES medicines(id)
);


CREATE TABLE medicine_images(
    id INT AUTO_INCREMENT PRIMARY KEY,
    medicine_id INT,
    image_path VARCHAR(255),
    FOREIGN KEY(medicine_id)
        REFERENCES medicines(id)
);


CREATE TABLE customer_addresses(
    id INT AUTO_INCREMENT PRIMARY KEY,
    customer_id INT,
    address_type ENUM('Billing','Shipping'),
    address TEXT,
    city VARCHAR(100),
    state VARCHAR(100),
    pincode VARCHAR(10),
    FOREIGN KEY(customer_id)
        REFERENCES customers(id)
);

CREATE TABLE supplier_addresses(
    id INT AUTO_INCREMENT PRIMARY KEY,
    supplier_id INT,
    address_type ENUM('Office','Warehouse'),
    address TEXT,
    city VARCHAR(100),
    state VARCHAR(100),
    pincode VARCHAR(10),
    FOREIGN KEY(supplier_id)
        REFERENCES suppliers(id)
);


CREATE TABLE sales_orders(
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_no VARCHAR(30),
    order_date DATE,
    customer_id INT,
    total_amount DECIMAL(12,2),
    status ENUM(
        'Pending',
        'Approved',
        'Completed',
        'Cancelled'
    ),
    FOREIGN KEY(customer_id)
        REFERENCES customers(id)
);


CREATE TABLE purchase_orders(
    id INT AUTO_INCREMENT PRIMARY KEY,
    po_no VARCHAR(30),
    po_date DATE,
    supplier_id INT,
    total_amount DECIMAL(12,2),
    status ENUM(
        'Pending',
        'Approved',
        'Received',
        'Cancelled'
    ),
    FOREIGN KEY(supplier_id)
        REFERENCES suppliers(id)
);