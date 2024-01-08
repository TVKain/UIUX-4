import { Router } from "express";

import NotificationService from "../../service/notification/NotficationService.js";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const result = await NotificationService.getAllNotifications();
    res.send(result);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.post("/", async (req, res) => {
  try {
    const result = await NotificationService.createNotification(req.body);
    res.send(result);
  } catch (err) {
    res.status(500).send(err);
  }
});

export default router;
