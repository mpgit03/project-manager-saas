"use client";

import { useEffect, useState } from "react";
import axios from "axios";

type Overview = {
  totalProjects: number;
  totalTasks: number;
  completedTasks: number;
  pendingTasks: number;
  productivity: number;
};

type Project = {
  _id: string;
  name: string;
  description: string;
};

type Task = {
  _id: string;
  title: string;
  status: string;
};

type Activity = {
  _id: string;
  event: string;
  entityName: string;
};

type Dashboard = {
  overview: Overview;
  recentProjects: Project[];
  recentTasks: Task[];
  recentActivity: Activity[];
};

export default function DashboardPage() {
  const [dashboard, setDashboard] =
    useState<Dashboard | null>(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const token =
        localStorage.getItem("token");

      const response =
        await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/users/dashboard-stats`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

      setDashboard(response.data.dashboard);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <p className="text-zinc-400">
        Loading dashboard...
      </p>
    );
  }

  if (!dashboard) {
    return (
      <p className="text-red-500">
        Failed to load dashboard.
      </p>
    );
  }

  const cards = [
    {
      title: "Projects",
      value: dashboard.overview.totalProjects,
    },
    {
      title: "Completed",
      value: dashboard.overview.completedTasks,
    },
    {
      title: "Pending",
      value: dashboard.overview.pendingTasks,
    },
    {
      title: "Productivity",
      value: `${dashboard.overview.productivity}%`,
    },
  ];

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-4xl font-bold text-white">
          Dashboard
        </h1>

        <p className="text-zinc-400 mt-2">
          Overview of your workspace.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {cards.map((card) => (
          <div
            key={card.title}
            className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6"
          >
            <p className="text-zinc-400 text-sm">
              {card.title}
            </p>

            <h2 className="text-4xl font-bold text-white mt-4">
              {card.value}
            </h2>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">

        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
          <h2 className="text-lg font-semibold text-white mb-5">
            Recent Activity
          </h2>

          <div className="space-y-4">
            {dashboard.recentActivity.map((activity) => (
              <div key={activity._id}>
                <p className="text-white text-sm">
                  {activity.event.replaceAll("_", " ")}
                </p>

                <p className="text-zinc-400 text-xs">
                  {activity.entityName}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
          <h2 className="text-lg font-semibold text-white mb-5">
            Recent Projects
          </h2>

          <div className="space-y-4">
            {dashboard.recentProjects.map((project) => (
              <div key={project._id}>
                <p className="text-white">
                  {project.name}
                </p>

                <p className="text-zinc-400 text-sm">
                  {project.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
          <h2 className="text-lg font-semibold text-white mb-5">
            Recent Tasks
          </h2>

          <div className="space-y-4">
            {dashboard.recentTasks.map((task) => (
              <div key={task._id}>
                <p className="text-white">
                  {task.title}
                </p>

                <p className="text-zinc-400 text-sm">
                  {task.status}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}