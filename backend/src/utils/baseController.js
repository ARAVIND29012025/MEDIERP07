const response = require("../helpers/responseHelper");

class BaseController {

    constructor(service, searchColumn) {

        this.service = service;

        this.searchColumn = searchColumn;

    }

    getAll = async (req, res) => {

        try {

            const result = await this.service.getAll(

                this.searchColumn,

                req.query.search,

                req.query.page,

                req.query.limit

            );

            return response.success(

                res,

                "Data Retrieved Successfully",

                result

            );

        } catch (err) {

            console.log(err);

            return response.error(

                res,

                "Internal Server Error"

            );

        }

    }

}

module.exports = BaseController;