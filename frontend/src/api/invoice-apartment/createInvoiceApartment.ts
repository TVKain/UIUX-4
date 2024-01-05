import { InvoiceApartment } from './types';

import axios from 'axios';
import { url } from '../../config/constants';

interface CreateInvoiceApartmentRequest extends Omit<InvoiceApartment, 'id'> {}

async function createInvoiceApartment(
  createInvoiceApartmentRequest: CreateInvoiceApartmentRequest,
): Promise<InvoiceApartment> {
  const result = await axios.post(`${url}/invoice-apartments`, createInvoiceApartmentRequest);

  return result.data;
}

export { createInvoiceApartment };
export type { CreateInvoiceApartmentRequest };
