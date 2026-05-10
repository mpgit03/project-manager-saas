"use client";

import { useEffect, useState } from "react";

import { useParams } from "next/navigation";

import CreateTaskModal from "@/components/tasks/CreateTaskModal";

import EditTaskModal from "@/components/tasks/EditTaskModal";

import TaskCard from "@/components/tasks/TaskCard";

import {
  createTask,
  deleteTask,
  getProjectTasks,
  updateTask,
} from "@/services/taskService";

type Task = {
  _id: string;

  title: string;

  description: string;

  status:
    | "todo"
    | "in_progress"
    | "done";

  attachment?: string;
};

export default function ProjectDetailsPage() {
  const params = useParams();

  const projectId =
    params.id as string;

  const [tasks, setTasks] =
    useState<Task[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [showCreateModal, setShowCreateModal] =
    useState(false);

  const [showEditModal, setShowEditModal] =
    useState(false);

  const [selectedTask, setSelectedTask] =
    useState<Task | null>(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const data =
        await getProjectTasks(
          projectId
        );

      setTasks(data || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTask =
    async (
      formData: FormData
    ) => {
      try {
        const newTask =
          await createTask(
            projectId,
            formData
          );

        setTasks((prev) => [
          newTask,
          ...prev,
        ]);
      } catch (error) {
        console.log(error);
      }
    };

  const handleUpdateTask =
    async (
      taskId: string,
      taskData: {
        title: string;
        description: string;
      }
    ) => {
      try {
        const updatedTask =
          await updateTask(
            projectId,
            taskId,
            taskData
          );

        setTasks((prev) =>
          prev.map((task) =>
            task._id === taskId
              ? updatedTask
              : task
          )
        );

        setShowEditModal(false);
      } catch (error) {
        console.log(error);
      }
    };

  const handleStatusChange =
    async (
      taskId: string,
      status:
        | "todo"
        | "in_progress"
        | "done"
    ) => {
      try {
        const updatedTask =
          await updateTask(
            projectId,
            taskId,
            { status }
          );

        setTasks((prev) =>
          prev.map((task) =>
            task._id === taskId
              ? updatedTask
              : task
          )
        );
      } catch (error) {
        console.log(error);
      }
    };

  const handleDeleteTask =
    async (taskId: string) => {
      try {
        await deleteTask(
          projectId,
          taskId
        );

        setTasks((prev) =>
          prev.filter(
            (task) =>
              task._id !== taskId
          )
        );
      } catch (error) {
        console.log(error);
      }
    };

  const todoTasks = tasks.filter(
    (task) => task.status === "todo"
  );

  const inProgressTasks =
    tasks.filter(
      (task) =>
        task.status ===
        "in_progress"
    );

  const doneTasks = tasks.filter(
    (task) => task.status === "done"
  );

  const progress =
    tasks.length === 0
      ? 0
      : Math.round(
          (doneTasks.length /
            tasks.length) *
            100
        );

  if (loading) {
    return (
      <div className="text-white">
        Loading...
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-10">
        
        <div>
          <h1 className="text-4xl font-bold text-white">
            Project Tasks
          </h1>

          <p className="text-zinc-400 mt-2">
            Manage project workflow.
          </p>
        </div>

        <button
          onClick={() =>
            setShowCreateModal(true)
          }
          className="bg-gradient-to-r from-purple-600 to-blue-600 px-5 py-3 rounded-xl text-white"
        >
          Create Task
        </button>
      </div>

      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 mb-10">
        
        <div className="flex items-center justify-between mb-3">
          
          <span className="text-zinc-300">
            Progress
          </span>

          <span className="text-white font-semibold">
            {progress}%
          </span>
        </div>

        <div className="w-full h-3 bg-zinc-800 rounded-full overflow-hidden">
          
          <div
            className="h-full bg-gradient-to-r from-purple-500 to-blue-500 transition-all"
            style={{
              width: `${progress}%`,
            }}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        <TaskColumn
          title="To Do"
          tasks={todoTasks}
          onStatusChange={
            handleStatusChange
          }
          onDelete={
            handleDeleteTask
          }
          onEdit={(task: Task) => {
            setSelectedTask(task);
            setShowEditModal(true);
          }}
        />

        <TaskColumn
          title="In Progress"
          tasks={inProgressTasks}
          onStatusChange={
            handleStatusChange
          }
          onDelete={
            handleDeleteTask
          }
          onEdit={(task: Task) => {
            setSelectedTask(task);
            setShowEditModal(true);
          }}
        />

        <TaskColumn
          title="Done"
          tasks={doneTasks}
          onStatusChange={
            handleStatusChange
          }
          onDelete={
            handleDeleteTask
          }
          onEdit={(task: Task) => {
            setSelectedTask(task);
            setShowEditModal(true);
          }}
        />
      </div>

      {showCreateModal && (
        <CreateTaskModal
          onClose={() =>
            setShowCreateModal(false)
          }
          onCreate={
            handleCreateTask
          }
        />
      )}

      {showEditModal &&
        selectedTask && (
          <EditTaskModal
            task={selectedTask}
            onClose={() =>
              setShowEditModal(false)
            }
            onUpdate={
              handleUpdateTask
            }
          />
        )}
    </div>
  );
}

function TaskColumn({
  title,
  tasks,
  onStatusChange,
  onDelete,
  onEdit,
}: any) {
  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 min-h-[300px]">
      
      <div className="flex items-center justify-between mb-6">
        
        <h2 className="text-xl font-semibold text-white">
          {title}
        </h2>

        <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-300 text-sm">
          {tasks.length}
        </div>
      </div>

      <div className="space-y-4">
        
        {tasks.length === 0 ? (
          <div className="text-zinc-500 text-sm">
            No tasks yet
          </div>
        ) : (
          tasks.map((task: Task) => (
            <TaskCard
              key={task._id}
              task={task}
              onStatusChange={
                onStatusChange
              }
              onDelete={onDelete}
              onEdit={onEdit}
            />
          ))
        )}
      </div>
    </div>
  );
}