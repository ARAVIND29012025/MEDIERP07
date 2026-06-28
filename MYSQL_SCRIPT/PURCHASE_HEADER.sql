USE medical_erp;

SET FOREIGN_KEY_CHECKS=0;

-- ===================================================
-- PURCHASE HEADER
-- ===================================================

CREATE TABLE purchases(

    id INT AUTO_INCREMENT PRIMARY KEY,

    purchase_no VARCHAR(30) UNIQUE NOT NULL,

    supplier_id INT NOT NULL,

    invoice_no VARCHAR(50),

    invoice_date DATE,

    purchase_date DATE NOT NULL,

    warehouse_id INT,

    total_amount DECIMAL(12,2) DEFAULT 0,

    discount_amount DECIMAL(12,2) DEFAULT 0,

    taxable_amount DECIMAL(12,2) DEFAULT 0,

    cgst_amount DECIMAL(12,2) DEFAULT 0,

    sgst_amount DECIMAL(12,2) DEFAULT 0,

    igst_amount DECIMAL(12,2) DEFAULT 0,

    gst_amount DECIMAL(12,2) DEFAULT 0,

    round_off DECIMAL(12,2) DEFAULT 0,

    grand_total DECIMAL(12,2) DEFAULT 0,

    payment_type ENUM(
        'Cash',
        'Credit',
        'UPI',
        'Bank'
    ) DEFAULT 'Credit',

    remarks TEXT,

    status ENUM(
        'Draft',
        'Completed',
        'Cancelled'
    ) DEFAULT 'Completed',

    created_by INT,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY(supplier_id)
        REFERENCES suppliers(id),

    FOREIGN KEY(warehouse_id)
        REFERENCES warehouses(id),

    FOREIGN KEY(created_by)
        REFERENCES users(id)

)ENGINE=InnoDB;

CREATE INDEX idx_purchase_no
ON purchases(purchase_no);

CREATE INDEX idx_purchase_date
ON purchases(purchase_date);

-- ===================================================
-- PURCHASE ITEMS
-- ===================================================

CREATE TABLE purchase_items(

    id INT AUTO_INCREMENT PRIMARY KEY,

    purchase_id INT NOT NULL,

    medicine_id INT NOT NULL,

    batch_id INT,

    batch_no VARCHAR(50),

    expiry_date DATE,

    manufacture_date DATE,

    purchase_rate DECIMAL(12,2),

    ptr DECIMAL(12,2),

    pts DECIMAL(12,2),

    retail_rate DECIMAL(12,2),

    wholesale_rate DECIMAL(12,2),

    mrp DECIMAL(12,2),

    gst_percent DECIMAL(5,2),

    discount_percent DECIMAL(5,2),

    free_qty INT DEFAULT 0,

    carton_qty INT DEFAULT 0,

    box_qty INT DEFAULT 0,

    strip_qty INT DEFAULT 0,

    loose_qty INT DEFAULT 0,

    total_base_qty INT DEFAULT 0,

    amount DECIMAL(12,2),

    FOREIGN KEY(purchase_id)
        REFERENCES purchases(id)
        ON DELETE CASCADE,

    FOREIGN KEY(medicine_id)
        REFERENCES medicines(id),

    FOREIGN KEY(batch_id)
        REFERENCES medicine_batches(id)

)ENGINE=InnoDB;

CREATE INDEX idx_purchase_item
ON purchase_items(purchase_id);

-- ===================================================
-- PURCHASE RETURN HEADER
-- ===================================================

CREATE TABLE purchase_returns(

    id INT AUTO_INCREMENT PRIMARY KEY,

    return_no VARCHAR(30) UNIQUE,

    purchase_id INT,

    supplier_id INT,

    return_date DATE,

    total_amount DECIMAL(12,2),

    remarks TEXT,

    created_by INT,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY(purchase_id)
        REFERENCES purchases(id),

    FOREIGN KEY(supplier_id)
        REFERENCES suppliers(id),

    FOREIGN KEY(created_by)
        REFERENCES users(id)

)ENGINE=InnoDB;

-- ===================================================
-- PURCHASE RETURN ITEMS
-- ===================================================

CREATE TABLE purchase_return_items(

    id INT AUTO_INCREMENT PRIMARY KEY,

    purchase_return_id INT,

    medicine_id INT,

    batch_id INT,

    return_qty INT,

    rate DECIMAL(12,2),

    amount DECIMAL(12,2),

    FOREIGN KEY(purchase_return_id)
        REFERENCES purchase_returns(id)
        ON DELETE CASCADE,

    FOREIGN KEY(medicine_id)
        REFERENCES medicines(id),

    FOREIGN KEY(batch_id)
        REFERENCES medicine_batches(id)

)ENGINE=InnoDB;

CREATE INDEX idx_purchase_return
ON purchase_return_items(purchase_return_id);

SET FOREIGN_KEY_CHECKS=1;

SELECT 'PART 2B COMPLETED SUCCESSFULLY' AS STATUS;