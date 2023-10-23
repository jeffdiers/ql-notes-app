import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import {
  Workspace,
  WorkspaceContext,
  WorkspaceContextProps,
} from "./workspace"; // Update the import path if needed

// Create a mock function for your context
const mockSetCurrentItem = jest.fn();
const mockAddNote = jest.fn();
const mockAddDirectory = jest.fn();
const mockUpdateNote = jest.fn();
const mockSelectItem = jest.fn();
const mockSetSelectedItems = jest.fn();
const mockDeleteSelectedItems = jest.fn();
const mockDeleteItem = jest.fn();
const mockUpdateChildName = jest.fn();

const mockContextValue: WorkspaceContextProps = {
  currentItem: {
    name: "root",
    type: "directory",
    items: [
      { name: "dir1", type: "directory", items: [] },
      { name: "note1", type: "note", note: "note1" },
    ],
  },
  setCurrentItem: mockSetCurrentItem,
  addNote: mockAddNote,
  addDirectory: mockAddDirectory,
  updateNote: mockUpdateNote,
  selectedItems: ["root/note1"],
  selectItem: mockSelectItem,
  setSelectedItems: mockSetSelectedItems,
  deleteSelectedItems: mockDeleteSelectedItems,
  deleteItem: mockDeleteItem,
  updateChildName: mockUpdateChildName,
};

// Mock the window.confirm function
const originalConfirm = window.confirm;
window.confirm = jest.fn(() => true);

// Create a custom render function with the context provider
const customRender = (ui: React.ReactElement) => {
  return render(
    <WorkspaceContext.Provider value={mockContextValue}>
      {ui}
    </WorkspaceContext.Provider>
  );
};

beforeEach(() => {
  jest.clearAllMocks();
});

describe("Workspace Component", () => {
  it("should render the Workspace component", () => {
    customRender(<Workspace />);

    // You can add assertions here to check if the component renders as expected
    // For example:
    expect(screen.getByText("Current Item: root")).toBeInTheDocument();
  });
});

// TODO: implement test for deleting items

afterAll(() => {
  // Restore the original window.confirm after all tests are done
  window.confirm = originalConfirm;
});
