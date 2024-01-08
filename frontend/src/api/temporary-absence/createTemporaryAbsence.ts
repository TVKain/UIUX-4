import { TemporaryAbsence } from './types';

import { url } from '../../config/constants';

import axios from 'axios';

interface CreateTemporaryAbsenceRequest extends Omit<TemporaryAbsence, 'id'> {}

async function createTemporaryAbsence(
  data: CreateTemporaryAbsenceRequest,
): Promise<CreateTemporaryAbsenceRequest> {
  const result = await axios.post<CreateTemporaryAbsenceRequest>(
    `${url}/temporary-residences`,
    data,
  );

  return result.data;
}

export type { CreateTemporaryAbsenceRequest };
export { createTemporaryAbsence };
