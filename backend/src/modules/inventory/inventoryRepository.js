class InventoryRepository {

    async increaseBatchStock(
        connection,
        batchId,
        qty
    ) {

        await connection.execute(

            `UPDATE medicine_batches

            SET current_stock=current_stock+?

            WHERE id=?`,

            [
                qty,
                batchId
            ]

        );

    }

    async decreaseBatchStock(
        connection,
        batchId,
        qty
    ) {

        await connection.execute(

            `UPDATE medicine_batches

            SET current_stock=current_stock-?

            WHERE id=?`,

            [
                qty,
                batchId
            ]

        );

    }

}

module.exports = new InventoryRepository();