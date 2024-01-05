import Role from "../models/user/Role.js";
import User from "../models/user/User.js";
import UserRole from "../models/user/UserRole.js";
import UserInfo from "../models/user/UserInfo.js";
import Request from "../models/request/Request.js";

import seedRole from "./seed/seedRole.js";
import seedUser from "./seed/seedUser.js";
import Apartment from "../models/building/Apartment.js";
import Building from "../models/building/Building.js";

import Invoice from "../models/invoice/Invoice.js";
import InvoiceApartment from "../models/invoice/InvoiceApartment.js";
import InvoiceApartmentPayment from "../models/invoice/InvoiceApartmentPayment.js";

import seedBuilding from "./seed/seedBuilding.js";
import seedApartment from "./seed/seedApartment.js";
import seedRequest from "./seed/seedRequest.js";

import seedUserInfo from "./seed/seedUserInfo.js";

import seedInvoice from "./seed/invoice/seedInvoice.js";

import seedInvoiceApartment from "./seed/invoice/seedInvoiceApartment.js";

import seedInvoiceApartmentPayment from "./seed/invoice/seedInvoiceApartmentPayment.js";

export async function synchronizeDatabase() {
  await Role.sync({ force: true });

  await User.sync({ force: true });
  await UserInfo.sync({ force: true });
  await UserRole.sync({ force: true });

  await Building.sync({ force: true });
  await Apartment.sync({ force: true });

  await Request.sync({ force: true });

  await Invoice.sync({ force: true });
  await InvoiceApartment.sync({ force: true });
  await InvoiceApartmentPayment.sync({ force: true });

  await seedDatabase();
  console.log("Database synchronized successfully.");
}

export async function seedDatabase() {
  await seedRole();
  await seedUser();
  await seedBuilding();
  await seedApartment();
  await seedUserInfo();
  await seedRequest();
  await seedInvoice();
  await seedInvoiceApartment();
  await seedInvoiceApartmentPayment();
}
