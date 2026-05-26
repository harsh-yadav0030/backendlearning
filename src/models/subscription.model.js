import mongoose, { Schema } from "mongoose";
const subscriptionSchema = new Schema(
  {
    subscriber: {
      type: Schema.Types.ObjectId, //subscriber is also a user
      ref: "User",
    },
    channel: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

export const Subscription = mongoose.model("Subscription", subscriptionSchema);
