import express, { Request, Response } from "express";
import { requireAuth } from "@thasup-dev/common";
import { Order } from "../models/order";

const router = express.Router();

router.get("/api/orders", requireAuth, async (req: Request, res: Response) => {
  let orders;

  if (req.currentUser?.isAdmin !== true) {
    orders = await Order.find({
      userId: req.currentUser!.id,
    }).populate("product");
  } else {
    orders = await Order.find({}).populate("product");
  }

  res.send(orders);
});

export { router as showOrderRouter };