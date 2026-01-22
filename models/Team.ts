import mongoose, { Schema, models } from "mongoose"

const TeamMemberSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    role: {
      type: String,
      enum: ["owner", "member"],
      default: "member",
    },
    joinedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { _id: false }
)

const TeamSchema = new Schema(
  {
    postId: {
      type: Schema.Types.ObjectId,
      ref: "Post",
      required: true,
      unique: true, // 🔑 one team per post
    },

    owner:{
      type:Schema.Types.ObjectId,
      ref:"User",
      required:true,
    },

    name: {
      type: String,
      required: true, // copied from post.eventName
      trim: true,
    },

    category: {
      type: String,
      enum: ["Hackathon", "Group Project", "Startup"],
      required: true,
    },

    status: {
      type: String,
      enum: ["active", "completed"],
      default: "active",
    },

    members: {
      type: [TeamMemberSchema],
      required: true,
      validate: [(v: any[]) => v.length > 0, "Team must have at least one member"],
    },
  },
  {
    timestamps: true,
  }
)

export default models.Team || mongoose.model("Team", TeamSchema)
