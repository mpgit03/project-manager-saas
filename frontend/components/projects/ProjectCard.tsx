"use client";

type Project = {
  _id: string;
  name: string;
  description: string;
};

type Props = {
  project: Project;

  onEdit: (project: Project) => void;

  onDelete: (id: string) => void;
};

export default function ProjectCard({
  project,
  onEdit,
  onDelete,
}: Props) {
  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 hover:border-purple-500 transition-all">
      
      <div className="flex items-start justify-between">
        
        <div>
          <h2 className="text-2xl font-semibold text-white">
            {project.name}
          </h2>

          <p className="text-zinc-400 mt-3 line-clamp-3">
            {project.description}
          </p>
        </div>

        <div className="w-3 h-3 rounded-full bg-green-500" />
      </div>

      <div className="mt-6">
        <div className="flex items-center justify-between text-sm text-zinc-400 mb-2">
          <span>Progress</span>
          <span>70%</span>
        </div>

        <div className="w-full h-2 bg-zinc-800 rounded-full overflow-hidden">
          <div className="w-[70%] h-full bg-gradient-to-r from-purple-500 to-blue-500" />
        </div>
      </div>

      <div className="flex items-center gap-3 mt-6">
        
        <button
          onClick={() => onEdit(project)}
          className="flex-1 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white transition-all"
        >
          Edit
        </button>

        <button
          onClick={() =>
            onDelete(project._id)
          }
          className="flex-1 py-2 rounded-xl bg-red-500/20 hover:bg-red-500/30 text-red-400 transition-all"
        >
          Delete
        </button>
      </div>
    </div>
  );
}