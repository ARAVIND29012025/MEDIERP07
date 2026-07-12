const db = require("../../config/db");

const salesRepository = require("./salesRepository");
const inventoryService = require("../inventory/inventoryService");

class SalesService {

    async saveSale(data) {

        const connection = await db.getConnection();

        try {

            await connection.beginTransaction();

            const header = data.header;
            const items = data.items;

            // Save Sales Header
            const saleId =
                await salesRepository.insertSale(
                    connection,
                    header
                );

            // Process Each Medicine
            for (const item of items) {

                // Allocate stock using FEFO
                const allocations =
                    await inventoryService.allocateStock(
                        connection,
                        item.medicine_id,
                        header.warehouse_id,
                        item.base_quantity
                    );

                // One medicine may consume multiple batches
                for (const allocation of allocations) {

                    // Save Sale Item
                    await salesRepository.insertSaleItem(
                        connection,
                        saleId,
                        {
                            ...item,
                            batch_id: allocation.batchId,
                            quantity: allocation.allocatedQty,
                            base_quantity: allocation.allocatedQty
                        }
                    );

                    // Reduce stock and create ledger
                    await inventoryService.decreaseStock(
                        connection,
                        {
                            medicineId: item.medicine_id,
                            batchId: allocation.batchId,
                            warehouseId: header.warehouse_id,
                            qty: allocation.allocatedQty,
                            balanceQty: allocation.remainingStock,
                            transactionType: "Sale",
                            referenceTable: "sales",
                            referenceId: saleId,
                            remarks: "Sales Entry",
                            createdBy: header.created_by
                        }
                    );

                }

            }

            await connection.commit();

            return {

                success: true,

                saleId,

                message: "Sale Saved Successfully"

            };

        } catch (err) {

            await connection.rollback();

            throw err;

        } finally {

            connection.release();

        }

    }

    async getAllSales() {

        return await salesRepository.getAllSales();

    }

    async getSaleById(id) {

        const sale = await salesRepository.getSaleById(id);

        if (!sale) {

            return null;

        }

        const items = await salesRepository.getSaleItems(id);

        return {

            ...sale,
            items

        };

    }

}

module.exports = new SalesService();