import axios from "axios";
import { auth } from "./firebase";

export const customAxios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
});

customAxios.interceptors.request.use(async (config) => {
  const user = auth.currentUser;

  if (user) {
    // Get the ID token
    const idToken = await user.getIdToken();
    // Set the Authorization header
    config.headers.Authorization = `Bearer ${idToken}`;
  }

  return config;
});
