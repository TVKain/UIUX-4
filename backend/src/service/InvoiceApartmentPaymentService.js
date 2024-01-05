import Invoice from "../models/invoice/Invoice.js";
import InvoiceApartment from "../models/invoice/InvoiceApartment.js";

import Apartment from "../models/building/Apartment.js";
import Building from "../models/building/Building.js";

import InvoiceApartmentPayment from "../models/invoice/InvoiceApartmentPayment.js";

const InvoiceApartmentPaymentService = {
  createInvoiceApartmentPayment: async (data) => {
    const result = await InvoiceApartmentPayment.create(data);

    return result;
  },

  getInvoiceApartmentPayments: async () => {
    const result = await InvoiceApartmentPayment.findAll({
      include: [
        {
          model: InvoiceApartment,
          include: [
            {
              model: Apartment,
              include: {
                model: Building,
              },
            },
            Invoice,
          ],
        },
      ],
    });

    return result;
  },
};

export default InvoiceApartmentPaymentService;
