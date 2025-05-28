import axios from "axios";

export const registerUser = (formData) => {
  return axios.post(
    "http://localhost:8080/user/register",
    JSON.stringify(formData), //data
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};

export const loginUser = (formData) => {
  return axios.post(
    "http://localhost:8080/user/login",
    JSON.stringify(formData),
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};
