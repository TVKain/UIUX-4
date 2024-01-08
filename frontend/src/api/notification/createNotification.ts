import { Notification } from './types';

import axios from 'axios';

import { url } from '../../config/constants';

interface CreateNotificationRequest extends Omit<Omit<Notification, 'id'>, 'createdAt'> {}

const createNotification = async (
  notification: CreateNotificationRequest,
): Promise<CreateNotificationRequest> => {
  const response = await axios.post<CreateNotificationRequest>(
    `${url}/notifications`,
    notification,
  );
  return response.data;
};

export { createNotification };
export type { CreateNotificationRequest };
