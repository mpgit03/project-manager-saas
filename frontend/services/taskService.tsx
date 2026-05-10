import axios from "axios";

const API =
  process.env.NEXT_PUBLIC_API_URL ||
  "http://localhost:5000/api";

const getToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("token");
  }

  return null;
};

const authHeaders = () => ({
  Authorization: `Bearer ${getToken()}`,
});

export const getProjectTasks =
  async (projectId: string) => {
    const response = await axios.get(
      `${API}/projects/${projectId}/tasks`,
      {
        headers: authHeaders(),
      }
    );

    return response.data;
  };

export const createTask =
  async (
    projectId: string,
    formData: FormData
  ) => {
    const response = await axios.post(
      `${API}/projects/${projectId}/tasks`,
      formData,
      {
        headers: {
          ...authHeaders(),
          "Content-Type":
            "multipart/form-data",
        },
      }
    );

    return response.data;
  };

export const updateTask =
  async (
    projectId: string,
    taskId: string,
    formData: FormData
  ) => {

    const response =
      await axios.put(
        `${API}/projects/${projectId}/tasks/${taskId}`,
        formData,
        {
          headers: {
            ...authHeaders(),
            "Content-Type":
              "multipart/form-data",
          },
        }
      );

    return response.data;
  };

export const deleteTask =
  async (
    projectId: string,
    taskId: string
  ) => {
    const response = await axios.delete(
      `${API}/projects/${projectId}/tasks/${taskId}`,
      {
        headers: authHeaders(),
      }
    );

    return response.data;
  };