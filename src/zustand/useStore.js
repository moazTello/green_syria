import { create } from "zustand";
import { axiosPrivate } from "../api/DataTransfer";
import DataTransfer from "../api/DataTransfer";
const useStore = create((set) => ({
  user: JSON.parse(sessionStorage.getItem("user")) || null,
  setUser: (user) => {
    sessionStorage.setItem("user", JSON.stringify(user));
    set({ user });
  },
  clearUser: () => {
    sessionStorage.removeItem("user");
    set({ user: null });
  },

  token: sessionStorage.getItem("accessT") || "",
  setToken: (token) => set({ token }),
  isLoading: false,
  setLoading: (loading) => set({ isLoading: loading }),
  error: null,
  setError: (error) => set({ error }),

  OrganizData: JSON.parse(sessionStorage.getItem("organization")) || [],
  setOrganizData: (OrganizData) => {
    JSON.parse(sessionStorage.getItem("user")).role === "AssistentAdmin" &&
      sessionStorage.setItem("organization", JSON.stringify(OrganizData));
    set({ OrganizData });
  },

  logoutMaster: async () => {
    set({ isLoading: true, error: null });
    try {
      await axiosPrivate.get("/api/masterAdmin/logout", {
        headers: {
          Authorization: `Bearer ${useStore.getState().token}`,
        },
      });
      set({ isLoading: false });
    } catch (error) {
      console.log(error);
      set({ error: error.message, isLoading: false });
    }
  },

  logoutOrg: async () => {
    set({ isLoading: true, error: null });
    try {
      await axiosPrivate.get("/api/organization/logout", {
        headers: {
          Authorization: `Bearer ${useStore.getState().token}`,
        },
      });
      set({ isLoading: false });
    } catch (error) {
      console.log(error);
      set({ error: error.message, isLoading: false });
    }
  },

  addAdmin: async (data) => {
    set({ isLoading: true, error: null });
    try {
      const response = await DataTransfer.post("/api/admin/createAdmin", data, {
        headers: {
          Authorization: `Bearer ${useStore.getState().token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      set({ isLoading: false });
      console.log(response);
      return response;
    } catch (error) {
      console.log(error);
      set({ error: error.message, isLoading: false });
      return error;
    }
  },

  addAdminAssisstent: async (data) => {
    set({ isLoading: true, error: null });
    try {
      const response = await DataTransfer.post(
        "/api/admin/createAssAdmin",
        data,
        {
          headers: {
            Authorization: `Bearer ${useStore.getState().token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      set({ isLoading: false });
      console.log(response);
      return response;
    } catch (error) {
      set({ error: error.message, isLoading: false });
      console.log(error);
      return error;
    }
  },


  addVolunteer: async (data) => {
    set({ isLoading: true, error: null });
    try {
      const response = await DataTransfer.post("/api/admin/createVolunteer", data, {
        headers: {
          Authorization: `Bearer ${useStore.getState().token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      set({ isLoading: false });
      console.log(response);
      return response;
    } catch (error) {
      console.log(error);
      set({ error: error.message, isLoading: false });
      return error;
    }
  },

  volunteersList: [],
  setVolunteersList: (volunteersList) => set({ volunteersList }),

  fetchVolunteersList: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosPrivate.get(
        "api/admin/getAllVolunteers?page=1&per_page=50",
        {
          headers: {
            Authorization: `Bearer ${useStore.getState().token}`,
          },
        }
      );
      set({ volunteersList: response.data.yesVolunteers, isLoading: false });
      console.log(response)
    } catch (error) {
      console.log(error);
      set({ error: error.message, isLoading: false });
    }
  },


  plantStoresList: [],
  setPlantStoresList: (plantStoresList) => set({ plantStoresList }),
  
  fetchPlantStoresList: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosPrivate.get(
        "api/admin/getAllPlanstores?page=1&per_page=50",
        {
          headers: {
            Authorization: `Bearer ${useStore.getState().token}`,
          },
        }
      );
      console.log(response)
      set({ plantStoresList: response.data.yesPlan, isLoading: false });
    } catch (error) {
      console.log(error);
      set({ error: error.message, isLoading: false });
    }
  },

  addPlantStore: async (data) => {
    set({ isLoading: true, error: null });
    try {
      const response = await DataTransfer.post("/api/admin/createPlanstore", data, {
        headers: {
          Authorization: `Bearer ${useStore.getState().token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      set({ isLoading: false });
      console.log(response);
      return response;
    } catch (error) {
      console.log(error);
      set({ error: error.message, isLoading: false });
      return error;
    }
  },

  DeleteVolunteer: async (id) => {
    set({ isLoading: true, error: null });
    try {
      const response = await DataTransfer.delete(
        `/api/admin/deleteVolunteer/${id}`,
        {
          headers: {
            Authorization: `Bearer ${useStore.getState().token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      set({ isLoading: false });
      return response;
    } catch (error) {
      console.log(error);
      set({ error: error.message, isLoading: false });
    }
  },
  DeletePlantStore: async (id) => {
    set({ isLoading: true, error: null });
    try {
      const response = await DataTransfer.delete(
        `/api/admin/deletePlanstore/${id}`,
        {
          headers: {
            Authorization: `Bearer ${useStore.getState().token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      set({ isLoading: false });
      return response;
    } catch (error) {
      console.log(error);
      set({ error: error.message, isLoading: false });
    }
  },


  addEvent: async (data) => {
    set({ isLoading: true, error: null });
    try {
      const response = await DataTransfer.post("/api/admin/createEvent", data, {
        headers: {
          Authorization: `Bearer ${useStore.getState().token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      set({ isLoading: false });
      console.log(response);
      return response;
    } catch (error) {
      console.log(error);
      set({ error: error.message, isLoading: false });
      return error;
    }
  },
  eventsList: [],
  setEventsList: (eventsList) => set({ eventsList }),
  
  fetchEventsList: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosPrivate.get(
        "api/admin/getEvents",
        {
          headers: {
            Authorization: `Bearer ${useStore.getState().token}`,
          },
        }
      );
      console.log(response)
      set({ eventsList: response.data.allEvents, isLoading: false });
    } catch (error) {
      console.log(error);
      set({ error: error.message, isLoading: false });
    }
  },
  DeleteEvent: async (id) => {
    set({ isLoading: true, error: null });
    try {
      const response = await DataTransfer.delete(
        `/api/admin/deleteEvent/${id}`,
        {
          headers: {
            Authorization: `Bearer ${useStore.getState().token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      set({ isLoading: false });
      return response;
    } catch (error) {
      console.log(error);
      set({ error: error.message, isLoading: false });
    }
  },
  
  fetchElement: async (id,type) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosPrivate.get(
        `api/admin/getperson/${id}/${type}`,
        {
          headers: {
            Authorization: `Bearer ${useStore.getState().token}`,
          },
        }
      );
      console.log(response)
      set({ isLoading: false });
      return response.data
    } catch (error) {
      console.log(error);
      set({ error: error.message, isLoading: false });
    }
  },

  EditPlantStoreApi: async (data, id) => {
    set({ isLoading: true, error: null });
    try {
      const response = await DataTransfer.post(`/api/admin/updatePlanstore/${id}`, data, {
        headers: {
          Authorization: `Bearer ${useStore.getState().token}`,
          // 'Content-Type': 'application/json',
          "Content-Type": "multipart/form-data",
          _method: "put",
        },
      });
      set({ isLoading: false });
      return response;
    } catch (error) {
      console.log(error);
      set({ error: error.message, isLoading: false });
    }
  },

  EditVolunteerApi: async (data, id) => {
    set({ isLoading: true, error: null });
    try {
      const response = await DataTransfer.post(`/api/admin/updateVolunteer/${id}`, data, {
        headers: {
          Authorization: `Bearer ${useStore.getState().token}`,
          // 'Content-Type': 'application/json',
          "Content-Type": "multipart/form-data",
          _method: "put",
        },
      });
      set({ isLoading: false });
      return response;
    } catch (error) {
      console.log(error);
      set({ error: error.message, isLoading: false });
    }
  },

}));

export default useStore;
