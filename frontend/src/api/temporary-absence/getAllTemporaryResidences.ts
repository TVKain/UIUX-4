import { TemporaryAbsenceFull } from './types';

import { url } from '../../config/constants';

import axios from 'axios';

async function getAllTemporaryAbsences(): Promise<TemporaryAbsenceFull[]> {
  const result = await axios.get<TemporaryAbsenceFull[]>(`${url}/temporary-absences`);

  return result.data;
}

export { getAllTemporaryAbsences };
export type { TemporaryAbsenceFull };
