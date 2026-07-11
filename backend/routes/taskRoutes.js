import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadmiddleware.js";

import {
  getUserTasks,
 
  updateTask,
  deleteTask,
  getProjectTasks,
} from "../controllers/taskController.js";

import { checkTaskOwnership } from "../middleware/checkownership.js";

const router = express.Router();

/*
|--------------------------------------------------------------------------
| Tasks
| Base Route:
| /api/tasks
|--------------------------------------------------------------------------
*/

// Get all tasks for the authenticated user
router.get(
  "/",
  protect,
  getUserTasks
);

// Get a single task
router.get(
  "/:taskId",
  protect,
  checkTaskOwnership,
  getProjectTasks
);

// Update a task
router.put(
  "/:taskId",
  protect,
  checkTaskOwnership,
  upload.single("file"),
  updateTask
);

// Delete a task
router.delete(
  "/:taskId",
  protect,
  checkTaskOwnership,
  deleteTask
);

export default router;