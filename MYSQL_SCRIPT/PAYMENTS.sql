USE medical_erp;

SET FOREIGN_KEY_CHECKS=0;

-- ===========================================
-- PAYMENTS
-- ===========================================

CREATE TABLE payments(

    id INT AUTO_INCREMENT PRIMARY KEY,

    payment_no VARCHAR(30) UNIQUE,

    payment_date DATE,

    supplier_id INT,

    amount DECIMAL(12,2),

    payment_mode ENUM(
        'Cash',
        'UPI',
        'Bank',
        'Cheque'
    ),

    reference_no VARCHAR(100),

    remarks TEXT,

    created_by INT,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY(supplier_id)
        REFERENCES suppliers(id),

    FOREIGN KEY(created_by)
        REFERENCES users(id)

);

-- ===========================================
-- RECEIPTS
-- ===========================================

CREATE TABLE receipts(

    id INT AUTO_INCREMENT PRIMARY KEY,

    receipt_no VARCHAR(30) UNIQUE,

    receipt_date DATE,

    customer_id INT,

    amount DECIMAL(12,2),

    payment_mode ENUM(
        'Cash',
        'UPI',
        'Bank',
        'Cheque'
    ),

    reference_no VARCHAR(100),

    remarks TEXT,

    created_by INT,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY(customer_id)
        REFERENCES customers(id),

    FOREIGN KEY(created_by)
        REFERENCES users(id)

);

-- ===========================================
-- EXPENSES
-- ===========================================

CREATE TABLE expenses(

    id INT AUTO_INCREMENT PRIMARY KEY,

    expense_date DATE,

    expense_head VARCHAR(100),

    amount DECIMAL(12,2),

    payment_mode ENUM(
        'Cash',
        'UPI',
        'Bank'
    ),

    remarks TEXT,

    created_by INT,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY(created_by)
        REFERENCES users(id)

);

SET FOREIGN_KEY_CHECKS=1;

SELECT 'ACCOUNT MODULE COMPLETED';