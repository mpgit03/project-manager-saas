import axios from "axios";

export const getAnalytics = async () => {
  const token = localStorage.getItem("token");

  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/analytics`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data.analytics;
};