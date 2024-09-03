import axios from "axios";
import { API_BASE_URL } from "../../config";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const register = async (userData) => {
  const response = await api.post("/auth/register", userData);
  return response.data;
};

export const login = async (userData) => {
  const response = await api.post("/auth/login", userData);
  return response.data;
};

export const getUser = async () => {
  const response = await api.get("/auth/user");
  return response.data;
};

export const fetchUsers = async () => {
  try {
    const response = await api.get(`${API_BASE_URL}/users/all`);
    if (response.status === 200) {
      return response.data.users;
    }
  } catch (err) {
    console.log(err);
  }
};

export const fetchUser = async (id) => {
  try {
    const response = await api.get(`${API_BASE_URL}/users/${id}`);
    if (response.status === 200) {
      console.log(response.data.user);
      return response.data.user;
    }
  } catch (err) {
    console.log(err);
  }
};

export const updateUser = async (id, updatedUser) => {
  console.log(id, updatedUser);
  try {
    const response = await api.put(`${API_BASE_URL}/users/${id}`, updatedUser);
    if (response.status === 200) {
      console.log("updated user info");
      return true;
    }
  } catch (err) {
    console.log(err);
  }
};

export const fetchClientsOfAllUsers = async () => {
  try {
    const response = await api.get(`${API_BASE_URL}/clients/allClients`);
    if (response.status === 200) {
      return response.data.clients;
    }
  } catch (err) {
    console.log(err);
  }
};

export const fetchClients = async () => {
  try {
    const response = await api.get(`${API_BASE_URL}/clients/all`);
    if (response.status === 200) {
      return response.data.clients;
    }
  } catch (err) {
    console.log(err);
  }
};

export const fetchClient = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/clients/${id}`, {
      headers: { "Content-Type": "application/json" },
    });
    if (response.status === 200) {
      console.log(response.data.client);
      return response.data.client;
    }
  } catch (err) {
    console.log(err);
  }
};

export const addClient = async (clientInfo) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/clients/new`,
      clientInfo,
      { headers: { "Content-Type": "application/json" } }
    );
    if (response.status === 201) {
      console.log("CLIENT ADDED");
      return true;
    }
  } catch (err) {
    console.log(err);
  }
};

export const updateClientInfo = async (updatedClientInfo) => {
  console.log(updatedClientInfo);
  try {
    const response = await axios.put(
      `${API_BASE_URL}/clients/${updatedClientInfo._id}`,
      updatedClientInfo,
      { headers: { "Content-Type": "application/json" } }
    );
    if (response.status === 200) {
      console.log("updated client info");
    }
  } catch (err) {
    console.log(err);
  }
};

export const deleteClient = async (clientId) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/clients/${clientId}`, {
      headers: { "Content-Type": "application/json" },
    });
    if (response.status === 200) {
      console.log("deleted client successfully");
    }
  } catch (err) {
    console.log(err);
  }
};

//Content apis
export const fetchMessages = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/content/all`, {
      headers: { "Content-Type": "application/json" },
    });
    if (response.status === 200) {
      console.log(response.data.content[0].messages);
      return response.data.content[0].messages;
    }
  } catch (err) {
    console.log(err);
  }
};

export const addMessage = async (message) => {
  console.log(message);
  try {
    const response = await axios.post(
      `${API_BASE_URL}/content/message`,
      message,
      { headers: { "Content-Type": "application/json" } }
    );
    if (response.status === 201) {
      console.log("MESSAGE ADDED");
      return true;
    }
  } catch (err) {
    console.log(err);
  }
};

export const updateMessage = async (updatedMessage) => {
  console.log(updatedMessage);
  try {
    const response = await axios.put(
      `${API_BASE_URL}/content/message/${updatedMessage._id}`,
      updatedMessage,
      { headers: { "Content-Type": "application/json" } }
    );
    if (response.status === 200) {
      console.log("updated message template");
      return true;
    }
  } catch (err) {
    console.log(err);
  }
};

export const deleteMessage = async (messageId) => {
  try {
    const response = await axios.delete(
      `${API_BASE_URL}/content/message/${messageId}`,
      { headers: { "Content-Type": "application/json" } }
    );
    if (response.status === 200) {
      console.log("deleted message successfully");
    }
  } catch (err) {
    console.log(err);
  }
};

export const fetchFiles = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/content/file/all`);
    return response.data;
  } catch (error) {
    console.error("Error fetching files:", error);
  }
};

export const fetchFile = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/content/file/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching file details:", error);
  }
};

export const uploadFile = async (file) => {
  console.log("Uploading file:", file);
  try {
    const response = await axios.post(
      `${API_BASE_URL}/content/file/upload`,
      file,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data.file;
  } catch (error) {
    console.error("Error uploading file:", error);
  }
};

export const updateFileData = async (updatedFile) => {
  console.log("Updating file:", updatedFile);
  try {
    const response = await axios.put(
      `${API_BASE_URL}/content/file/${updatedFile._id}`,
      updatedFile,
      { headers: { "Content-Type": "application/json" } }
    );
    if (response.status === 200) {
      console.log("updated file details");
      return true;
    }
  } catch (err) {
    console.log(err);
  }
};

export const deleteFile = async (id) => {
  try {
    await axios.delete(`${API_BASE_URL}/content/file/${id}`);
    return true;
  } catch (error) {
    console.error("Error deleting file:", error);
  }
};

export const fetchPages = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/content/page/all`);
    return response.data.pages;
  } catch (error) {
    console.error("Error fetching pages:", error);
  }
};

export const fetchPage = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/content/page/${id}`);
    return response.data.page;
  } catch (error) {
    console.error("Error fetching page details:", error);
  }
};

export const addPage = async (pageData) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/content/page`,
      pageData,
      { headers: { "Content-Type": "multipart/form-data" } }
    );
    if (response.status === 201) {
      console.log("Page Added");
      return true;
    }
  } catch (error) {
    console.error("Error adding new page template: ", error);
  }
};

export const updatePage = async (id, updatedPageData) => {
  try {
    const response = await axios.put(
      `${API_BASE_URL}/content/page/${id}`,
      updatedPageData,
      { headers: { "Content-Type": "multipart/form-data" } }
    );
    if (response.status === 200) {
      console.log("updated page data");
      return true;
    }
  } catch (error) {
    console.log("Error updating page data: ", error);
  }
};

export const updatePageData = async (updatedPage) => {
  console.log("Updating page", updatedPage);
  try {
    const response = await api.put(
      `${API_BASE_URL}/content/page/${updatedPage._id}`,
      updatedPage
    );
    if (response.status === 200) {
      console.log("updated page template");
      return true;
    }
  } catch (error) {
    console.log("Error updating page template: ", error);
  }
};

export const deletePage = async (id) => {
  try {
    await axios.delete(`${API_BASE_URL}/content/page/${id}`);
    return true;
  } catch (error) {
    console.error("Error deleting page: ", error);
  }
};

export default api;
