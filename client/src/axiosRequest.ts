import axios from "axios";
import { logoutUser } from "./features/userSlice";
import { toast } from "react-toastify";

let store: any;

export const injectStore = (_store: any) => {
  store = _store;
};

export const fetch = axios.create({
  withCredentials: true,
  baseURL: "http://localhost:5000/api",
});

fetch.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

//RESPONSE INTERCEPTORS

fetch.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      store.dispatch(logoutUser());
      toast.error(error.response.data.message);
    }
    return Promise.reject(error);
  }
);
