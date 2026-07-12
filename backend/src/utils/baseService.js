const db = require("../config/db");

class BaseService {

    constructor(tableName) {
        this.tableName = tableName;
    }

    async getAll(searchColumn, search = "", page = 1, limit = 10) {

        page = parseInt(page) || 1;
        limit = parseInt(limit) || 10;

        const offset = (page - 1) * limit;
        const searchText = `%${search}%`;

        const [rows] = await db.execute(
            `SELECT *
             FROM ${this.tableName}
             WHERE ${searchColumn} LIKE ?
             ORDER BY id DESC
             LIMIT ${limit} OFFSET ${offset}`,
            [searchText]
        );

        const [count] = await db.execute(
            `SELECT COUNT(*) total
             FROM ${this.tableName}
             WHERE ${searchColumn} LIKE ?`,
            [searchText]
        );

        return {
            total: count[0].total,
            data: rows
        };
    }

}

module.exports = BaseService;