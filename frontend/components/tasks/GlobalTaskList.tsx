import GlobalTaskCard from "./GlobalTaskCard";

type Props = {
  tasks: any[];

  onDelete: (id: string) => void;

  onStatusChange: (
    id: string,
    status:
      | "todo"
      | "in_progress"
      | "done"
  ) => void;

  onEdit: (task: any) => void;
};

export default function GlobalTaskList({
  tasks,
  onDelete,
  onStatusChange,
  onEdit
}: Props) {

  if (tasks.length === 0) {
    return (
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-10 text-center">

        <h2 className="text-2xl text-white font-semibold">
          No Tasks Found
        </h2>

        <p className="text-zinc-400 mt-3">
          Try changing the filters or create
          a new task.
        </p>

      </div>
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