import { InvoiceApartmentFull } from '../invoice-apartment/types';

interface InvoiceApartmentPayment {
  id: number;
  amount: number;
  noticeDate: string;
  paidDate: string;
  InvoiceApartmentId: number;
  InvoiceApartment: InvoiceApartmentFull;
}

export type { InvoiceApartmentPayment };
