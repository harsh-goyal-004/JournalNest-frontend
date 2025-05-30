import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8080",
  withCredentials: true,
});

let accessToken = "";
let updateReactContextAccessToken = null;

// Method to get the accessToken from AuthContext
export const setAccessToken = (token) => {
  if (token !== null) {
    accessToken = token;
  }
};

// This method gets the setter function of the AuthContext and store it in a variable
export const injectUpdateAccessToken = (fn) => {
  updateReactContextAccessToken = fn;
};

// Request Interceptor
axiosInstance.interceptors.request.use(
  (request) => {
    if (accessToken !== "") {
      request.headers.Authorization = `Bearer ${accessToken}`;
    }
    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const originalRequest = error.config; //The original request
      try {
        const newAccessToken = await axiosInstance.get("/refresh-token", {
          withCredentials: true,
        });

        // Change the access token with the newly generated one
        setAccessToken(newAccessToken.data);
        console.log(newAccessToken.data);

        // Set the new Access Token in the AuthContext
        updateReactContextAccessToken((prev) => ({
          ...prev,
          accessToken: newAccessToken.data,
        }));

        // Change the accessToken in the original request
        originalRequest.headers.Authorization = `Bearer ${newAccessToken.data}`;

        return axiosInstance(originalRequest);
      } catch (error) {
        if (error.response?.status === 410) {
          return Promise.reject(error);
        }
      }
    }
  }
);

export default axiosInstance;
