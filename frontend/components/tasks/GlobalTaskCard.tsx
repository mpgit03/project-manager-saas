"use client";

import Link from "next/link";
import type {
  TaskWithProject,
  TaskStatus,
} from "@/types/Task";

type Props = {
  task: TaskWithProject;

  onDelete: (id: string) => void;

  onStatusChange: (
    id: string,
    status: TaskStatus
  ) => void;

  onEdit: (task: TaskWithProject) => void;
};

export default function GlobalTaskCard({
  task,
  onDelete,
  onStatusChange,
  onEdit,
}: Props) {
  const BACKEND_URL =
    process.env.NEXT_PUBLIC_API_URL?.replace(
      "/api",
      ""
    );

  const attachmentUrl = task.attachment
    ? `${BACKEND_URL}/${task.attachment}`
    : null;

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 hover:border-purple-500 transition-all">

      <div className="flex justify-between items-start">

        <div>

          <Link
            href={`/dashboard/projects/${task.project._id}`}
          >
            <span className="inline-flex px-3 py-1 rounded-full text-xs bg-purple-500/20 text-purple-300 hover:bg-purple-500/30 transition">
              {task.project.name}
            </span>
          </Link>

          <h2 className="text-xl text-white font-semibold mt-4">
            {task.title}
          </h2>

          <p className="text-zinc-400 mt-2">
            {task.description}
          </p>

        </div>

        <select
          value={task.status}
          onChange={(e) =>
            onStatusChange(
              task._id,
              e.target.value as
                | "todo"
                | "in_progress"
                | "done"
            )
          }
          className="bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-white"
        >
          <option value="todo">
            Todo
          </option>

          <option value="in_progress">
            In Progress
          </option>

          <option value="done">
            Done
          </option>
        </select>

      </div>

      {attachmentUrl && (
        <a
          href={attachmentUrl}
          target="_blank"
          className="inline-block mt-5 text-purple-400 hover:text-purple-300 text-sm"
        >
          View Attachment
        </a>
      )}

      <div className="flex justify-between items-center mt-6">

        <span className="text-zinc-500 text-sm">
          {new Date(
            task.createdAt
          ).toLocaleDateString()}
        </span>

        <div className="flex gap-3">

          <button
            onClick={() => onEdit(task)}
            className="px-4 py-2 rounded-xl bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 transition"
            >
            Edit
            </button>

          <button
            onClick={() =>
              onDelete(task._id)
            }
            className="px-4 py-2 rounded-xl bg-red-500/20 hover:bg-red-500/30 text-red-400 transition"
          >
            Delete
          </button>

        </div>

      </div>

    </div>
  );
}