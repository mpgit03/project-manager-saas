type Props = {
  title: string;
  description: string;
  icon?: string;
};

export default function EmptyState({
  title,
  description,
  icon = "📁",
}: Props) {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900 py-16 text-center">

      <div className="text-6xl">
        {icon}
      </div>

      <h2 className="mt-6 text-2xl font-semibold text-white">
        {title}
      </h2>

      <p className="mt-3 text-zinc-400">
        {description}
      </p>

    </div>
  );
}