import { Router } from "express";

import TemporaryResidenceService from "../../service/temporary/TemporaryResidenceService.js";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const result = await TemporaryResidenceService.getAll();
    res.send(result);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.post("/", async (req, res) => {
  try {
    const result = await TemporaryResidenceService.createTemporaryResidence(
      req.body
    );
    res.send(result);
  } catch (err) {
    res.status(500).send(err);
  }
});

export default router;
