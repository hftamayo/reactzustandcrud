import React from "react";
import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import App from "../containers/App";

test("renders App component within BrowserRouter", () => {
  const { getByTestId } = render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );

  // Check if the App component renders within BrowserRouter
  const appComponent = getByTestId("app-component");
  expect(appComponent).toBeInTheDocument();
});
