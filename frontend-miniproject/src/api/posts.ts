import axios from "axios";
import { User } from "./auth";

export interface Post {
  _id: string;
  title: string;
  content: string;
  author: User; 
  createdAt: string;
}

const API = axios.create({ baseURL: "http://localhost:3000/api" });

export const getPosts = () => API.get<Post[]>("/posts");

export const createPost = (
  postData: { title: string; content: string },
  token: string | null,
) =>
  API.post<Post>("/posts", postData, {
    headers: { Authorization: `Bearer ${token}` },
  });
