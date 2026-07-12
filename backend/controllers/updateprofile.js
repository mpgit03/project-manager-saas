import { asynchandler } from "../middleware/asynchandler.js";
import User from "../models/User.js";

import { logActivity } from "../services/activityService.js";
import {
  ACTIVITY_EVENTS,
  ENTITY_TYPES,
} from "../constants/activity.js";

export const updateprofile = asynchandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }

  user.name = req.body.name || user.name;
  user.email = req.body.email || user.email;

  if (req.body.password) {
    user.password = req.body.password;
  }

  await user.save();

  await logActivity({
    user: req.user._id,
    event: ACTIVITY_EVENTS.PROFILE_UPDATED,
    entityType: ENTITY_TYPES.USER,
    entityId: user._id,
    entityName: user.name,
    metadata: {
      updatedFields: Object.keys(req.body),
    },
  });

  const updatedUser = await User.findById(user._id).select("-password");

  res.status(200).json({
    success: true,
    user: updatedUser,
  });
});