import { Router } from "express";

import InvoiceApartmentService from "../service/InvoiceApartmentService.js";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const result = await InvoiceApartmentService.getInvoiceApartments();
    res.send(result);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post("/apartments", async (req, res) => {
  try {
    const result = await InvoiceApartmentService.createInvoiceForApartments(
      req.body
    );
    res.send(result);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.post("/", async (req, res) => {
  try {
    console.log(req.body);
    const result = await InvoiceApartmentService.createInvoiceApartment(
      req.body
    );
    res.send(result);
  } catch (error) {
    res.status(500).send(error);
  }
});

export default router;
