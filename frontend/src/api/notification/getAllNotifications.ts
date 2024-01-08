import axios from 'axios';
import { NotificationFull } from './types';

import { url } from '../../config/constants';

const getAllNotifications = async (): Promise<NotificationFull[]> => {
  const response = await axios.get<NotificationFull[]>(`${url}/notifications`);
  return response.data;
};

export { getAllNotifications };
