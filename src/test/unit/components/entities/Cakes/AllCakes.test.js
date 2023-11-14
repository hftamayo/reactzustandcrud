import React from "react";
import { render, screen } from "@testing-library/react";
import AllCakes from "./AllCakes";
import { useCakeStore } from "../../../../store/cakeStore";
import { useNavigate } from "react-router-dom";

jest.mock("../../../../store/cakeStore");
jest.mock("react-router-dom");

describe("AllCakes component", () => {
  it("should render the list of cakes", () => {
    const mockCakes = [
      {
        id: 1,
        name: "Chocolate Cake",
        cost: 10,
        imageUrl: "https://example.com/chocolate-cake.jpg",
      },
      {
        id: 2,
        name: "Vanilla Cake",
        cost: 15,
        imageUrl: "https://example.com/vanilla-cake.jpg",
      },
    ];
    useCakeStore.mockReturnValue({
      cakeData: mockCakes,
      getCakesAPI: jest.fn(),
      deleteCakeAPI: jest.fn(),
    });

    const navigate = { navigate: jest.fn() };
    useNavigate.mockReturnValue(navigate);

    render(<AllCakes />);

    const cakes = screen.getAllByRole("card");
    expect(cakes.length).toBe(mockCakes.length);

    const firstCakeTitle = screen.getByText("Chocolate Cake");
    expect(firstCakeTitle).toBeInTheDocument();

    const firstCakePrice = screen.getByText("Price - 10");
    expect(firstCakePrice).toBeInTheDocument();

    const editButton = screen.getByRole("button", { name: "Edit" });
    expect(editButton).toBeInTheDocument();

    const deleteButton = screen.getByRole("button", { name: "Delete" });
    expect(deleteButton).toBeInTheDocument();
  });

  it("should call the openDeleteConfirmationModalHandler function when the 'Delete' button is clicked", () => {
    const mockCakes = [
      {
        id: 1,
        name: "Chocolate Cake",
        cost: 10,
        imageUrl: "https://example.com/chocolate-cake.jpg",
      },
      {
        id: 2,
        name: "Vanilla Cake",
        cost: 15,
        imageUrl: "https://example.com/vanilla-cake.jpg",
      },
    ];
    useCakeStore.mockReturnValue({
      cakeData: mockCakes,
      getCakesAPI: jest.fn(),
      deleteCakeAPI: jest.fn(),
    });

    const navigate = { navigate: jest.fn() };
    useNavigate.mockReturnValue(navigate);

    render(<AllCakes />);

    const deleteButton = screen.getByRole("button", { name: "Delete" });
    deleteButton.click();

    expect(setItemIdToDelete).toHaveBeenCalledWith(1);
    expect(setShowModal).toHaveBeenCalledWith(true);
  });
});
