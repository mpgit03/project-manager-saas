type Project = {
  name: string;
};

type Props = {
  averageProjectProgress: number;
  largestProject: Project | null;
  mostProductiveProject: Project | null;
};

export default function AnalyticsInsights({
  averageProjectProgress,
  largestProject,
  mostProductiveProject,
}: Props) {
  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
      <h2 className="text-xl font-semibold text-white mb-6">
        Insights
      </h2>

      <div className="space-y-6">

        <div>
          <p className="text-zinc-400 text-sm">
            🏆 Most Productive Project
          </p>

          <p className="text-white font-semibold mt-1">
            {mostProductiveProject?.name ?? "-"}
          </p>
        </div>

        <div>
          <p className="text-zinc-400 text-sm">
            📁 Largest Project
          </p>

          <p className="text-white font-semibold mt-1">
            {largestProject?.name ?? "-"}
          </p>
        </div>

        <div>
          <p className="text-zinc-400 text-sm">
            📊 Average Progress
          </p>

          <p className="text-white font-semibold mt-1">
            {averageProjectProgress}%
          </p>
        </div>

      </div>
    </div>
  );
}