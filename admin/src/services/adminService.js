import axios from "axios";

const API_URL = "http://localhost:5000/api";

export const adminLogin = async (phone, password) => {
  const response = await axios.post(
    `${API_URL}/auth/admin-login`,
    {
      phone,
      password,
    }
  );

  return response.data;
};