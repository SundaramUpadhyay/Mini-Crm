import mongoose from "mongoose"

const CommunicationLogSchema = new mongoose.Schema(
  {
    messageId: {
      type: String,
      unique: true,
      sparse: true,
    },
    campaignId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Campaign",
      required: true,
    },
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
      required: true,
    },
    status: {
      type: String,
      enum: ["sent", "failed", "delivered", "pending"],
      required: true,
    },
    failureReason: {
      type: String,
    },
    timestamp: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  },
)

export default mongoose.models.CommunicationLog || mongoose.model("CommunicationLog", CommunicationLogSchema)
