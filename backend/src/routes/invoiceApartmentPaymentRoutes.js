import { Router } from "express";

import InvoiceApartmentPaymentService from "../service/InvoiceApartmentPaymentService.js";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const result =
      await InvoiceApartmentPaymentService.getInvoiceApartmentPayments();
    res.send(result);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post("/", async (req, res) => {
  try {
    console.log(req.body);
    const result = await InvoiceApartmentPaymentService.createInvoiceApartment(
      req.body
    );
    res.send(result);
  } catch (error) {
    res.status(500).send(error);
  }
});

export default router;
