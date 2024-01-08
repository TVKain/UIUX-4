import { User } from '../user/types';

interface Notification {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  UserId: number;
}

interface NotificationFull extends Notification {
  User: User;
}

export type { Notification, NotificationFull };
