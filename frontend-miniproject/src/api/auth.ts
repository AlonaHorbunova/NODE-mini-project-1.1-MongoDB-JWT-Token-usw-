import axios from "axios";

export interface User {
  _id: string;
  username: string;
  email: string;
}

export interface AuthResponse {
  user: User;
  token: string;
  message?: string;
}

const API = axios.create({ baseURL: "http://localhost:3000/api" });

export const axiosRegister = async (data: any): Promise<AuthResponse> => {
  const response = await API.post<AuthResponse>("/auth/register", data);
  return response.data;
};

export const axiosLogin = async (data: any): Promise<AuthResponse> => {
  const response = await API.post<AuthResponse>("/auth/login", data);
  return response.data;
};
