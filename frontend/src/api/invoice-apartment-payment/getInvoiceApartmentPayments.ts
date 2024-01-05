import { url } from '../../config/constants';

import axios from 'axios';

import { InvoiceApartmentPayment } from './types';

interface GetInvoiceApartmentPaymentsResponse extends Array<InvoiceApartmentPayment> {}

async function getInvoiceApartmentPayments(): Promise<GetInvoiceApartmentPaymentsResponse> {
  const result = await axios.get<GetInvoiceApartmentPaymentsResponse>(
    `${url}/invoice-apartment-payments`,
  );

  return result.data;
}

export { getInvoiceApartmentPayments };
export type { GetInvoiceApartmentPaymentsResponse };
