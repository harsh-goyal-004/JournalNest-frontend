import axiosInstance from "./axiosInstance";

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

export const getAllEntries = () => {
  return axiosInstance.get("/api/journal/get-all-entries");
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
