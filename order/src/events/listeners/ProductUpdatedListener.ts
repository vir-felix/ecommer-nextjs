import { Message } from "node-nats-streaming";
import mongoose from "mongoose";
import {
  Subjects,
  Listener,
  ProductUpdatedEvent,
  NotFoundError,
  QueueGroupNames,
} from "@thasup-dev/common";
import { Product } from "../../models/product";

export class ProductUpdatedListener extends Listener<ProductUpdatedEvent> {
  subject: Subjects.ProductUpdated = Subjects.ProductUpdated;
  queueGroupName = QueueGroupNames.ORDER_SERVICE;

  async onMessage(data: ProductUpdatedEvent["data"], msg: Message) {
    let product;

    try {
      product = await Product.findByEvent(data);
    } catch (err) {
      console.log(err);
    }

    if (!product) {
      throw new NotFoundError();
    }

    const { id, title, price, image, colors, sizes, countInStock } = data;

    product.set({ id, title, price, image, colors, sizes, countInStock });
    await product.save();

    // Acknowledge the message and tell NATS server it successfully processed
    msg.ack();
  }
}
