"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import GlobalTaskList from "@/components/tasks/GlobalTaskList";
import TaskFilters from "@/components/tasks/TaskFilters";
import TaskPagination from "@/components/tasks/TaskPagination";
import EditTaskModal from "@/components/tasks/EditTaskModal";
import { updateGlobalTask } from "@/services/taskService";
import LoadingState from "@/components/common/LoadingState";

import {
  getTasks,
  deleteGlobalTask,
  updateGlobalTaskStatus,
} from "@/services/taskService";

type Task = {
  _id: string;
  title: string;
  description: string;
  status: "todo" | "in_progress" | "done";
  attachment?: string;
  createdAt: string;

  project: {
    _id: string;
    name: string;
  };
};

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [status, setStatus] = useState("all");

  const [sort, setSort] = useState("-createdAt");

  const [showEditModal, setShowEditModal] =
  useState(false);

    const [selectedTask, setSelectedTask] =
    useState<Task | null>(null);

  const [pagination, setPagination] = useState({
    page: 1,
    totalPages: 1,
    totalTasks: 0,
    hasNextPage: false,
    hasPrevPage: false,
  });

  useEffect(() => {
    fetchTasks();
  }, [pagination.page, search, status, sort]);

  const fetchTasks = async () => {
    try {
      setLoading(true);

      const data = await getTasks({
        page: pagination.page,
        search,
        status,
        sort,
      });

      setTasks(data.tasks);

      setPagination((prev) => ({
        ...prev,
        totalPages: data.totalPages,
        totalTasks: data.totalTasks,
        hasNextPage: data.hasNextPage,
        hasPrevPage: data.hasPrevPage,
      }));
    }catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        toast.error(
          error.response?.data?.message ?? "Failed to delete task"
        );
      } else {
        toast.error("Something went wrong");
      }
  }finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteGlobalTask(id);
      fetchTasks();
    } catch (error) {
      toast.error("Failed to delete task")
    }
  };

  const handleUpdateTask = async (
  taskId: string,
  formData: FormData
) => {
  try {
    await updateGlobalTask(
      taskId,
      formData
    );

    fetchTasks();

    setShowEditModal(false);

  } catch (error) {
    toast.error("Failed to update task")
  }
};

  const handleStatusChange = async (
    taskId: string,
    status: "todo" | "in_progress" | "done"
  ) => {
    try {
      await updateGlobalTaskStatus(taskId, status);
      fetchTasks();
    } catch (error) {
      toast.error("Failed to update status");
    }
  };

 if (loading) {
  return (
    <LoadingState message="Loading tasks..." />
  );
}

  return (
    <div>
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="text-4xl font-bold text-white">
            All Tasks
          </h1>

          <p className="text-zinc-400 mt-2">
            Manage every task across all
            projects.
          </p>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-xl px-5 py-3">
          <span className="text-zinc-400 text-sm">
            Total Tasks
          </span>

          <div className="text-white text-2xl font-bold">
            {pagination.totalTasks}
          </div>
        </div>
      </div>

      <TaskFilters
        search={search}
        setSearch={(value) => {
          setSearch(value);

          setPagination((prev) => ({
            ...prev,
            page: 1,
          }));
        }}
        status={status}
        setStatus={(value) => {
          setStatus(value);

          setPagination((prev) => ({
            ...prev,
            page: 1,
          }));
        }}
        sort={sort}
        setSort={(value) => {
          setSort(value);

          setPagination((prev) => ({
            ...prev,
            page: 1,
          }));
        }}
      />

      <div className="mt-8">
        <GlobalTaskList
            tasks={tasks}
            onDelete={handleDelete}
            onStatusChange={handleStatusChange}
            onEdit={(task) => {
                setSelectedTask(task);
                setShowEditModal(true);
            }}
            />
      </div>

      <TaskPagination
        page={pagination.page}
        totalPages={
          pagination.totalPages
        }
        hasNextPage={
          pagination.hasNextPage
        }
        hasPrevPage={
          pagination.hasPrevPage
        }
        onPageChange={(page) =>
          setPagination((prev) => ({
            ...prev,
            page,
          }))
        }
      />

      {showEditModal && selectedTask && (
        <EditTaskModal
            task={selectedTask}
            onClose={() => setShowEditModal(false)}
            onUpdate={handleUpdateTask}
        />
        )}
    </div>
  );
}