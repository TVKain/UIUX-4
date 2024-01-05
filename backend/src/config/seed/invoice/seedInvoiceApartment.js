import Apartment from "../../../models/building/Apartment.js";
import InvoiceApartmentService from "../../../service/InvoiceApartmentService.js";

export default async function seedInvoiceApartment() {
  const invoiceApartments = [
    { ApartmentId: 15, InvoiceId: 23, period: "monthly", amount: 250000 },
    { ApartmentId: 8, InvoiceId: 30, period: "quarterly", amount: 150000 },
    { ApartmentId: 10, InvoiceId: 12, period: "yearly", amount: 420000 },
    { ApartmentId: 4, InvoiceId: 18, period: "quarterly", amount: 180000 },
    { ApartmentId: 7, InvoiceId: 41, period: "monthly", amount: 320000 },
    { ApartmentId: 12, InvoiceId: 9, period: "yearly", amount: 480000 },
    { ApartmentId: 19, InvoiceId: 35, period: "monthly", amount: 290000 },
    { ApartmentId: 2, InvoiceId: 6, period: "quarterly", amount: 120000 },
    { ApartmentId: 18, InvoiceId: 15, period: "monthly", amount: 280000 },
    { ApartmentId: 5, InvoiceId: 29, period: "yearly", amount: 490000 },
    { ApartmentId: 14, InvoiceId: 3, period: "monthly", amount: 270000 },
    { ApartmentId: 11, InvoiceId: 8, period: "quarterly", amount: 160000 },
    { ApartmentId: 3, InvoiceId: 22, period: "yearly", amount: 450000 },
    { ApartmentId: 6, InvoiceId: 14, period: "quarterly", amount: 200000 },
    { ApartmentId: 1, InvoiceId: 37, period: "monthly", amount: 310000 },
    { ApartmentId: 17, InvoiceId: 20, period: "yearly", amount: 470000 },
    { ApartmentId: 9, InvoiceId: 11, period: "monthly", amount: 260000 },
    { ApartmentId: 13, InvoiceId: 44, period: "quarterly", amount: 130000 },
    { ApartmentId: 20, InvoiceId: 25, period: "yearly", amount: 430000 },
    { ApartmentId: 16, InvoiceId: 2, period: "monthly", amount: 240000 },
    { ApartmentId: 8, InvoiceId: 17, period: "quarterly", amount: 170000 },
    { ApartmentId: 5, InvoiceId: 33, period: "yearly", amount: 460000 },
    { ApartmentId: 14, InvoiceId: 7, period: "monthly", amount: 230000 },
    { ApartmentId: 10, InvoiceId: 21, period: "quarterly", amount: 140000 },
    { ApartmentId: 3, InvoiceId: 39, period: "yearly", amount: 500000 },
    { ApartmentId: 16, InvoiceId: 16, period: "monthly", amount: 220000 },
    { ApartmentId: 12, InvoiceId: 32, period: "quarterly", amount: 190000 },
    { ApartmentId: 1, InvoiceId: 28, period: "monthly", amount: 300000 },
    { ApartmentId: 19, InvoiceId: 24, period: "quarterly", amount: 110000 },
    { ApartmentId: 1, InvoiceId: 5, period: "monthly", amount: 290000 },
    { ApartmentId: 2, InvoiceId: 5, period: "monthly", amount: 320000 },
    { ApartmentId: 3, InvoiceId: 5, period: "monthly", amount: 250000 },
    { ApartmentId: 4, InvoiceId: 5, period: "monthly", amount: 300000 },
    { ApartmentId: 5, InvoiceId: 5, period: "monthly", amount: 270000 },
    { ApartmentId: 6, InvoiceId: 5, period: "monthly", amount: 310000 },
    { ApartmentId: 7, InvoiceId: 5, period: "monthly", amount: 280000 },
    { ApartmentId: 8, InvoiceId: 5, period: "monthly", amount: 330000 },
    { ApartmentId: 9, InvoiceId: 5, period: "monthly", amount: 260000 },
    { ApartmentId: 10, InvoiceId: 5, period: "monthly", amount: 320000 },
    { ApartmentId: 11, InvoiceId: 5, period: "monthly", amount: 290000 },
    { ApartmentId: 12, InvoiceId: 5, period: "monthly", amount: 340000 },
    { ApartmentId: 13, InvoiceId: 5, period: "monthly", amount: 310000 },
    { ApartmentId: 14, InvoiceId: 5, period: "monthly", amount: 270000 },
    { ApartmentId: 15, InvoiceId: 5, period: "monthly", amount: 330000 },
    { ApartmentId: 16, InvoiceId: 5, period: "monthly", amount: 300000 },
    { ApartmentId: 17, InvoiceId: 5, period: "monthly", amount: 260000 },
    { ApartmentId: 18, InvoiceId: 5, period: "monthly", amount: 320000 },
    { ApartmentId: 19, InvoiceId: 5, period: "monthly", amount: 290000 },
    { ApartmentId: 20, InvoiceId: 5, period: "monthly", amount: 340000 },
  ];

  for (let invoiceApartment of invoiceApartments) {
    InvoiceApartmentService.createInvoiceApartment(invoiceApartment);
  }

  return;
}
