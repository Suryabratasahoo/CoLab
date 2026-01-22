import mongoose, { Schema, Document, Types } from "mongoose"

export interface INotification extends Document {
  type: "POST_CREATED"
  actor: Types.ObjectId        // user who triggered it
  post: Types.ObjectId         // related post
  message: string
//   isRead: boolean
  createdAt: Date
}

const NotificationSchema = new Schema<INotification>(
  {
    type: {
      type: String,
      enum: ["POST_CREATED"],
      required: true,
    },

    actor: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    post: {
      type: Schema.Types.ObjectId,
      ref: "Post",
      required: true,
    },

    message: {
      type: String,
      required: true,
    },

    // isRead: {
    //   type: Boolean,
    //   default: false,
    // },
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
  }
)

export default mongoose.models.Notification ||
  mongoose.model<INotification>("Notification", NotificationSchema)
