import React from "react";
import { render, screen } from "@testing-library/react";
import EditCake from "./EditCake";
import { useCakeStore, getCakeById } from "../../../../store/cakeStore";
import { useNavigate } from "react-router-dom";

jest.mock("../../../../store/cakeStore");
jest.mock("react-router-dom");

describe("EditCake component", () => {
  it("should render the form with the correct inputs pre-filled", () => {
    const mockCakeToEdit = {
      id: 1,
      name: "Chocolate Cake",
      cost: 10,
      imageUrl: "https://example.com/chocolate-cake.jpg",
    };
    useCakeStore.mockReturnValue({
      getCakeById: getCakeById,
      cakeToEdit: mockCakeToEdit,
    });

    const navigate = { navigate: jest.fn() };
    useNavigate.mockReturnValue(navigate);

    render(<EditCake />);

    const nameInput = screen.getByLabelText("Name");
    expect(nameInput.value).toBe(mockCakeToEdit.name);

    const costInput = screen.getByLabelText("Cost");
    expect(costInput.value).toBe(`${mockCakeToEdit.cost}`);

    const imgUrlInput = screen.getByLabelText("Image Url");
    expect(imgUrlInput.value).toBe(mockCakeToEdit.imageUrl);
  });

  it("should call the updateCakeAPI function when the 'Update' button is clicked", async () => {
    const mockUpdateAPICall = jest.fn();
    useCakeStore.mockReturnValue({
      getCakeById: getCakeById,
      cakeToEdit: { id: 1 },
      updateCakeAPI: mockUpdateAPICall,
    });

    const navigate = { navigate: jest.fn() };
    useNavigate.mockReturnValue(navigate);

    render(<EditCake />);

    const nameInput = screen.getByLabelText("Name");
    nameInput.value = "Vanilla Cake";

    const costInput = screen.getByLabelText("Cost");
    costInput.value = 15;

    const imgUrlInput = screen.getByLabelText("Image Url");
    imgUrlInput.value = "https://example.com/vanilla-cake.jpg";

    const updateButton = screen.getByRole("button", { name: "Update" });
    updateButton.click();

    await Promise.resolve();

    expect(mockUpdateAPICall).toHaveBeenCalledWith({
      name: "Vanilla Cake",
      cost: 15,
      imageUrl: "https://example.com/vanilla-cake.jpg",
      id: 1,
    });
  });

  it("should redirect to the '/view-cake' page when the 'Update' button is clicked", async () => {
    const mockUpdateAPICall = jest.fn();
    useCakeStore.mockReturnValue({
      getCakeById: getCakeById,
      cakeToEdit: { id: 1 },
      updateCakeAPI: mockUpdateAPICall,
    });

    const navigate = { navigate: jest.fn() };
    useNavigate.mockReturnValue(navigate);

    render(<EditCake />);

    const updateButton = screen.getByRole("button", { name: "Update" });
    updateButton.click();

    await Promise.resolve();

    expect(navigate.navigate).toHaveBeenCalledWith("/view-cake");
  });
});
