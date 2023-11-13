import { useCakeStore } from "../../../components/store/cakeStore";
import { renderHook } from "@testing-library/react-hooks";

jest.mock("zustand");

describe("Zustand's cake store", () => {
  describe("getCakesAPI", () => {
    it("should return the cakes data from local storage", async () => {
      // Mock local storage
      jest
        .spyOn(localStorage, "getItem")
        .mockImplementation(() => JSON.stringify([{ name: "Chocolate Cake" }]));

      // Render the hook
      const { result } = renderHook(() => useCakeStore());

      // Call the getCakesAPI function
      await result.current.getCakesAPI();

      // Expect the cake data to be in the state
      expect(result.current.cakeData).toEqual([{ name: "Chocolate Cake" }]);
    });
  });
  describe("addCakeAPI", () => {
    it("should add a new cake to the state and local storage", async () => {
      jest.spyOn(localStorage, "setItem").mockImplementation(() => {});

      const { result } = renderHook(() => useCakeStore());

      const newCake = { name: "Chocolate Cake", price: 10 };

      await result.current.addCakeAPI(newCake);

      expect(result.current.cakeData).toEqual([newCake]);

      expect(localStorage.setItem).toHaveBeenCalledWith(
        "cakes",
        JSON.stringify([newCake])
      );
    });
  });

  describe("updateCakeAPI", () => {
    it("should update the cake in the state and local storage", async () => {
      jest.spyOn(localStorage, "setItem").mockImplementation(() => {});

      const { result } = renderHook(() => useCakeStore());

      const cake1 = { id: 1, name: "Chocolate Cake", price: 10 };
      const cake2 = { id: 2, name: "Vanilla Cake", price: 15 };

      result.current.cakeData = [cake1, cake2];

      const updatedCake1 = { id: 1, name: "Strawberry Cake", price: 12 };
      await result.current.updateCakeAPI(updatedCake1);

      // Expect the first cake to be updated in the state
      expect(result.current.cakeData[0]).toEqual(updatedCake1);

      // Expect the first cake to be updated in local storage
      expect(localStorage.setItem).toHaveBeenCalledWith(
        "cakes",
        JSON.stringify([updatedCake1, cake2])
      );
    });
  });

  describe("deleteCakeAPI", () => {
    it("should delete the cake from the state and local storage", async () => {
      jest.spyOn(localStorage, "setItem").mockImplementation(() => {});

      const { result } = renderHook(() => useCakeStore());

      const cake1 = { id: 1, name: "Chocolate Cake", price: 10 };
      const cake2 = { id: 2, name: "Vanilla Cake", price: 15 };

      result.current.cakeData = [cake1, cake2];

      // Delete the first cake
      await result.current.deleteCakeAPI(1);

      // Expect the first cake to be deleted from the state
      expect(result.current.cakeData).toEqual([cake2]);

      // Expect the first cake to be deleted from local storage
      expect(localStorage.setItem).toHaveBeenCalledWith(
        "cakes",
        JSON.stringify([cake2])
      );
    });
  });
});

describe("getCakeById", () => {
  it("should return the cake with the given ID", async () => {
    const { result } = renderHook(() => useCakeStore());

    const cake1 = { id: 1, name: "Chocolate Cake", price: 10 };
    const cake2 = { id: 2, name: "Vanilla Cake", price: 15 };

    result.current.cakeData = [cake1, cake2];

    // Get the first cake by ID
    const firstCake = getCakeById(1)(result.current);
    // Expect the first cake to be returned
    expect(firstCake).toEqual(cake1);
  });

  it("should return null if the cake with the given ID does not exist", async () => {
    // Render the hook
    const { result } = renderHook(() => useCakeStore());
    const cake1 = { id: 1, name: "Chocolate Cake", price: 10 };
    const cake2 = { id: 2, name: "Vanilla Cake", price: 15 };

    result.current.cakeData = [cake1, cake2];

    // Get the cake with an invalid ID
    const invalidCake = getCakeById(3)(result.current);

    // Expect null to be returned
    expect(invalidCake).toBeNull();
  });
});
