import { ApartmentFull } from '../apartment/types';

import { Invoice } from '../invoice/types';

interface InvoiceApartment {
  id: number;
  period: string;
  amount: number;
  ApartmentId: number;
  InvoiceId: number;
}

interface InvoiceApartmentFull extends InvoiceApartment {
  Apartment: ApartmentFull;
  Invoice: Invoice;
}

export type { InvoiceApartment, InvoiceApartmentFull };
