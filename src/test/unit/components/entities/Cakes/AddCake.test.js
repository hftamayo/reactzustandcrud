import React from "react";
import { render, screen } from "@testing-library/react";
import AddCake from "./AddCake";
import { useCakeStore } from "../../../../store/cakeStore";
import { useNavigate } from "react-router-dom";

jest.mock("../../../../store/cakeStore");
jest.mock("react-router-dom");

describe("AddCake component", () => {
  it("should render the form with the correct inputs", () => {
    render(<AddCake />);

    const nameInput = screen.getByLabelText("Name");
    expect(nameInput).toBeInTheDocument();

    const costInput = screen.getByLabelText("Cost");
    expect(costInput).toBeInTheDocument();

    const imgUrlInput = screen.getByLabelText("Image Url");
    expect(imgUrlInput).toBeInTheDocument();
  });

  it("should call the addCakeApiCall function when the 'Add' button is clicked", async () => {
    const mockAddCakeApiCall = jest.fn();
    useCakeStore.mockReturnValue({ addCakeAPI: mockAddCakeApiCall });

    const navigate = { navigate: jest.fn() };
    useNavigate.mockReturnValue(navigate);

    render(<AddCake />);

    const nameInput = screen.getByLabelText("Name");
    nameInput.value = "Chocolate Cake";

    const costInput = screen.getByLabelText("Cost");
    costInput.value = 10;

    const imgUrlInput = screen.getByLabelText("Image Url");
    imgUrlInput.value = "https://example.com/chocolate-cake.jpg";

    const addButton = screen.getByRole("button", { name: "Add" });
    addButton.click();

    await Promise.resolve();

    expect(mockAddCakeApiCall).toHaveBeenCalledWith({
      name: "Chocolate Cake",
      cost: 10,
      imageUrl: "https://example.com/chocolate-cake.jpg",
    });
  });

  it("should redirect to the '/view-cake' page when the 'Add' button is clicked", async () => {
    const mockAddCakeApiCall = jest.fn();
    useCakeStore.mockReturnValue({ addCakeAPI: mockAddCakeApiCall });

    const navigate = { navigate: jest.fn() };
    useNavigate.mockReturnValue(navigate);

    render(<AddCake />);

    const addButton = screen.getByRole("button", { name: "Add" });
    addButton.click();

    await Promise.resolve();

    expect(navigate.navigate).toHaveBeenCalledWith("/view-cake");
  });
});
