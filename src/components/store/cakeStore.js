import axios from "axios";
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

export const useCakeStore = create(
  devtools(
    immer((set) => ({
      cakeData: [],

      getCakesAPI: async () => {
        set((state) => {
          return localStorage.getItem("cakes")
            ? JSON.parse(localStorage.getItem("cakes"))
            : [];
        });
      },
      addCakeAPI: async (payload) => {
        set((state) => {
          state.cakeData.push(payload);
          localStorage.setItem("cakes", JSON.stringify(state.cakeData));
        });
      },
      updateCakeAPI: async (payload) => {
        set((state) => {
          let cakeState = state.cakeData.filter((c) => c.id !== payload.id);
          cakeState.cakeData.push(payload);
          state.cakeData = cakeState;
        });
      },
      deleteCakeAPI: async (id) => {
        set((state) => {
          state.cakeData = state.cakeData.filter((c) => c.id !== id);
        });
      },

      // methods using API calls
      //   const apiResponse = await axios.get("");
      // getCakesAPI: async () => {
      //   set((state) => {
      //     state.cakeData = apiResponse.data;
      //   });
      // },
      // addCakeAPI: async (payload) => {
      //   // const apiResponse = await axios.post("", payload);
      //   set((state) => {
      //     state.cakeData.push(apiResponse.data);
      //   });
      // },
      // updateCakeAPI: async (payload) => {
      //   const apiResponse = await axios.put(
      //     `http://localhost:8003/cakes/${payload.id}`,
      //     payload
      //   );
      //   set((state) => {
      //     let cakeState = state.cakeData.filter((c) => c.id !== payload.id);
      //     cakeState.cakeData.push(apiResponse.data);
      //     state.cakeData = cakeState;
      //   });
      // },
      // deleteCakeAPI: async (id) => {
      //   const apiResponse = await axios.delete(`http://localhost:8003/cakes/${id}`);
      //   set((state) => {
      //     state.cakeData = state.cakeData.filter((c) => c.id !== id);
      //   });
      // },
    }))
  )
);

export const getCakeById = (id) => {
  return (state) => {
    let cake = state.cakeData.filter((c) => c.id === Number(id));
    if (cake) {
      return cake[0];
    }
    return null;
  };
};
