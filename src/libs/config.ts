import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://roam.lazymonkey.tech",
});
