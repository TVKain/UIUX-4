import InvoiceApartmentPaymentService from "../../../service/InvoiceApartmentPaymentService.js";

import apartment1 from "./payment-data/apartment-1.js";
import apartment2 from "./payment-data/apartment-2.js";
import apartment4 from "./payment-data/apartment-4.js";
import apartment5 from "./payment-data/apartment-5.js";
import apartment15 from "./payment-data/apartment-15.js";
import apartment28 from "./payment-data/apartment-28.js";
import apartment30 from "./payment-data/apartment-30.js";
import apartment20 from "./payment-data/apartment-20.js";

export default async function seedInvoiceApartmentPayment() {
  for (let invoiceApartmentPayment of apartment1) {
    InvoiceApartmentPaymentService.createInvoiceApartmentPayment(
      invoiceApartmentPayment
    );
  }

  for (let invoiceApartmentPayment of apartment2) {
    InvoiceApartmentPaymentService.createInvoiceApartmentPayment(
      invoiceApartmentPayment
    );
  }

  for (let invoiceApartmentPayment of apartment15) {
    InvoiceApartmentPaymentService.createInvoiceApartmentPayment(
      invoiceApartmentPayment
    );
  }

  for (let invoiceApartmentPayment of apartment28) {
    InvoiceApartmentPaymentService.createInvoiceApartmentPayment(
      invoiceApartmentPayment
    );
  }

  for (let invoiceApartmentPayment of apartment30) {
    InvoiceApartmentPaymentService.createInvoiceApartmentPayment(
      invoiceApartmentPayment
    );
  }

  for (let invoiceApartmentPayment of apartment20) {
    InvoiceApartmentPaymentService.createInvoiceApartmentPayment(
      invoiceApartmentPayment
    );
  }

  for (let invoiceApartmentPayment of apartment4) {
    InvoiceApartmentPaymentService.createInvoiceApartmentPayment(
      invoiceApartmentPayment
    );
  }

  for (let invoiceApartmentPayment of apartment5) {
    InvoiceApartmentPaymentService.createInvoiceApartmentPayment(
      invoiceApartmentPayment
    );
  }
}
