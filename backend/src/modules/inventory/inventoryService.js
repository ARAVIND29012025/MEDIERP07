const medicineBatchRepository = require("../medicineBatch/medicineBatchRepository");
const stockLedgerRepository = require("../stockLedger/stockLedgerRepository");

class InventoryService {

    // =====================================
    // FEFO Allocation
    // =====================================
    async allocateStock(connection, medicineId, warehouseId, requiredQty) {

        const batches =
            await medicineBatchRepository.findAvailableBatches(
                connection,
                medicineId,
                warehouseId
            );

        if (!batches.length) {
            throw new Error("Stock not available");
        }

        let balanceQty = requiredQty;
        const allocations = [];

        for (const batch of batches) {

            if (balanceQty <= 0) break;

            const allocated = Math.min(
                batch.current_stock,
                balanceQty
            );

            allocations.push({
                batchId: batch.id,
                batchNo: batch.batch_no,
                allocatedQty: allocated,
                remainingStock: batch.current_stock - allocated
            });

            balanceQty -= allocated;
        }

        if (balanceQty > 0) {
            throw new Error("Insufficient Stock");
        }

        return allocations;
    }

    // =====================================
    // Increase Stock
    // =====================================
    async increaseStock(connection, data) {

        await medicineBatchRepository.increaseStock(
            connection,
            data.batchId,
            data.qty
        );

        await stockLedgerRepository.addEntry(
            connection,
            {
                medicine_id: data.medicineId,
                batch_id: data.batchId,
                warehouse_id: data.warehouseId,
                transaction_type: data.transactionType,
                reference_table: data.referenceTable,
                reference_id: data.referenceId,
                qty_in: data.qty,
                qty_out: 0,
                balance_qty: data.balanceQty,
                remarks: data.remarks,
                created_by: data.createdBy
            }
        );

    }

    // =====================================
    // Decrease Stock
    // =====================================
    async decreaseStock(connection, data) {

        await medicineBatchRepository.decreaseStock(
            connection,
            data.batchId,
            data.qty
        );

        await stockLedgerRepository.addEntry(
            connection,
            {
                medicine_id: data.medicineId,
                batch_id: data.batchId,
                warehouse_id: data.warehouseId,
                transaction_type: data.transactionType,
                reference_table: data.referenceTable,
                reference_id: data.referenceId,
                qty_in: 0,
                qty_out: data.qty,
                balance_qty: data.balanceQty,
                remarks: data.remarks,
                created_by: data.createdBy
            }
        );

    }

}

module.exports = new InventoryService();