import axios from "axios";
import { useDispatch } from "react-redux";
import { authActions } from "../store/reducers/auth.reducers";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// console.log(process.env.API_URL);
console.log(import.meta.env.VITE_API_URL);

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response.status === 401) {
      useDispatch(authActions.LOGOUT());
    }
    return Promise.reject(err);
  }
);

export default api;
