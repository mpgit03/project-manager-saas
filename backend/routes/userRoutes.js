import express from "express";

import { getMe }
from "../controllers/authController.js";

import { protect }
from "../middleware/authMiddleware.js";

import { updateprofile }
from "../controllers/updateprofile.js";

import { getDashboardStats }
from "../controllers/dashboardController.js";

const router = express.Router();

router.get(
  "/getme",
  protect,
  getMe
);

router.put(
  "/profile",
  protect,
  updateprofile
);

router.get(
  "/dashboard-stats",
  protect,
  getDashboardStats
);

export default router;