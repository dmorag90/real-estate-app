import axios from "axios";
import { toast } from "react-toastify";
import userService from "./userService";
//all the messages will be sent to the server with JWT in their headers. Key="x-auth-token", value=JWT

axios.defaults.headers.common["x-auth-token"] = userService.getJwt();

//this code makes the axios the library to be used with rest-api. We can change it to any other library from here.
//the interceptors is a method of axios
//response - will intercept the response from the server to the client
//use - all the types of requests
//null - if no errors, don't send me anything
//error - if a response exists AND the status is 403 or higher - true
// toast.error - will raise an alert on top of the window = "An unexpected error occuured"
// return Promise.reject(error) -> forwards the error to the other parts of the javascript and will enable the error of user already registered (status 400)

axios.interceptors.response.use(null, (error) => {
  const expectedError = error.response && error.response.status >= 403;
  if (expectedError) toast.error("An unexpected error occurrred.");
  return Promise.reject(error);
});

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  patch: axios.patch,
  delete: axios.delete,
};
