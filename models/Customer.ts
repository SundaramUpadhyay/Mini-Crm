import mongoose from "mongoose"

const CustomerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
      required: true,
    },
    profileImage: {
      type: String,
    },
    totalSpend: {
      type: Number,
      default: 0,
    },
    lastPurchaseDate: {
      type: Date,
    },
  },
  {
    timestamps: true,
  },
)

export default mongoose.models.Customer || mongoose.model("Customer", CustomerSchema)
