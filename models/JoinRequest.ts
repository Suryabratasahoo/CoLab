import mongoose, { Schema, Types, model, models } from "mongoose"

export type JoinRequestStatus = "pending" | "accepted" | "rejected"

const JoinRequestSchema = new Schema(
  {
    /* 🔗 Relations */
    postId: {
      type: Types.ObjectId,
      ref: "Post",
      required: true,
      index: true,
    },

    ownerId: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    requesterId: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    teamId: {
      type: Types.ObjectId,
      ref: "Team",
      required: true,
    },

    /* 📝 Content */
    message: {
      type: String,
      required: true,
      maxlength: 500,
    },

    /* 🔄 State */
    status: {
      type: String,
      enum: ["pending", "accepted", "rejected"],
      default: "pending",
      index: true,
    },

    /* 🧠 Metadata */
    decidedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
)

/* ==========================
   SAFETY INDEXES
========================== */

// 🚫 Prevent duplicate requests
JoinRequestSchema.index(
  { postId: 1, requesterId: 1 },
  { unique: true }
)

// 🚀 Fast inbox queries
JoinRequestSchema.index({ ownerId: 1, status: 1 })
JoinRequestSchema.index({ requesterId: 1, status: 1 })

export default models.JoinRequest ||
  model("JoinRequest", JoinRequestSchema)
