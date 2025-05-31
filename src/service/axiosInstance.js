import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8080",
  withCredentials: true,
});

const refreshTokenAxios = axios.create({
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
    const originalRequest = error.config; //The original request

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; //To prevent infinite loop

      try {
        const newAccessToken = await refreshTokenAxios.get(
          "/user/refresh-token"
        );

        // Change the access token with the newly generated one
        if (newAccessToken !== null) {
          setAccessToken(newAccessToken.data);

          // Set the new Access Token in the AuthContext
          updateReactContextAccessToken({
            accessToken: newAccessToken.data,
          });

          // Set the new Access Token in the localStorage
          localStorage.removeItem("accessToken");
          localStorage.setItem("accessToken", newAccessToken.data);

          // Change the accessToken in the original request
          originalRequest.headers.Authorization = `Bearer ${newAccessToken.data}`;

          return axios(originalRequest);
        }
      } catch (error) {
        if (error.response?.status === 401) {
          updateReactContextAccessToken(null);
          localStorage.removeItem("accessToken");

          return Promise.reject(error);
        }
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
