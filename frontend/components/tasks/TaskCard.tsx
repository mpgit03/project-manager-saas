"use client";

import {Task} from "@/types/task"

type Props = {
  task: Task;

  onStatusChange: (
    taskId: string,
    status:
      | "todo"
      | "in_progress"
      | "done"
  ) => void;

  onDelete: (
    taskId: string
  ) => void;

  onEdit: (
    task: Task
  ) => void;
};

export default function TaskCard({
  task,
  onStatusChange,
  onDelete,
  onEdit,
}: Props) {
  const BACKEND_URL =
  process.env
    .NEXT_PUBLIC_API_URL?.replace(
      "/api",
      ""
    );

const attachmentUrl =
  task.attachment
    ? `${BACKEND_URL}/${task.attachment}`
    : null;
    
  return (
    <div className="bg-zinc-800 rounded-xl p-4 border border-zinc-700 hover:border-purple-500 transition-all">
      
      <div className="flex items-start justify-between gap-3">
        
        <div className="flex-1">
          
          <h3 className="text-white font-medium">
            {task.title}
          </h3>

          <p className="text-zinc-400 text-sm mt-2">
            {task.description}
          </p>

          {attachmentUrl && (
            <a
              href={attachmentUrl}
              target="_blank"
              className="inline-block mt-4 text-sm text-purple-400 hover:text-purple-300"
            >
              View Attachment
            </a>
          )}
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
          className="bg-zinc-900 border border-zinc-700 text-zinc-300 text-sm rounded-lg px-2 py-1 outline-none"
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

      <div className="flex items-center justify-end gap-3 mt-5">
        
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
          className="px-4 py-2 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-red-400 text-sm transition-all"
        >
          Delete
        </button>
      </div>
    </div>
  );
}