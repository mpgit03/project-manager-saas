export type TaskStatus =
  | "todo"
  | "in_progress"
  | "done";

export type Task = {
  _id: string;
  title: string;
  description: string;
  status: TaskStatus;
  attachment?: string;
  createdAt: string;
};

export type TaskWithProject = Task & {
  project: {
    _id: string;
    name: string;
  };
};