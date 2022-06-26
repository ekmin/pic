import axios from "axios";
import { useDispatch } from "react-redux";
import { authActions } from "../store/reducers/auth.reducers";

const api = axios.create({
  baseURL: "http://localhost:8000/",
});

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
