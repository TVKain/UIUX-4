import { DataTypes } from "sequelize";
import { sequelize } from "../../config/database.js";

import UserInfo from "../user/UserInfo.js";

const TemporaryAbscene = sequelize.define("TemporaryAbscene", {
  startDate: {
    type: DataTypes.DATEONLY,
    allowNull: false,
    unique: false,
  },
  endDate: {
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
  destinationAddress: {
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

UserInfo.hasMany(TemporaryAbscene);
TemporaryAbscene.belongsTo(UserInfo);

export default TemporaryAbscene;
