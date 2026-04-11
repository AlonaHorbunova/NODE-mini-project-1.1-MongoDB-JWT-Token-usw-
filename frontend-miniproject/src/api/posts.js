import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:3000/api" });

export const getPosts = () => API.get("/posts");

// Создать пост (нужен токен!)
export const createPost = (postData, token) =>
  API.post("/posts", postData, {
    headers: { Authorization: `Bearer ${token}` },
  });
