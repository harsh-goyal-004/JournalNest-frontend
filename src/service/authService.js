import axiosInstance from "./axiosInstance";
import qs from "qs";

export const registerUser = (formData) => {
  return axiosInstance.post("/user/register", JSON.stringify(formData), {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const loginUser = (formData) => {
  return axiosInstance.post("/user/login", JSON.stringify(formData), {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const createJournalEntry = (formData) => {
  return axiosInstance.post(
    "/api/journal/create-journal-entry",
    JSON.stringify(formData),
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};

export const getAllEntries = (page) => {
  return axiosInstance.get(`/api/journal/get-all-entries?page=${page}`);
};

export const getAnalyticsSummary = () => {
  return axiosInstance.get("/analytics/summary");
};

export const toggleStarredEntries = (data) => {
  return axiosInstance.put("/api/journal/toggle-starred", data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const getStarredEntries = () => {
  return axiosInstance.get("/api/journal/get-starred-entries");
};

export const getUserInfo = () => {
  return axiosInstance.get("/user/get-user-info");
};

export const handleUserInfo = (data) => {
  return axiosInstance.put("/user/update-user-info", data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const handleProfileImageUpload = (data) => {
  return axiosInstance.put("/user/upload-profile-pic", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const deleteJournalEntryById = (id) => {
  return axiosInstance.delete(`/api/journal/delete-journal-entry/${id}`);
};

export const updateJournalEntryById = (id, data) => {
  return axiosInstance.put(`/api/journal/update-journal-entry/${id}`, data, {
    headers: { "Content-Type": "application/json" },
  });
};

export const searchJournalEntry = (search) => {
  return axiosInstance.get("/api/journal/search-journal", {
    params: search,
    paramsSerializer: (search) => {
      return qs.stringify(search, { arrayFormat: "repeat" });
    },
    headers: { "Content-Type": "application/json" },
  });
};
