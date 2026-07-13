"use client";
import axios from "axios";

import { useEffect, useState } from "react";
import ConfirmationModal from "@/components/common/ConfirmationModal";
import toast from "react-hot-toast";  

import ProjectCard from "@/components/projects/ProjectCard";

import CreateProjectModal from "@/components/projects/CreateProjectModal";

import EditProjectModal from "@/components/projects/EditProjectModal";

import LoadingState from "@/components/common/LoadingState";

import EmptyState from "@/components/common/EmptyState";

import {
  createProject,
  deleteProject,
  getProjects,
  updateProject,
} from "@/services/projectService";

import { Project } from "@/types/project";

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [showCreateModal, setShowCreateModal] =
    useState(false);

  const [showEditModal, setShowEditModal] =
    useState(false);

  const [selectedProject, setSelectedProject] =
    useState<Project | null>(null);

  const [showDeleteModal, setShowDeleteModal] =
  useState(false);

  const [projectToDelete, setProjectToDelete] =
    useState<Project | null>(null);

  const [deleting, setDeleting] =
    useState(false);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const data = await getProjects();

      setProjects(data.projects || []);
    } catch (error) {
      toast.error("Failed to load projects");
    } finally {
      setLoading(false);
    }
  };

  const handleCreateProject = async (
      projectData: {
        name: string;
        description: string;
      }
    ) => {
      try {
        const newProject =
          await createProject(projectData);

        setProjects((prev) => [
          newProject,
          ...prev,
        ]);

        toast.success(
          "Project created successfully"
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


  const handleEditClick = (
    project: Project
  ) => {
    setSelectedProject(project);

    setShowEditModal(true);
  };

  const handleUpdateProject = async (
    id: string,
    projectData: {
      name: string;
      description: string;
    }
  ) => {
    try {
      const updatedProject =
        await updateProject(
          id,
          projectData
        );

      setProjects((prev) =>
        prev.map((project) =>
          project._id === id
            ? updatedProject
            : project
        )
      );

      setShowEditModal(false);

      toast.success(
        "Project updated successfully"
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


  const handleDeleteProject = (
  id: string
) => {
  const project = projects.find(
    (p) => p._id === id
  );

  if (!project) return;

  setProjectToDelete(project);

  setShowDeleteModal(true);
};



const confirmDeleteProject =
  async () => {
    if (!projectToDelete) return;

    try {
      setDeleting(true);

      await deleteProject(
        projectToDelete._id
      );

      setProjects((prev) =>
        prev.filter(
          (project) =>
            project._id !==
            projectToDelete._id
        )
      );

      toast.success(
        "Project deleted successfully"
      );

      setShowDeleteModal(false);

      setProjectToDelete(null);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
      toast.error(
        error.response?.data?.message ??
          "Failed to delete project"
      );
  } else {
    toast.error("Something went wrong");
  }
} finally {
      setDeleting(false);
    }
  };

  if (loading) {
  return (
    <LoadingState message="Loading projects..." />
  );
}

  return (
    <div>
      <div className="flex items-center justify-between mb-10">
        
        <div>
          <h1 className="text-4xl font-bold text-white">
            Projects
          </h1>

          <p className="text-zinc-400 mt-2">
            Manage and organize your projects.
          </p>
        </div>

        <button
          onClick={() =>
            setShowCreateModal(true)
          }
          className="bg-gradient-to-r from-purple-600 to-blue-600 px-5 py-3 rounded-xl text-white font-medium hover:opacity-90 transition-all"
        >
          Create Project
        </button>
      </div>

      {projects.length === 0 ? (
        <EmptyState
          title="No Projects Yet"
          description="Start by creating your first project."
          icon="📁"
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          
          {projects.map((project) => (
            <ProjectCard
              key={project._id}
              project={project}
              onEdit={
                handleEditClick
              }
              onDelete={
                handleDeleteProject
              }
            />
          ))}
        </div>
      )}

      {showCreateModal && (
        <CreateProjectModal
          onClose={() =>
            setShowCreateModal(false)
          }
          onCreate={
            handleCreateProject
          }
        />
      )}

      {showEditModal &&
        selectedProject && (
          <EditProjectModal
            project={selectedProject}
            onClose={() =>
              setShowEditModal(false)
            }
            onUpdate={
              handleUpdateProject
            }
          />
        )}

            <ConfirmationModal
            isOpen={showDeleteModal}
            title="Delete Project"
            message="Deleting this project will permanently remove it along with all associated tasks. This action cannot be undone."
            confirmText="Delete"
            danger
            loading={deleting}
            onCancel={() => {
              setShowDeleteModal(false);
              setProjectToDelete(null);
            }}
            onConfirm={confirmDeleteProject}
          />
    </div>
  );
}