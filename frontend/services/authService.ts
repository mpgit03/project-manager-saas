import axios from "axios";

const API = axios.create({
  baseURL:
    process.env
      .NEXT_PUBLIC_API_URL ||
    "http://localhost:5000/api",

  withCredentials: true,
});

export const registerUser =
  async (userData: {
    name: string;
    email: string;
    password: string;
  }) => {

    const response =
      await API.post(
        "/auth/register",
        userData
      );

    return response.data;
  };

export const loginUser =
  async (userData: {
    email: string;
    password: string;
  }) => {

    const response =
      await API.post(
        "/auth/login",
        userData
      );

    return response.data;
  };

export default API;