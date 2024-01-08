import { sequelize } from "../../config/database.js";

import { DataTypes } from "sequelize";

import Invoice from "./Invoice.js";
import Apartment from "../building/Apartment.js";

const InvoiceApartment = sequelize.define("InvoiceApartment", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  period: {
    type: DataTypes.ENUM("monthly", "quarterly", "yearly", "onetime"),
    allowNull: false,
  },
  amount: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
});

Invoice.belongsToMany(Apartment, { through: InvoiceApartment });
Apartment.belongsToMany(Invoice, { through: InvoiceApartment });

InvoiceApartment.belongsTo(Invoice);
InvoiceApartment.belongsTo(Apartment);

export default InvoiceApartment;
