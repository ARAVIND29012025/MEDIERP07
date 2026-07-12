const db = require("../../config/db");

const purchaseRepository = require("./purchaseRepository");
const medicineBatchRepository = require("../medicineBatch/medicineBatchRepository");
const stockLedgerService = require("../stockLedger/stockLedgerService");

class PurchaseService {

    async savePurchase(data) {

        const connection = await db.getConnection();

        try {

            await connection.beginTransaction();

            const header = data.header;
            const items = data.items;

            // Save Purchase Header
            const purchaseId = await purchaseRepository.insertPurchase(
                connection,
                header
            );

            // Process Each Item
            for (const item of items) {

                let batchId = item.batch_id;

                // Check existing batch
                const existingBatch =
                    await medicineBatchRepository.findBatch(
                        connection,
                        item.medicine_id,
                        item.batch_no
                    );

                if (existingBatch) {

                    batchId = existingBatch.id;

                    await medicineBatchRepository.increaseStock(
                        connection,
                        batchId,
                        item.total_base_qty
                    );

                } else {

                    batchId =
                        await medicineBatchRepository.createBatch(
                            connection,
                            {
                                medicine_id: item.medicine_id,
                                warehouse_id: header.warehouse_id,
                                batch_no: item.batch_no,
                                manufacture_date: item.manufacture_date,
                                expiry_date: item.expiry_date,
                                purchase_rate: item.purchase_rate,
                                ptr: item.ptr,
                                pts: item.pts,
                                retail_rate: item.retail_rate,
                                wholesale_rate: item.wholesale_rate,
                                mrp: item.mrp,
                                gst_percent: item.gst_percent,
                                discount_percent: item.discount_percent,
                                opening_stock: item.total_base_qty,
                                current_stock: item.total_base_qty,
                                reserved_stock: 0,
                                damaged_stock: 0,
                                expired_stock: 0,
                                batch_status: "Active"
                            }
                        );

                }

                // Save Purchase Item
                item.batch_id = batchId;

                await purchaseRepository.insertPurchaseItem(
                    connection,
                    purchaseId,
                    item
                );

                // Stock Ledger Entry
                await stockLedgerService.addEntry(
                    connection,
                    {
                        medicine_id: item.medicine_id,
                        batch_id: batchId,
                        warehouse_id: header.warehouse_id,
                        transaction_type: "Purchase",
                        reference_table: "purchases",
                        reference_id: purchaseId,
                        qty_in: item.total_base_qty,
                        qty_out: 0,
                        balance_qty: item.total_base_qty,
                        remarks: "Purchase Entry",
                        created_by: header.created_by
                    }
                );

            }

            await connection.commit();

            return {

                success: true,

                purchaseId,

                message: "Purchase Saved Successfully"

            };

        } catch (err) {

            await connection.rollback();

            throw err;

        } finally {

            connection.release();

        }

    }
       
    
    async getAllPurchases() {

    return await purchaseRepository.getAllPurchases();

}

}

module.exports = new PurchaseService();