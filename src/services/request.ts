import axios from "axios";
import "@/mock";

const request = axios.create({
  baseURL: "/", // 设置基本URL
  timeout: 10000, // 设置请求超时时间
});

// 请求拦截器
request.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截器
request.interceptors.response.use(
  (response) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(response.data);
      }, 600);
    });
  },
  (error) => {
    // 对响应错误做些什么
    return Promise.reject(error);
  }
);

export default request;
