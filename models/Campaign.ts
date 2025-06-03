import mongoose from "mongoose"

const CampaignSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    naturalLanguageRule: {
      type: String,
    },
    generatedRules: {
      type: String,
    },
    audienceSize: {
      type: Number,
      default: 0,
    },
    deliveryStats: {
      sent: {
        type: Number,
        default: 0,
      },
      failed: {
        type: Number,
        default: 0,
      },
    },
    status: {
      type: String,
      enum: ["active", "completed", "draft"],
      default: "draft",
    },
  },
  {
    timestamps: true,
  },
)

export default mongoose.models.Campaign || mongoose.model("Campaign", CampaignSchema)
