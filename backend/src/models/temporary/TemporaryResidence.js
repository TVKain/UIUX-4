import { DataTypes } from "sequelize";
import { sequelize } from "../../config/database.js";

import UserInfo from "../user/UserInfo.js";

const TemporaryResidence = sequelize.define("TemporaryResidence", {
  startDate: {
    type: DataTypes.DATEONLY,
    allowNull: false,
    unique: false,
  },
  permanentAddress: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: false,
  },
  currentAddress: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: false,
  },

  reason: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: false,
  },
});

UserInfo.hasMany(TemporaryResidence);
TemporaryResidence.belongsTo(UserInfo);

export default TemporaryResidence;
