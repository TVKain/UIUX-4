import { url } from '../../config/constants';

import axios from 'axios';

import { InvoiceApartment } from './types';

interface CreateInvoiceForApartmentsRequest
  extends Omit<Omit<InvoiceApartment, 'id'>, 'ApartmentId'> {
  ApartmentIds: number[];
}

async function createInvoiceForApartments(
  createInvoiceApartmentRequest: CreateInvoiceForApartmentsRequest,
) {
  const result = await axios.post(
    `${url}/invoice-apartments/apartments`,
    createInvoiceApartmentRequest,
  );
  return result.data;
}

export type { CreateInvoiceForApartmentsRequest };
export { createInvoiceForApartments };
