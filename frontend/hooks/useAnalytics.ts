"use client";

import { useEffect, useState } from "react";
import { getAnalytics } from "../services/analytics";

export type AnalyticsData = {
  overview: {
    totalProjects: number;
    activeProjects: number;
    totalTasks: number;
    completedTasks: number;
    pendingTasks: number;
    completionRate: number;
  };

  taskStatus: {
    todo: number;
    in_progress: number;
    done: number;
  };

  projectProgress: {
    _id: string;
    name: string;
    totalTasks: number;
    completedTasks: number;
    progress: number;
  }[];

  insights: {
    averageProjectProgress: number;
    largestProject: {
      name: string;
    } | null;
    mostProductiveProject: {
      name: string;
    } | null;
  };
};

export function useAnalytics() {
  const [analytics, setAnalytics] =
    useState<AnalyticsData | null>(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const data = await getAnalytics();
        setAnalytics(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  return {
    analytics,
    loading,
  };
}