class GstEngineService {

    calculateGST(amount, gstPercent, stateType = "Local") {

        let cgst = 0;
        let sgst = 0;
        let igst = 0;

        if (stateType === "Local") {

            cgst = (amount * gstPercent / 100) / 2;
            sgst = (amount * gstPercent / 100) / 2;

        } else {

            igst = amount * gstPercent / 100;

        }

        return {

            taxableAmount: amount,

            cgst,

            sgst,

            igst,

            gstAmount: cgst + sgst + igst,

            grandTotal:
                amount + cgst + sgst + igst

        };

    }

}

module.exports = new GstEngineService();