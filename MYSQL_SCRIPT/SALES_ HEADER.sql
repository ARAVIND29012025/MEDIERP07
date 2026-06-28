USE medical_erp;

SET FOREIGN_KEY_CHECKS=0;

-- ======================================================
-- SALES HEADER
-- ======================================================

CREATE TABLE sales (

    id INT AUTO_INCREMENT PRIMARY KEY,

    bill_no VARCHAR(30) UNIQUE NOT NULL,

    bill_date DATETIME NOT NULL,

    customer_id INT,

    doctor_id INT,

    sale_type ENUM('Retail','Wholesale') DEFAULT 'Retail',

    payment_mode ENUM('Cash','UPI','Card','Credit') DEFAULT 'Cash',

    total_amount DECIMAL(12,2) DEFAULT 0,

    discount_amount DECIMAL(12,2) DEFAULT 0,

    taxable_amount DECIMAL(12,2) DEFAULT 0,

    cgst_amount DECIMAL(12,2) DEFAULT 0,

    sgst_amount DECIMAL(12,2) DEFAULT 0,

    igst_amount DECIMAL(12,2) DEFAULT 0,

    gst_amount DECIMAL(12,2) DEFAULT 0,

    round_off DECIMAL(12,2) DEFAULT 0,

    grand_total DECIMAL(12,2) DEFAULT 0,

    remarks TEXT,

    status ENUM('Completed','Cancelled') DEFAULT 'Completed',

    created_by INT,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY(customer_id) REFERENCES customers(id),

    FOREIGN KEY(doctor_id) REFERENCES doctors(id),

    FOREIGN KEY(created_by) REFERENCES users(id)

);

CREATE INDEX idx_bill_no ON sales(bill_no);

-- ======================================================
-- SALE ITEMS
-- ======================================================

CREATE TABLE sale_items (

    id INT AUTO_INCREMENT PRIMARY KEY,

    sale_id INT NOT NULL,

    medicine_id INT NOT NULL,

    batch_id INT NOT NULL,

    sale_price_type ENUM(
        'Retail',
        'Wholesale',
        'Hospital',
        'Distributor'
    ) DEFAULT 'Retail',

    sale_unit ENUM(
        'Tablet',
        'Capsule',
        'Strip',
        'Box',
        'Carton',
        'Bottle',
        'Tube'
    ),

    quantity INT NOT NULL,

    base_quantity INT NOT NULL,

    rate DECIMAL(12,2),

    discount_percent DECIMAL(5,2),

    gst_percent DECIMAL(5,2),

    amount DECIMAL(12,2),

    FOREIGN KEY(sale_id)
        REFERENCES sales(id)
        ON DELETE CASCADE,

    FOREIGN KEY(medicine_id)
        REFERENCES medicines(id),

    FOREIGN KEY(batch_id)
        REFERENCES medicine_batches(id)

);

-- ======================================================
-- SALES RETURN HEADER
-- ======================================================

CREATE TABLE sales_returns (

    id INT AUTO_INCREMENT PRIMARY KEY,

    return_no VARCHAR(30) UNIQUE,

    sale_id INT,

    customer_id INT,

    return_date DATE,

    total_amount DECIMAL(12,2),

    remarks TEXT,

    created_by INT,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY(sale_id)
        REFERENCES sales(id),

    FOREIGN KEY(customer_id)
        REFERENCES customers(id),

    FOREIGN KEY(created_by)
        REFERENCES users(id)

);

-- ======================================================
-- SALES RETURN ITEMS
-- ======================================================

CREATE TABLE sale_return_items (

    id INT AUTO_INCREMENT PRIMARY KEY,

    sales_return_id INT,

    medicine_id INT,

    batch_id INT,

    return_qty INT,

    rate DECIMAL(12,2),

    amount DECIMAL(12,2),

    FOREIGN KEY(sales_return_id)
        REFERENCES sales_returns(id)
        ON DELETE CASCADE,

    FOREIGN KEY(medicine_id)
        REFERENCES medicines(id),

    FOREIGN KEY(batch_id)
        REFERENCES medicine_batches(id)

);

-- ======================================================
-- STOCK LEDGER
-- ======================================================

CREATE TABLE stock_ledger (

    id INT AUTO_INCREMENT PRIMARY KEY,

    medicine_id INT NOT NULL,

    batch_id INT NOT NULL,

    warehouse_id INT,

    transaction_type ENUM(

        'Opening',

        'Purchase',

        'Purchase Return',

        'Sale',

        'Sales Return',

        'Adjustment',

        'Transfer In',

        'Transfer Out'

    ),

    reference_table VARCHAR(50),

    reference_id INT,

    qty_in INT DEFAULT 0,

    qty_out INT DEFAULT 0,

    balance_qty INT DEFAULT 0,

    transaction_date DATETIME,

    remarks VARCHAR(255),

    created_by INT,

    FOREIGN KEY(medicine_id)
        REFERENCES medicines(id),

    FOREIGN KEY(batch_id)
        REFERENCES medicine_batches(id),

    FOREIGN KEY(warehouse_id)
        REFERENCES warehouses(id),

    FOREIGN KEY(created_by)
        REFERENCES users(id)

);

CREATE INDEX idx_stock_batch
ON stock_ledger(batch_id);

-- ======================================================
-- STOCK ADJUSTMENT
-- ======================================================

CREATE TABLE stock_adjustments (

    id INT AUTO_INCREMENT PRIMARY KEY,

    adjustment_no VARCHAR(30),

    medicine_id INT,

    batch_id INT,

    warehouse_id INT,

    adjustment_type ENUM(

        'Increase',

        'Decrease'

    ),

    quantity INT,

    reason VARCHAR(255),

    created_by INT,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY(medicine_id)
        REFERENCES medicines(id),

    FOREIGN KEY(batch_id)
        REFERENCES medicine_batches(id),

    FOREIGN KEY(warehouse_id)
        REFERENCES warehouses(id),

    FOREIGN KEY(created_by)
        REFERENCES users(id)

);

-- ======================================================
-- STOCK TRANSFER
-- ======================================================

CREATE TABLE stock_transfers (

    id INT AUTO_INCREMENT PRIMARY KEY,

    transfer_no VARCHAR(30),

    medicine_id INT,

    batch_id INT,

    from_warehouse INT,

    to_warehouse INT,

    quantity INT,

    transfer_date DATE,

    created_by INT,

    FOREIGN KEY(medicine_id)
        REFERENCES medicines(id),

    FOREIGN KEY(batch_id)
        REFERENCES medicine_batches(id),

    FOREIGN KEY(from_warehouse)
        REFERENCES warehouses(id),

    FOREIGN KEY(to_warehouse)
        REFERENCES warehouses(id),

    FOREIGN KEY(created_by)
        REFERENCES users(id)

);

SET FOREIGN_KEY_CHECKS=1;

SELECT 'PART 3 COMPLETED SUCCESSFULLY' AS STATUS;