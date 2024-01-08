import Notification from "../../models/notification/Notification.js";

import User from "../../models/user/User.js";

const NotificationService = {
  async getAllNotifications() {
    try {
      return await Notification.findAll({
        include: [User],
      });
    } catch (error) {
      console.log(error);
    }
  },

  async createNotification(notification) {
    return await Notification.create(notification);
  },
};

export default NotificationService;
