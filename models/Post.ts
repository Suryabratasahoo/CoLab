import mongoose, { Schema, models } from "mongoose"

const PostSchema = new Schema(
  {
    ownerId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    teamId: {
      type: Schema.Types.ObjectId,
      ref: "Team",
      default: null,
    },

    category: {
      type: String,
      enum: ["Hackathon", "Group Project", "Startup"],
      required: true,
    },

    eventName: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
    },

    rolesNeeded: {
      type: String,
      required: true,
    },

    skills: {
      type: [String],
      default: [],
    },

    teamSize: {
      type: String,
      required: true,
    },

    commitmentLevel: {
      type: String,
      enum: ["Low", "Medium", "High"],
      required: true,
    },

    eventDate: {
      type: Date,
    },

    status: {
      type: String,
      enum: ["open", "closed"],
      default: "open",
      index: true,
    },

    isActive:{
      type: Boolean,
      default:true,
    }
  },
  { timestamps: true }
)

export default models.Post || mongoose.model("Post", PostSchema)
