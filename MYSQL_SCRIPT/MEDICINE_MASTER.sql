USE medical_erp;

SET FOREIGN_KEY_CHECKS=0;

-- =============================================
-- MEDICINE MASTER
-- =============================================

CREATE TABLE medicines (

    id INT AUTO_INCREMENT PRIMARY KEY,

    medicine_code VARCHAR(30) UNIQUE NOT NULL,

    barcode VARCHAR(100),

    medicine_name VARCHAR(200) NOT NULL,

    generic_id INT,

    company_id INT,

    manufacturer_id INT,

    category_id INT,

    hsn_id INT,

    gst_id INT,

    rack_id INT,

    schedule_type ENUM('OTC','H','H1','X') DEFAULT 'OTC',

    prescription_required TINYINT DEFAULT 0,

    min_stock INT DEFAULT 0,

    max_stock INT DEFAULT 0,

    reorder_level INT DEFAULT 0,

    status ENUM('Active','Inactive') DEFAULT 'Active',

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_medicine_generic
        FOREIGN KEY(generic_id)
        REFERENCES generics(id),

    CONSTRAINT fk_medicine_company
        FOREIGN KEY(company_id)
        REFERENCES companies(id),

    CONSTRAINT fk_medicine_manufacturer
        FOREIGN KEY(manufacturer_id)
        REFERENCES manufacturers(id),

    CONSTRAINT fk_medicine_category
        FOREIGN KEY(category_id)
        REFERENCES categories(id),

    CONSTRAINT fk_medicine_hsn
        FOREIGN KEY(hsn_id)
        REFERENCES hsn_codes(id),

    CONSTRAINT fk_medicine_gst
        FOREIGN KEY(gst_id)
        REFERENCES gst_rates(id),

    CONSTRAINT fk_medicine_rack
        FOREIGN KEY(rack_id)
        REFERENCES racks(id)

) ENGINE=InnoDB;

CREATE INDEX idx_medicine_name
ON medicines(medicine_name);

CREATE INDEX idx_barcode
ON medicines(barcode);

-- =============================================
-- MEDICINE PACKING
-- =============================================

CREATE TABLE medicine_packings (

    id INT AUTO_INCREMENT PRIMARY KEY,

    medicine_id INT NOT NULL,

    level_no INT NOT NULL,

    unit_id INT NOT NULL,

    unit_qty INT NOT NULL,

    is_sale_unit TINYINT DEFAULT 0,

    status TINYINT DEFAULT 1,

    FOREIGN KEY(medicine_id)
        REFERENCES medicines(id)
        ON DELETE CASCADE,

    FOREIGN KEY(unit_id)
        REFERENCES units(id)

) ENGINE=InnoDB;

CREATE INDEX idx_packing
ON medicine_packings(medicine_id);

-- =============================================
-- MEDICINE BATCHES
-- =============================================

CREATE TABLE medicine_batches (

    id INT AUTO_INCREMENT PRIMARY KEY,

    medicine_id INT NOT NULL,

    warehouse_id INT,

    batch_no VARCHAR(50) NOT NULL,

    manufacture_date DATE,

    expiry_date DATE,

    purchase_rate DECIMAL(12,2) DEFAULT 0,

    ptr DECIMAL(12,2) DEFAULT 0,

    pts DECIMAL(12,2) DEFAULT 0,

    retail_rate DECIMAL(12,2) DEFAULT 0,

    wholesale_rate DECIMAL(12,2) DEFAULT 0,

    mrp DECIMAL(12,2) DEFAULT 0,

    discount_percent DECIMAL(5,2) DEFAULT 0,

    gst_percent DECIMAL(5,2) DEFAULT 0,

    opening_stock INT DEFAULT 0,

    current_stock INT DEFAULT 0,

    reserved_stock INT DEFAULT 0,

    damaged_stock INT DEFAULT 0,

    expired_stock INT DEFAULT 0,

    batch_status ENUM(
        'Active',
        'Expired',
        'Blocked',
        'Recalled'
    ) DEFAULT 'Active',

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_batch_medicine
        FOREIGN KEY(medicine_id)
        REFERENCES medicines(id),

    CONSTRAINT fk_batch_warehouse
        FOREIGN KEY(warehouse_id)
        REFERENCES warehouses(id)

) ENGINE=InnoDB;

CREATE INDEX idx_batch
ON medicine_batches(batch_no);

CREATE INDEX idx_expiry
ON medicine_batches(expiry_date);

CREATE INDEX idx_batch_stock
ON medicine_batches(current_stock);

SET FOREIGN_KEY_CHECKS=1;

SELECT 'PART 2A COMPLETED SUCCESSFULLY' AS STATUS;