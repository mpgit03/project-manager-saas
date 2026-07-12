// src/models/Activity.js

import mongoose from "mongoose";
import { ACTIVITY_EVENTS, ENTITY_TYPES } from "../constants/activity.js";

const activitySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    event: {
      type: String,
      required: true,
      enum: Object.values(ACTIVITY_EVENTS),
    },

    entityType: {
      type: String,
      required: true,
      enum: Object.values(ENTITY_TYPES),
    },

    entityId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },

    entityName: {
      type: String,
      required: true,
      trim: true,
    },

    metadata: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

activitySchema.index({ user: 1, createdAt: -1 });

const Activity = mongoose.model("Activity", activitySchema);

export default Activity;