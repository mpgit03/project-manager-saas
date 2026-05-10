"use client";

import { useEffect, useState } from "react";

import axios from "axios";

type DashboardStats = {
  totalProjects: number;

  completedTasks: number;

  pendingTasks: number;

  productivity: number;
};

export default function DashboardPage() {
  const [stats, setStats] =
    useState<DashboardStats>({
      totalProjects: 0,
      completedTasks: 0,
      pendingTasks: 0,
      productivity: 0,
    });

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats =
    async () => {
      try {
        const token =
          localStorage.getItem(
            "token"
          );

        const response =
          await axios.get(
            `${process.env.NEXT_PUBLIC_API_URL}/users/dashboard-stats`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

        setStats(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

  const cards = [
    {
      title: "Total Projects",
      value:
        stats.totalProjects,
    },

    {
      title: "Completed Tasks",
      value:
        stats.completedTasks,
    },

    {
      title: "Pending Tasks",
      value:
        stats.pendingTasks,
    },

    {
      title: "Productivity",
      value: `${stats.productivity}%`,
    },
  ];

  return (
    <div>
      <div className="mb-10">
        
        <h1 className="text-4xl font-bold text-white">
          Dashboard
        </h1>

        <p className="text-zinc-400 mt-2">
          Overview of your workspace.
        </p>
      </div>

      {loading ? (
        <div className="text-zinc-400">
          Loading dashboard...
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          
          {cards.map((card) => (
            <div
              key={card.title}
              className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 hover:border-purple-500 transition-all"
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
      )}
    </div>
  );
}