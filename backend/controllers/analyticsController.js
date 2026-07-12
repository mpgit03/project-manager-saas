import { asynchandler } from "../middleware/asynchandler.js";
import Task from "../models/Task.js";
import Project from "../models/Project.js";

export const getAnalytics = asynchandler(async (req, res) => {
  const userId = req.user._id;

  const [
    totalProjects,
    totalTasks,
    completedTasks,
    taskStatusDistribution,
    projectProgress,
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

    Task.aggregate([
      {
        $match: {
          createdBy: userId,
        },
      },
      {
        $group: {
          _id: "$status",
          count: {
            $sum: 1,
          },
        },
      },
    ]),

    Project.aggregate([
      {
        $match: {
          owner: userId,
        },
      },
      {
        $lookup: {
          from: "tasks",
          localField: "_id",
          foreignField: "project",
          as: "tasks",
        },
      },
      {
        $project: {
          name: 1,
          totalTasks: {
            $size: "$tasks",
          },
          completedTasks: {
            $size: {
              $filter: {
                input: "$tasks",
                as: "task",
                cond: {
                  $eq: ["$$task.status", "done"],
                },
              },
            },
          },
        },
      },
      {
        $addFields: {
          progress: {
            $cond: [
              {
                $eq: ["$totalTasks", 0],
              },
              0,
              {
                $round: [
                  {
                    $multiply: [
                      {
                        $divide: [
                          "$completedTasks",
                          "$totalTasks",
                        ],
                      },
                      100,
                    ],
                  },
                  0,
                ],
              },
            ],
          },
        },
      },
      {
        $sort: {
          progress: -1,
        },
      },
    ]),
  ]);

  const taskStatus = {
    todo: 0,
    in_progress: 0,
    done: 0,
  };

  taskStatusDistribution.forEach((status) => {
    taskStatus[status._id] = status.count;
  });

  const pendingTasks = totalTasks - completedTasks;

  const completionRate =
    totalTasks === 0
      ? 0
      : Math.round((completedTasks / totalTasks) * 100);

  const activeProjects = projectProgress.filter(
    (project) => project.totalTasks > 0
  ).length;

  const averageProjectProgress =
    projectProgress.length === 0
      ? 0
      : Math.round(
          projectProgress.reduce(
            (sum, project) => sum + project.progress,
            0
          ) / projectProgress.length
        );

  const largestProject =
    projectProgress.length > 0
      ? projectProgress.reduce((largest, current) =>
          current.totalTasks > largest.totalTasks
            ? current
            : largest
        )
      : null;

  const mostProductiveProject =
    projectProgress.length > 0
      ? projectProgress.reduce((best, current) =>
          current.progress > best.progress
            ? current
            : best
        )
      : null;

  res.status(200).json({
    success: true,
    analytics: {
      overview: {
        totalProjects,
        activeProjects,
        totalTasks,
        completedTasks,
        pendingTasks,
        completionRate,
      },
      
      taskStatus,

      projectProgress,

      insights: {
        averageProjectProgress,
        largestProject,
        mostProductiveProject,
      },
    },
  });
});