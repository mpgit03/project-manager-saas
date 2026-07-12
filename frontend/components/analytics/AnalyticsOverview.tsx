type Overview = {
  totalProjects: number;
  activeProjects: number;
  totalTasks: number;
  completionRate: number;
};

type Props = {
  overview: Overview;
};

export default function AnalyticsOverview({
  overview,
}: Props) {
  const cards = [
    {
      title: "Projects",
      value: overview.totalProjects,
    },
    {
      title: "Tasks",
      value: overview.totalTasks,
    },
    {
      title: "Completion Rate",
      value: `${overview.completionRate}%`,
    },
    {
      title: "Active Projects",
      value: overview.activeProjects,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
      {cards.map((card) => (
        <div
          key={card.title}
          className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6"
        >
          <p className="text-sm text-zinc-400">
            {card.title}
          </p>

          <h2 className="text-4xl font-bold text-white mt-4">
            {card.value}
          </h2>
        </div>
      ))}
    </div>
  );
}