const pricingRepository =
require("./pricingRepository");

class PricingService {

    async getSellingPrice(

        medicineId,

        warehouseId,

        customerType

    ) {

        const batch =
            await pricingRepository.getBatchPrice(

                medicineId,

                warehouseId

            );

        if (!batch)
            throw new Error("Price not available");

        switch(customerType){

            case "Wholesale":
                return batch.wholesale_rate;

            case "Hospital":
                return batch.ptr;

            case "Distributor":
                return batch.pts;

            default:
                return batch.retail_rate;

        }

    }

}

module.exports = new PricingService();