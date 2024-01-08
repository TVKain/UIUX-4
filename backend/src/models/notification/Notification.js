import { DataTypes } from "sequelize";
import { sequelize } from "../../config/database.js";

import User from "../user/User.js";
import { create } from "domain";

const Notification = sequelize.define("Notification", {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: false,
  },
  content: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    unique: false,
    defaultValue: DataTypes.NOW,
  },
});

User.hasMany(Notification);
Notification.belongsTo(User);

export default Notification;
