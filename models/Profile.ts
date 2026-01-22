// models/Profile.ts
import mongoose, { Schema, Document, Types } from "mongoose";

export interface IProfile extends Document {
  user: Types.ObjectId;
  fullName: string;
  collegeEmail: string;
  year: string;
  branch: string;
  skills: string[];
  role?: string;
  availability: "weekdays" | "weekends" | "flexible";
  commitment: "casual" | "serious" | "all-in";
  github?: string;
  linkedin?: string;
  bio?: string;
  interests: string[];
  openToTeams: boolean;
}

const ProfileSchema = new Schema<IProfile>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true, // one profile per user
    },

    fullName: {
      type: String,
      required: true,
      trim: true,
    },

    collegeEmail: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },

    year: {
      type: String,
      required: true,
    },

    branch: {
      type: String,
      required: true,
    },

    skills: {
      type: [String],
      default: [],
    },

    role: {
      type: String,
    },

    availability: {
      type: String,
      enum: ["weekdays", "weekends", "flexible"],
      default: "flexible",
    },

    commitment: {
      type: String,
      enum: ["casual", "serious", "all-in"],
      default: "serious",
    },

    github: String,
    linkedin: String,

    bio: {
      type: String,
      maxlength: 150,
    },

    interests: {
      type: [String],
      default: [],
    },

    openToTeams: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Profile ||
  mongoose.model<IProfile>("Profile", ProfileSchema);
