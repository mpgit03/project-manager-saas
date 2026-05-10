import API from "./authService";

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");

  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const getProjects = async () => {
  const response = await API.get(
    "/projects",
    getAuthHeaders()
  );

  return response.data;
};

export const createProject = async (
  projectData: {
    name: string;
    description: string;
  }
) => {
  const response = await API.post(
    "/projects",
    projectData,
    getAuthHeaders()
  );

  return response.data;
};

export const updateProject = async (
  id: string,
  projectData: {
    name: string;
    description: string;
  }
) => {
  const response = await API.put(
    `/projects/${id}`,
    projectData,
    getAuthHeaders()
  );

  return response.data;
};

export const deleteProject = async (
  id: string
) => {
  const response = await API.delete(
    `/projects/${id}`,
    getAuthHeaders()
  );

  return response.data;
};