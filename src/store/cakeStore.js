import axios from "axios";
import { create } from "zustand";

export const useCakeStore = create((set) => ({
  cakeData: [
    {
      id: 1,
      name: "Red Velvet",
      cost: 120,
      imageUrl:
        "https://preppykitchen.com/wp-content/uploads/2022/07/Red-Velvet-Feature-1a.jpg",
    },
    {
      id: 2,
      name: "Cherrie Pie",
      cost: 60,
      imageUrl:
        "https://www.mybakingaddiction.com/wp-content/uploads/2023/08/cherry-pie-with-ice-cream-720x1080.jpg",
    },
    {
      id: 3,
      name: "Apple Pie",
      cost: 50,
      imageUrl:
        "https://hips.hearstapps.com/hmg-prod/images/apple-pie-index-6425bd0363f16.jpg?crop=0.8888888888888888xw:1xh;center,top&resize=1200:*",
    },
    {
      id: 4,
      name: "Chocolate Cake",
      cost: 100,
      imageUrl:
        "https://inbloombakery.com/wp-content/uploads/2023/02/chocolate-ganache-cake_-12.jpg",
    },
  ],
  getCakesAPI: async () => {
    const apiResponse = await axios.get("");
    set((state) => {
      state.cakeData = apiResponse.data;
    });
  },
  addCakeAPI: async (payload) => {
    const apiResponse = await axios.post("", payload);
    set((state) => {
      state.cakeData.push(apiResponse.data);
    });
  },
  updateCakeAPI: async (payload) => {
    const apiResponse = await axios.put(
      `http://localhost:8003/cakes/${payload.id}`,
      payload
    );
    set((state) => {
      let cakeState = state.cakeData.filter((c) => c.id !== payload.id);
      cakeState.cakeData.push(apiResponse.data);
      state.cakeData = cakeState;
    });
  },
  deleteCakeAPI: async (id) => {
    const apiResponse = await axios.delete(`http://localhost:8003/cakes/${id}`);
    set((state) => {
      state.cakeData = state.cakeData.filter((c) => c.id !== id);
    });
  },
}));

export const getCakeById = (id) => {
  return (state) => {
    let cake = state.cakeData.filter((c) => c.id === Number(id));
    if (cake) {
      return cake[0];
    }
    return null;
  };
};
