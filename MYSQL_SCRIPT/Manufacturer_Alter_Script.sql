ALTER TABLE manufacturers
ADD COLUMN manufacturer_code VARCHAR(20) UNIQUE AFTER id,
ADD COLUMN created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP AFTER status;

GO

ALTER TABLE generics
ADD COLUMN generic_code VARCHAR(20) UNIQUE AFTER id,
ADD COLUMN created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP AFTER status;

GO

ALTER TABLE units
ADD COLUMN unit_code VARCHAR(20) UNIQUE AFTER id,
ADD COLUMN created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP AFTER status;

GO

ALTER TABLE units
MODIFY status ENUM('Active','Inactive') DEFAULT 'Active';

GO

ALTER TABLE racks
ADD COLUMN status ENUM('Active','Inactive') DEFAULT 'Active' AFTER description,
ADD COLUMN created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP AFTER status;

GO

ALTER TABLE warehouses
ADD COLUMN warehouse_code VARCHAR(20) UNIQUE AFTER id,
ADD COLUMN city VARCHAR(100) AFTER address,
ADD COLUMN state VARCHAR(100) AFTER city,
ADD COLUMN pincode VARCHAR(10) AFTER state,
ADD COLUMN created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP AFTER status;
GO

ALTER TABLE hsn_codes
ADD COLUMN status ENUM('Active','Inactive') DEFAULT 'Active' AFTER gst_rate,
ADD COLUMN created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP AFTER status;

ALTER TABLE hsn_codes
ADD CONSTRAINT uk_hsn_code UNIQUE (hsn_code);

GO

ALTER TABLE gst_rates
ADD COLUMN gst_percentage DECIMAL(5,2) AFTER gst_name,
ADD COLUMN status ENUM('Active','Inactive') DEFAULT 'Active' AFTER igst,
ADD COLUMN created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP AFTER status;

GO

ALTER TABLE tax_groups
ADD COLUMN tax_code VARCHAR(20) UNIQUE AFTER id,
ADD COLUMN gst_percentage DECIMAL(5,2) AFTER igst,
ADD COLUMN status ENUM('Active','Inactive') DEFAULT 'Active' AFTER gst_percentage,
ADD COLUMN created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP AFTER status;
GO

ALTER TABLE suppliers
ADD COLUMN created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP AFTER status;

GO

ALTER TABLE customers
ADD COLUMN created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP AFTER status;

GO

ALTER TABLE doctors
ADD COLUMN doctor_code VARCHAR(20) UNIQUE AFTER id,
ADD COLUMN email VARCHAR(100) AFTER mobile,
ADD COLUMN created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP AFTER status;

GO

ALTER TABLE medicines
ADD COLUMN tax_group_id INT NULL AFTER gst_id,
ADD COLUMN warehouse_id INT NULL AFTER rack_id,

ADD COLUMN purchase_price DECIMAL(12,2) DEFAULT 0 AFTER reorder_level,
ADD COLUMN mrp DECIMAL(12,2) DEFAULT 0 AFTER purchase_price,
ADD COLUMN retail_price DECIMAL(12,2) DEFAULT 0 AFTER mrp,
ADD COLUMN wholesale_price DECIMAL(12,2) DEFAULT 0 AFTER retail_price,

ADD COLUMN opening_stock DECIMAL(12,2) DEFAULT 0 AFTER wholesale_price,

ADD COLUMN remarks VARCHAR(255) NULL AFTER opening_stock,

ADD CONSTRAINT fk_medicine_taxgroup
FOREIGN KEY (tax_group_id) REFERENCES tax_groups(id),

ADD CONSTRAINT fk_medicine_warehouse
FOREIGN KEY (warehouse_id) REFERENCES warehouses(id);

GO


ALTER TABLE medicine_batches

ADD supplier_id INT NULL AFTER warehouse_id,

ADD purchase_id INT NULL AFTER supplier_id,

ADD barcode VARCHAR(100) NULL AFTER batch_no,

ADD remarks VARCHAR(255) NULL AFTER batch_status,

ADD updated_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP
ON UPDATE CURRENT_TIMESTAMP;

Go

ALTER TABLE medicine_batches

ADD CONSTRAINT fk_batch_supplier
FOREIGN KEY (supplier_id)
REFERENCES suppliers(id);

ALTER TABLE medicine_batches

ADD CONSTRAINT fk_batch_purchase
FOREIGN KEY (purchase_id)
REFERENCES purchases(id);

GO

ALTER TABLE stock_ledger

MODIFY COLUMN transaction_type ENUM(
'Opening',
'Purchase',
'Purchase Return',
'Sale',
'Sales Return',
'Adjustment',
'Transfer In',
'Transfer Out',
'Damage',
'Expired'
);

GO



ALTER TABLE sale_items
ADD COLUMN batch_no VARCHAR(50) AFTER batch_id;

GO



ALTER TABLE sale_return_items
ADD COLUMN base_return_qty INT NOT NULL DEFAULT 0 AFTER return_qty,
ADD COLUMN remarks VARCHAR(255) NULL AFTER amount;

GO


