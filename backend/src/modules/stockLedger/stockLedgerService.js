class StockLedgerRepository {

    async addEntry(connection, entry) {

        await connection.execute(
            `INSERT INTO stock_ledger
            (
                medicine_id,
                batch_id,
                warehouse_id,
                transaction_type,
                reference_table,
                reference_id,
                qty_in,
                qty_out,
                balance_qty,
                transaction_date,
                remarks,
                created_by
            )
            VALUES
            (?,?,?,?,?,?,?,?,?,NOW(),?,?)`,
            [
                entry.medicine_id,
                entry.batch_id,
                entry.warehouse_id,
                entry.transaction_type,
                entry.reference_table,
                entry.reference_id,
                entry.qty_in,
                entry.qty_out,
                entry.balance_qty,
                entry.remarks,
                entry.created_by
            ]
        );

    }

}

module.exports = new StockLedgerRepository();