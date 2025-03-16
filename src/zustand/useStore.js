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

  logoutAdmin: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosPrivate.get("/api/logout", {
        headers: {
          Authorization: `Bearer ${useStore.getState().token}`,
        },
      });
      set({ isLoading: false });
      console.log(response);
      return response;
    } catch (error) {
      console.log(error);
      set({ error: error.message, isLoading: false });
    }
  },

  //-------------------------------------------------------------------------------------Admin
  AdminsList: [],
  setAdminsList: (AdminsList) => set({ AdminsList }),

  fetchAdminsList: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosPrivate.get(
        "api/admin/getAllAdminAss?page=1&per_page=50",
        {
          headers: {
            Authorization: `Bearer ${useStore.getState().token}`,
          },
        }
      );
      console.log(response);
      set({ AdminsList: response.data.allAdminAss, isLoading: false });
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

  EditAdmin: async (data, id) => {
    set({ isLoading: true, error: null });
    try {
      const response = await DataTransfer.post(
        `/api/admin/updateAdmin/${id}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${useStore.getState().token}`,
            // 'Content-Type': 'application/json',
            "Content-Type": "multipart/form-data",
            _method: "put",
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

  EditAdminAss: async (data, id) => {
    set({ isLoading: true, error: null });
    try {
      const response = await DataTransfer.post(
        `/api/admin/updateAssAdmin/${id}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${useStore.getState().token}`,
            // 'Content-Type': 'application/json',
            "Content-Type": "multipart/form-data",
            _method: "put",
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

  DeleteAdmin: async (id) => {
    set({ isLoading: true, error: null });
    try {
      const response = await DataTransfer.delete(
        `/api/admin/deleteAssAdmin/${id}`,
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

  //-------------------------------------------------------------------------------------Volunteer
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
      console.log(response);
    } catch (error) {
      console.log(error);
      set({ error: error.message, isLoading: false });
    }
  },

  addVolunteer: async (data) => {
    set({ isLoading: true, error: null });
    try {
      const response = await DataTransfer.post(
        "/api/admin/createVolunteer",
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
      console.log(error);
      set({ error: error.message, isLoading: false });
      return error;
    }
  },

  EditVolunteerApi: async (data, id) => {
    set({ isLoading: true, error: null });
    try {
      const response = await DataTransfer.post(
        `/api/admin/updateVolunteer/${id}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${useStore.getState().token}`,
            // 'Content-Type': 'application/json',
            "Content-Type": "multipart/form-data",
            _method: "put",
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

  volunteerWorksList: [],
  setVolunteerWorksList: (volunteerWorksList) => set({ volunteerWorksList }),

  fetchVolunteerWorksList: async (id) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosPrivate.get(
        `api/admin/getvolunteerWorks/${id}?page=1&per_page=50`,
        {
          headers: {
            Authorization: `Bearer ${useStore.getState().token}`,
          },
        }
      );
      console.log(response);
      set({ volunteerWorksList: response.data, isLoading: false });
    } catch (error) {
      console.log(error);
      set({ error: error.message, isLoading: false });
    }
  },

  volunteersWaitingList: [],
  setVolunteersWaitingList: (volunteersWaitingList) => set({ volunteersWaitingList }),

  fetchVolunteersWaitingList: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosPrivate.get(
        "api/admin/getAllVolunteersWaiting?page=1&per_page=50",
        {
          headers: {
            Authorization: `Bearer ${useStore.getState().token}`,
          },
        }
      );
      console.log(response);
      set({ volunteersWaitingList: response?.data?.allVolunteers, isLoading: false });
    } catch (error) {
      console.log(error);
      set({ error: error.message, isLoading: false });
    }
  },

  //------------------------------------------------------------------------------------PlantStore
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
      console.log(response);
      set({ plantStoresList: response.data.yesPlan, isLoading: false });
    } catch (error) {
      console.log(error);
      set({ error: error.message, isLoading: false });
    }
  },

  addPlantStore: async (data) => {
    set({ isLoading: true, error: null });
    try {
      const response = await DataTransfer.post(
        "/api/admin/createPlanstore",
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
      console.log(error);
      set({ error: error.message, isLoading: false });
      return error;
    }
  },

  EditPlantStoreApi: async (data, id) => {
    set({ isLoading: true, error: null });
    try {
      const response = await DataTransfer.post(
        `/api/admin/updatePlanstore/${id}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${useStore.getState().token}`,
            // 'Content-Type': 'application/json',
            "Content-Type": "multipart/form-data",
            _method: "put",
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

  plantStoresWaitingList: [],
  setPlantStoresWaitingList: (plantStoresWaitingList) => set({ plantStoresWaitingList }),

  fetchPlantStoresWaitingList: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosPrivate.get(
        "api/admin/getAllPlanstoresWaiting?page=1&per_page=50",
        {
          headers: {
            Authorization: `Bearer ${useStore.getState().token}`,
          },
        }
      );
      console.log(response);
      set({ plantStoresWaitingList: response?.data?.allPlanstores, isLoading: false });
    } catch (error) {
      console.log(error);
      set({ error: error.message, isLoading: false });
    }
  },

  approvePlantStore: async (data) => {
    set({ isLoading: true, error: null });
    try {
      const response = await DataTransfer.post(
        "/api/admin/approvePlanOrVolun",
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
      console.log(error);
      set({ error: error.message, isLoading: false });
      return error;
    }
  },

  //-------------------------------------------------------------------------------------Events
  eventsList: [],
  setEventsList: (eventsList) => set({ eventsList }),

  fetchEventsList: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosPrivate.get("api/admin/getEvents", {
        headers: {
          Authorization: `Bearer ${useStore.getState().token}`,
        },
      });
      console.log(response);
      set({ eventsList: response.data.allEvents, isLoading: false });
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

  //-------------------------------------------------------------------------------------all
  fetchElement: async (id, type) => {
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
      console.log(response);
      set({ isLoading: false });
      return response.data;
    } catch (error) {
      console.log(error);
      set({ error: error.message, isLoading: false });
    }
  },

  //-------------------------------------------------------------------------------------trees
  plantStoreTreesList: [],
  setPlantStoreTreesList: (plantStoreTreesList) => set({ plantStoreTreesList }),

  fetchPlantStoreTreesList: async (id) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosPrivate.get(
        `api/admin/getPlanstoreTrees/${id}?page=1&per_page=50`,
        {
          headers: {
            Authorization: `Bearer ${useStore.getState().token}`,
          },
        }
      );
      console.log(response);
      set({ plantStoreTreesList: response.data, isLoading: false });
    } catch (error) {
      console.log(error);
      set({ error: error.message, isLoading: false });
    }
  },

  addPlantStoreTree: async (data, id) => {
    set({ isLoading: true, error: null });
    try {
      const response = await DataTransfer.post(
        `/api/admin/createTree/${id}`,
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
      console.log(error);
      set({ error: error.message, isLoading: false });
      return error;
    }
  },

  DeletePlantStoreTree: async (id) => {
    set({ isLoading: true, error: null });
    try {
      const response = await DataTransfer.delete(
        `/api/admin/deleteTree/${id}`,
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

  //-------------------------------------------------------------------------------------Categories

  categoriesList: [],
  setCategoriesList: (categoriesList) => set({ categoriesList }),

  fetchCategoriesList: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosPrivate.get(`api/admin/getCategories`, {
        headers: {
          Authorization: `Bearer ${useStore.getState().token}`,
        },
      });
      console.log(response);
      set({ categoriesList: response.data.allCategories, isLoading: false });
    } catch (error) {
      console.log(error);
      set({ error: error.message, isLoading: false });
    }
  },

  addCategory: async (data) => {
    set({ isLoading: true, error: null });
    try {
      const response = await DataTransfer.post(
        `/api/admin/createcategory`,
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
      console.log(error);
      set({ error: error.message, isLoading: false });
      return error;
    }
  },

  EditCategory: async (data, id) => {
    set({ isLoading: true, error: null });
    try {
      const response = await DataTransfer.post(
        `/api/admin/updateCategory/${id}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${useStore.getState().token}`,
            // 'Content-Type': 'application/json',
            "Content-Type": "multipart/form-data",
            _method: "put",
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

  DeleteCategory: async (id) => {
    set({ isLoading: true, error: null });
    try {
      const response = await DataTransfer.delete(
        `/api/admin/deleteCategory/${id}`,
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

  //-------------------------------------------------------------------------------------Works
  worksList: [],
  setWorksList: (worksList) => set({ worksList }),

  fetchWorksList: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosPrivate.get(
        `api/admin/getWorks?page=1&per_page=50`,
        {
          headers: {
            Authorization: `Bearer ${useStore.getState().token}`,
          },
        }
      );
      console.log(response);
      set({ worksList: response.data, isLoading: false });
    } catch (error) {
      console.log(error);
      set({ error: error.message, isLoading: false });
    }
  },
  // DeleteWork: async (id) => {
  //   set({ isLoading: true, error: null });
  //   try {
  //     const response = await DataTransfer.delete(
  //       `/api/admin/deleteCategory/${id}`,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${useStore.getState().token}`,
  //           "Content-Type": "multipart/form-data",
  //         },
  //       }
  //     );
  //     set({ isLoading: false });
  //     return response;
  //   } catch (error) {
  //     console.log(error);
  //     set({ error: error.message, isLoading: false });
  //   }
  // },
  // EditWork: async (data, id) => {
  //   set({ isLoading: true, error: null });
  //   try {
  //     const response = await DataTransfer.post(`/api/admin/updateCategory/${id}`, data, {
  //       headers: {
  //         Authorization: `Bearer ${useStore.getState().token}`,
  //         // 'Content-Type': 'application/json',
  //         "Content-Type": "multipart/form-data",
  //         _method: "put",
  //       },
  //     });
  //     set({ isLoading: false });
  //     return response;
  //   } catch (error) {
  //     console.log(error);
  //     set({ error: error.message, isLoading: false });
  //   }
  // },

  //-------------------------------------------------------------------------------------Articles
  articlesList: [],
  setArticlesList: (articlesList) => set({ articlesList }),

  fetchArticlesList: async (id) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosPrivate.get(
        `api/admin/getArticlesOfCategory/${id}?page=1&per_page=50`,
        {
          headers: {
            Authorization: `Bearer ${useStore.getState().token}`,
          },
        }
      );
      console.log(response);
      set({ articlesList: response.data.allArticles, isLoading: false });
    } catch (error) {
      console.log(error);
      set({ error: error.message, isLoading: false });
    }
  },

  addArticle: async (data, id) => {
    set({ isLoading: true, error: null });
    try {
      const response = await DataTransfer.post(
        `/api/admin/createArticles/${id}`,
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
      console.log(error);
      set({ error: error.message, isLoading: false });
      return error;
    }
  },

  // EditArticle: async (data, id) => {
  //   set({ isLoading: true, error: null });
  //   try {
  //     const response = await DataTransfer.post(
  //       `/api/admin/updateCategory/${id}`,
  //       data,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${useStore.getState().token}`,
  //           // 'Content-Type': 'application/json',
  //           "Content-Type": "multipart/form-data",
  //           _method: "put",
  //         },
  //       }
  //     );
  //     set({ isLoading: false });
  //     return response;
  //   } catch (error) {
  //     console.log(error);
  //     set({ error: error.message, isLoading: false });
  //   }
  // },

  DeleteArticle: async (id) => {
    set({ isLoading: true, error: null });
    try {
      const response = await DataTransfer.delete(
        `/api/admin/deleteArticles/${id}`,
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

  trafics:null,
  getTrafics: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await DataTransfer.get(`/api/admin/getTraffic`, {
        headers: {
          Authorization: `Bearer ${useStore.getState().token}`,
          Accept: 'application/json',
        },
      });
      console.log(response)
      set({ trafics: response.data.traffic, isLoading: false });
    } catch (error) {
      console.log(error);
      set({ error: error.message, isLoading: false });
    }
  },
}));

export default useStore;
