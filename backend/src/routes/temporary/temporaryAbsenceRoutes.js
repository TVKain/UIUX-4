import { Router } from "express";

import TemporaryAbscenceService from "../../service/temporary/TemporaryAbsenceService.js";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const result = await TemporaryAbscenceService.getAll();
    res.send(result);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.post("/", async (req, res) => {
  try {
    const result = await TemporaryAbscenceService.createTemporaryAbscence(
      req.body
    );
    res.send(result);
  } catch (err) {
    res.status(500).send(err);
  }
});

export default router;
