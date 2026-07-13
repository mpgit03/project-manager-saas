import GlobalTaskCard from "./GlobalTaskCard";
import EmptyState from "../common/EmptyState";

import type {
  Task,
  TaskStatus,
  TaskWithProject
} from "@/types/Task";

type Props = {
  tasks: TaskWithProject[];

  onDelete: (id: string) => void;

  onStatusChange: (
    id: string,
    status: TaskStatus
  ) => void;

  onEdit: (task: TaskWithProject) => void;
};

export default function GlobalTaskList({
  tasks,
  onDelete,
  onStatusChange,
  onEdit
}: Props) {

  if (tasks.length === 0) {
  return (
    <EmptyState
      title="No Tasks Found"
      description="Try changing the filters or create a new task."
      icon="📝"
    />
  );
}

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

      {tasks.map((task) => (
        <GlobalTaskCard
          key={task._id}
          task={task}
          onDelete={onDelete}
          onStatusChange={
            onStatusChange
          }
          onEdit={onEdit}
        />
      ))}

    </div>
  );
}