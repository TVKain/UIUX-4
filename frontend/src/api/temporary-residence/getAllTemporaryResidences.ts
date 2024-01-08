import { TemporaryResidenceFull } from './types';

import { url } from '../../config/constants';

import axios from 'axios';

async function getAllTemporaryResidences(): Promise<TemporaryResidenceFull[]> {
  const result = await axios.get<TemporaryResidenceFull[]>(`${url}/temporary-residences`);

  return result.data;
}

export { getAllTemporaryResidences };
export type { TemporaryResidenceFull };
