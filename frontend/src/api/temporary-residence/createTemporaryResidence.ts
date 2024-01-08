import { TemporaryResidence } from './types';

import { url } from '../../config/constants';

import axios from 'axios';

interface CreateTemporaryResidenceRequest extends Omit<TemporaryResidence, 'id'> {}

async function createTemporaryResidence(
  data: CreateTemporaryResidenceRequest,
): Promise<CreateTemporaryResidenceRequest> {
  const result = await axios.post<CreateTemporaryResidenceRequest>(
    `${url}/temporary-residences`,
    data,
  );

  return result.data;
}

export type { CreateTemporaryResidenceRequest };
export { createTemporaryResidence };
