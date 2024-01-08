import { sequelize } from "../../config/database.js";

import { DataTypes } from "sequelize";

import InvoiceApartment from "./InvoiceApartment.js";

const InvoiceApartmentPayment = sequelize.define("InvoiceApartmentPayment", {
  paidDate: {
    type: DataTypes.DATEONLY,
    allowNull: true,
  },
  amount: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  noticeDate: {
    type: DataTypes.DATEONLY,
    allowNull: true,
  },
});

InvoiceApartment.hasMany(InvoiceApartmentPayment);
InvoiceApartmentPayment.belongsTo(InvoiceApartment);

export default InvoiceApartmentPayment;
