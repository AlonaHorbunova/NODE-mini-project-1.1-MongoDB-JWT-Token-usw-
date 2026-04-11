import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:3000/api" });

export const axiosRegister = async (data) => {
  const response = await API.post("/auth/register", data);
  return response.data;
};

export const axiosLogin = async (data) => {
  const response = await API.post("/auth/login", data);
  return response.data;
};
