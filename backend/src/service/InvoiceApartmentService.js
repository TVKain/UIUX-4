import Invoice from "../models/invoice/Invoice.js";
import InvoiceApartment from "../models/invoice/InvoiceApartment.js";

import Apartment from "../models/building/Apartment.js";
import Building from "../models/building/Building.js";

const InvoiceApartmentService = {
  createInvoiceForApartments: async (data) => {
    const invoiceApartments = [];

    console.log(data);
    for (let apartmentId of data.ApartmentIds) {
      const invoiceApartment = {
        ApartmentId: apartmentId,
        InvoiceId: data.InvoiceId,
        period: data.period,
        amount: data.amount,
      };

      invoiceApartments.push(invoiceApartment);
    }

    const result = await InvoiceApartment.bulkCreate(invoiceApartments);

    return result;
  },

  createInvoiceApartment: async (data) => {
    const result = await InvoiceApartment.create(data);

    return result;
  },

  getInvoiceApartments: async () => {
    const result = await InvoiceApartment.findAll({
      include: [
        {
          model: Apartment,
          include: {
            model: Building,
          },
        },
        Invoice,
      ],
    });

    return result;
  },
};

export default InvoiceApartmentService;
