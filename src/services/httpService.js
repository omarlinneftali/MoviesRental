import axios from "axios";
import { toast } from "react-toastify";

axios.interceptors.response.use(null, (error) => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;
  if (!expectedError) {
    console.log(error);
    toast.error("Error inexperado");
  }
  return Promise.reject(error);
});

function setJwt(jwt) {
  axios.defaults.headers.common["x-auth-token"] = jwt;
}

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

export default {
  get: axios.get,
  put: axios.put,
  delete: axios.delete,
  post: axios.post,
  setJwt,
};
