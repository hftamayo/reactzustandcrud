import React from "react";
import { render } from "@testing-library/react";
import Layout from "../../../../components/UI/Layout";

describe("Layout component", () => {
  it("should render the navbar with the expected content", () => {
    const { getByText, getByRole } = render(<Layout />);

    const navbarBrand = getByText("Cake Store");
    expect(navbarBrand).toBeInTheDocument();

    const catalogLink = getByRole("link", { name: "Catalog" });
    expect(catalogLink).toHaveAttribute("href", "/view-cake");

    const customizeLink = getByRole("link", { name: "Customize" });
    expect(customizeLink).toHaveAttribute("href", "#customize");

    const pricingLink = getByRole("link", { name: "Pricing" });
    expect(pricingLink).toHaveAttribute("href", "#pricing");
  });

  it("should render the container for the child components", () => {
    const { getByRole } = render(<Layout />);

    const mainContainer = getByRole("main");
    expect(mainContainer).toBeInTheDocument();
  });
});
