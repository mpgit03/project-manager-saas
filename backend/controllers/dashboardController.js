import { asynchandler } from "../middleware/asynchandler.js";
import Project from "../models/Project.js";
import Task from "../models/Task.js";
import Activity from "../models/Activity.js";

export const getDashboardStats = asynchandler(async (req, res) => {
  const userId = req.user._id;

  const [
    totalProjects,
    totalTasks,
    completedTasks,
    recentProjects,
    recentTasks,
    recentActivity,
  ] = await Promise.all([
    Project.countDocuments({
      owner: userId,
    }),

    Task.countDocuments({
      createdBy: userId,
    }),

    Task.countDocuments({
      createdBy: userId,
      status: "done",
    }),

    Project.find({
      owner: userId,
    })
      .sort({ createdAt: -1 })
      .limit(5)
      .select("_id name description createdAt")
      .lean(),

    Task.find({
      createdBy: userId,
    })
      .sort({ createdAt: -1 })
      .limit(5)
      .populate("project", "name")
      .select("_id title status project createdAt")
      .lean(),

    Activity.find({
      user: userId,
    })
      .sort({ createdAt: -1 })
      .limit(10)
      .select("_id event entityName createdAt")
      .lean(),
  ]);

  const pendingTasks = totalTasks - completedTasks;

  const productivity =
    totalTasks === 0
      ? 0
      : Math.round((completedTasks / totalTasks) * 100);

  res.status(200).json({
    success: true,
    dashboard: {
      overview: {
        totalProjects,
        totalTasks,
        completedTasks,
        pendingTasks,
        productivity,
      },
      recentProjects,
      recentTasks,
      recentActivity,
    },
  });
});