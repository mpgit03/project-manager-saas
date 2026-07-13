"use client";

import AnalyticsOverview from "@/components/analytics/AnalyticsOverview";
import AnalyticsInsights from "@/components/analytics/AnalyticsInsights";
import ProjectProgress from "@/components/analytics/ProjectProgress";
import TaskStatusChart from "@/components/analytics/TaskStatusChart";
import { useAnalytics } from "@/hooks/useAnalytics";
import LoadingState from "@/components/common/LoadingState";

export default function AnalyticsPage() {
  const { analytics, loading } =
    useAnalytics();

  if (loading) {
  return (
    <LoadingState message="Loading analytics..." />
  );
}

  if (!analytics) {
    return (
      <div className="text-red-500">
        Failed to load analytics.
      </div>
    );
  }

  return (
    <div className="space-y-10">

      <div>
        <h1 className="text-4xl font-bold text-white">
          Analytics
        </h1>

        <p className="text-zinc-400 mt-2">
          Gain insights into your productivity and project performance.
        </p>
      </div>

      <AnalyticsOverview
        overview={analytics.overview}
      />

      <div className="grid xl:grid-cols-2 gap-8">

        <TaskStatusChart
          taskStatus={analytics.taskStatus}
        />

        <AnalyticsInsights
          averageProjectProgress={
            analytics.insights.averageProjectProgress
          }
          largestProject={
            analytics.insights.largestProject
          }
          mostProductiveProject={
            analytics.insights
              .mostProductiveProject
          }
        />

      </div>

      <ProjectProgress
        projects={
          analytics.projectProgress
        }
      />

    </div>
  );
}