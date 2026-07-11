"use client";

import { useEffect, useState } from "react";

import ProjectCard from "@/components/projects/ProjectCard";

import CreateProjectModal from "@/components/projects/CreateProjectModal";

import EditProjectModal from "@/components/projects/EditProjectModal";

import {
  createProject,
  deleteProject,
  getProjects,
  updateProject,
} from "@/services/projectService";

type Project = {
  _id: string;
  name: string;
  description: string;
  progress?: number;
};

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

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const data = await getProjects();

      setProjects(data.projects || []);
    } catch (error) {
      console.log(error);
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
    } catch (error) {
      console.log(error);
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
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteProject = async (
    id: string
  ) => {
    try {
      await deleteProject(id);

      setProjects((prev) =>
        prev.filter(
          (project) =>
            project._id !== id
        )
      );
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return (
      <div className="text-white">
        Loading projects...
      </div>
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
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-10 text-center">
          
          <h2 className="text-2xl text-white font-semibold">
            No Projects Yet
          </h2>

          <p className="text-zinc-400 mt-3">
            Start by creating your first project.
          </p>
        </div>
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
    </div>
  );
}