import Project from "../models/Project.js";
import Task from "../models/Task.js";

import { asynchandler }
from "../middleware/asynchandler.js";

export const getDashboardStats =
  asynchandler(
    async (req, res) => {

      const userId =
        req.user._id;

      const totalProjects =
        await Project.countDocuments({
          owner: userId,
        });

      const completedTasks =
        await Task.countDocuments({
          createdBy: userId,
          status: "done",
        });

      const pendingTasks =
        await Task.countDocuments({
          createdBy: userId,
          status: {
            $in: [
              "todo",
              "in_progress",
            ],
          },
        });

      const totalTasks =
        await Task.countDocuments({
          createdBy: userId,
        });

      const productivity =
        totalTasks === 0
          ? 0
          : Math.round(
              (completedTasks /
                totalTasks) *
                100
            );

      res.json({
        totalProjects,
        completedTasks,
        pendingTasks,
        productivity,
      });
    }
  );