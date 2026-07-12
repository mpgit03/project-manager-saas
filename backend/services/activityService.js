// src/services/activityService.js

import Activity from "../models/Activity.js";

export const logActivity = async ({
  user,
 event,
  entityType,
  entityId,
  entityName,
  metadata = {},
}) => {
  try {
    await Activity.create({
      user,
      event,
      entityType,
      entityId,
      entityName,
      metadata,
    });
  } catch (error) {
    console.error("Failed to log activity:", error);
  }
};