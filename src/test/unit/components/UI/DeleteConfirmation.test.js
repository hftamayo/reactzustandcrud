import React from "react";
import { render } from "@testing-library/react";
import DeleteConfirmation from "../../../../components/UI/DeleteConfirmation";

describe("DeleteConfirmation component", () => {
    it("should render the modal with the expected title and body", () => {
      const { getByText } = render(
        <DeleteConfirmation
          showModal={true}
          title="Delete Confirmation"
          body="Are you sure to delete this item?"
          closeDeleteConfirmationModalHandler={() => {}}
          deleteConfirmHandler={() => {}}
        />
      );

      const modalTitle = getByText("Delete Confirmation");
      expect(modalTitle).toBeInTheDocument();
  
      const modalBody = getByText("Are you sure to delete this item?");
      expect(modalBody).toBeInTheDocument();
    });

    it("should render the close and confirm delete buttons", () => {
        const { getByRole } = render(
          <DeleteConfirmation
            showModal={true}
            title="Delete Confirmation"
            body="Are you sure to delete this item?"
            closeDeleteConfirmationModalHandler={() => {}}
            deleteConfirmHandler={() => {}}
          />
        );
    
        const closeButton = getByRole("button", { name: "Close" });
        expect(closeButton).toBeInTheDocument();
    
        const confirmDeleteButton = getByRole("button", { name: "Confirm Delete" });
        expect(confirmDeleteButton).toBeInTheDocument();
      });
    });