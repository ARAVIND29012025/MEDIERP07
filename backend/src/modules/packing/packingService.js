const packingRepository =
require("./packingRepository");

class PackingService {

    async calculateBaseQuantity(
        medicineId,
        saleUnit,
        qty
    ) {

        const packing =
            await packingRepository.getPackingByUnit(

                medicineId,

                saleUnit

            );

        if (!packing) {

            throw new Error(

                "Packing not configured"

            );

        }

        return qty * packing.unit_qty;

    }

}

module.exports = new PackingService();