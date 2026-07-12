const getPagination = (page = 1, limit = 10) => {

    page = parseInt(page) || 1;

    limit = parseInt(limit) || 10;

    return {

        page,

        limit,

        offset: (page - 1) * limit

    };

};

module.exports = {

    getPagination

};