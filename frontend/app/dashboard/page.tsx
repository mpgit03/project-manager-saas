export default function DashboardPage() {
  return (
    <div>
      <h1 className="text-4xl font-bold mb-8">
        Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {[
          "Total Projects",
          "Completed Tasks",
          "Pending Tasks",
          "Productivity",
        ].map((item) => (
          <div
            key={item}
            className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 hover:border-purple-500 transition-all"
          >
            <p className="text-zinc-400 text-sm">{item}</p>

            <h2 className="text-3xl font-bold mt-4">
              24
            </h2>
          </div>
        ))}
      </div>
    </div>
  );
}