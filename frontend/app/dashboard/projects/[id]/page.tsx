"use client";

import axios from "axios";
import { useEffect, useState } from "react";

import { useParams } from "next/navigation";

import CreateTaskModal from "@/components/tasks/CreateTaskModal";

import EditTaskModal from "@/components/tasks/EditTaskModal";

import ConfirmationModal from "@/components/common/ConfirmationModal";
import toast from "react-hot-toast";

import TaskCard from "@/components/tasks/TaskCard";

import LoadingState from "@/components/common/LoadingState";
import EmptyState from "@/components/common/EmptyState";

import {
  createTask,
  deleteTask,
  getProjectTasks,
  updateTask,
  updateTaskStatus,
} from "@/services/taskService";

import type {
  Task,
  TaskStatus,
} from "@/types/Task";

type TaskColumnProps = {
  title: string;
  tasks: Task[];
  onStatusChange: (
    taskId: string,
    status: Task["status"]
  ) => void;
  onDelete: (taskId: string) => void;
  onEdit: (task: Task) => void;
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

  const [showDeleteModal, setShowDeleteModal] =
  useState(false);

  const [taskToDelete, setTaskToDelete] =
    useState<Task | null>(null);

  const [deleting, setDeleting] =
    useState(false);

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
      toast.error("Failed to load tasks");
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTask = async (
  formData: FormData
) => {
  try {
    const newTask = await createTask(
      projectId,
      formData
    );

    setTasks((prev) => [
      newTask,
      ...prev,
    ]);

    toast.success(
      "Task created successfully"
    );
  } catch (error: unknown) {
  if (axios.isAxiosError(error)) {
    toast.error(
      error.response?.data?.message ??
        "Failed to create project"
    );
  } else {
    toast.error("Something went wrong");
  }
}
};

  const handleUpdateTask = async (
  taskId: string,
  formData: FormData
) => {
  try {
    const updatedTask =
      await updateTask(
        projectId,
        taskId,
        formData
      );

    setTasks((prev) =>
      prev.map((task) =>
        task._id === taskId
          ? updatedTask
          : task
      )
    );

    setShowEditModal(false);

    toast.success(
      "Task updated successfully"
    );
  } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        toast.error(
          error.response?.data?.message ??
            "Failed to update project"
        );
      } else {
        toast.error("Something went wrong");
      }
    }
};

 const handleStatusChange = async (
  taskId: string,
  status:TaskStatus,
) => {
  try {
    const updatedTask =
      await updateTaskStatus(
        projectId,
        taskId,
        status
      );

    setTasks((prev) =>
      prev.map((task) =>
        task._id === taskId
          ? updatedTask
          : task
      )
    );

    toast.success(
      "Task status updated"
    );
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      toast.error(
        error.response?.data?.message ??
          "Failed to change status"
      );
    } else {
      toast.error("Something went wrong");
    }
  }
};

  const handleDeleteTask = (
  taskId: string
) => {
  const task = tasks.find(
    (t) => t._id === taskId
  );

  if (!task) return;

  setTaskToDelete(task);

  setShowDeleteModal(true);
};

const confirmDeleteTask =
  async () => {
    if (!taskToDelete) return;

    try {
      setDeleting(true);

      await deleteTask(
        projectId,
        taskToDelete._id
      );

      setTasks((prev) =>
        prev.filter(
          (task) =>
            task._id !==
            taskToDelete._id
        )
      );

      toast.success(
        "Task deleted successfully"
      );

      setShowDeleteModal(false);

      setTaskToDelete(null);
    } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      toast.error(
        error.response?.data?.message ??
          "Failed to delete task"
      );
    } else {
      toast.error("Something went wrong");
    }
  } finally {
      setDeleting(false);
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
    <LoadingState message="Loading ..." />
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

        <ConfirmationModal
        isOpen={showDeleteModal}
        title="Delete Task"
        message="This task will be permanently deleted. This action cannot be undone."
        confirmText="Delete"
        danger
        loading={deleting}
        onCancel={() => {
          setShowDeleteModal(false);
          setTaskToDelete(null);
        }}
        onConfirm={confirmDeleteTask}
      />
    </div>
  );
}

function TaskColumn({
  title,
  tasks,
  onStatusChange,
  onDelete,
  onEdit,
}: TaskColumnProps) {
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
          <EmptyState
            title="No Tasks"
            description="Create a task to get started."
            icon="📝"
          />
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