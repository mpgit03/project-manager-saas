type Project = {
  _id: string;
  name: string;
  progress: number;
  totalTasks: number;
  completedTasks: number;
};

type Props = {
  projects: Project[];
};

export default function ProjectProgress({
  projects,
}: Props) {
  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
      <h2 className="text-xl font-semibold text-white mb-6">
        Project Progress
      </h2>

      <div className="space-y-6">

        {projects.map((project) => (
          <div key={project._id}>

            <div className="flex justify-between mb-2">
              <div>
                <p className="text-white font-medium">
                  {project.name}
                </p>

                <p className="text-zinc-500 text-sm">
                  {project.completedTasks} / {project.totalTasks} tasks
                </p>
              </div>

              <span className="text-purple-400 font-semibold">
                {project.progress}%
              </span>
            </div>

            <div className="w-full h-3 bg-zinc-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-purple-500 rounded-full transition-all"
                style={{
                  width: `${project.progress}%`,
                }}
              />
            </div>

          </div>
        ))}

      </div>
    </div>
  );
}