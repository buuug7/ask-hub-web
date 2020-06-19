import axios from "axios";
import { BASE_URL } from "./config";

const token = sessionStorage.getItem("token");

const http = axios.create({
  baseURL: BASE_URL,
  timeout: 1000 * 30,
  headers: {
    "content-type": "application/json; charset=utf-8",
    Authorization: `Bearer ${token}`,
  },
});

http.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

http.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default http;
