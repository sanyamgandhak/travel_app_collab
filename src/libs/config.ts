import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://roam.lazymonkey.tech",
  // baseURL: "https://roam-production.up.railway.app",
  // baseURL: "https://roam.lazymonkey.website",
});
