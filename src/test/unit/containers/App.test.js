import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "../../../containers/App";

describe("App component", () => {
  it("should render the Home component when the path is '/'", () => {
    const { getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    const homeTitle = getByText("Welcome to Cake Store!");
    expect(homeTitle).toBeInTheDocument();
  });

  it("should render the AllCakes component when the path is '/view-cake'", () => {
    const { getByRole } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
      { initialEntries: ["/view-cake"] }
    );

    const viewCakeTitle = getByText("Catalog");
    expect(viewCakeTitle).toBeInTheDocument();
  });

  it("should render the AddCake component when the path is '/add-cake'", () => {
    const { getByRole } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
      { initialEntries: ["/add-cake"] }
    );

    const addCakeTitle = getByText("Create a New Dessert");
    expect(addCakeTitle).toBeInTheDocument();
  });

  it("should render the EditCake component when the path is '/edit-cake/:id'", () => {
    const { getByRole } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
      { initialEntries: ["/edit-cake/1"] }
    );

    const editCakeTitle = getByText("Update a Dessert");
    expect(editCakeTitle).toBeInTheDocument();
  });
});
