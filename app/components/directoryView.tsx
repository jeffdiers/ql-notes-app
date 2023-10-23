import React, { useContext } from "react";
import { WorkspaceContext, Item } from "../containers/workspace";
import DirectoryIcon from "./directoryIcon";
import NoteIcon from "./noteIcon";
import Button, { BUTTON_TYPE_CLASSES } from "./button";

import "../styles/directory.css";

import { getFilePath } from "../util/helpers";

interface DirectoryViewProps {
  directory: Item;
}

const DirectoryView: React.FC<DirectoryViewProps> = ({ directory }) => {
  const {
    addNote,
    addDirectory,
    setCurrentItem,
    selectedItems,
    selectItem,
    deleteItem,
    updateChildName,
  } = useContext(WorkspaceContext);

  const isFileNameUnique = (fileName: string) => {
    // Check if an item with the same name already exists
    const existingNote = directory.items?.find(
      (item) => item.name === fileName
    );

    return !existingNote;
  };

  const handleAddNote = () => {
    let fileName: string | null = null;
    let isUnique = false;
    while (!fileName || !isUnique) {
      fileName = window.prompt("Enter the name of the new note:");
      if (fileName === null) return;
      isUnique = isFileNameUnique(fileName);
      if (!isUnique) {
        alert(
          "An item with the same name already exists. Please choose a different name."
        );
      }
    }

    const noteText = window.prompt("Enter the text of the new note:");
    if (noteText === null) return;

    addNote(fileName, noteText);
  };

  const handleAddDirectory = () => {
    let fileName: string | null = null;
    let isUnique = false;
    while (!fileName || !isUnique) {
      fileName = window.prompt("Enter the name of the new directory:");
      if (fileName === null) return;
      isUnique = isFileNameUnique(fileName);
      if (!isUnique) {
        alert(
          "An item with the same name already exists. Please choose a different name."
        );
      }
    }

    addDirectory(fileName);
  };

  const handleItemClick = (item: Item) => {
    setCurrentItem(item);
  };

  const handleSelectItem = (item: Item) => {
    selectItem(item);
  };

  const handleDeleteItem = (item: Item) => {
    if (confirm("Are you sure? This cannot be undone.")) {
      deleteItem(item);
    }
  };

  const handleRenameItem = (item: Item, index: number) => {
    const newName = window.prompt("Enter the new name:");
    if (newName === null) return;
    updateChildName(newName, index);
  };

  return (
    <div className="table-container">
      <div className="button-container">
        <Button onClick={handleAddNote}>New Note</Button>
        <Button onClick={handleAddDirectory}>New Directory</Button>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th className="table-filename">Filename</th>
            <th className="table-select">Select</th>
            <th className="table-rename">Rename</th>
            <th className="table-delete">Delete</th>
          </tr>
        </thead>
        <tbody>
          {directory.items?.map((childItem, index) => (
            <tr key={index}>
              <td
                onClick={() => handleItemClick(childItem)}
                className="table-filename"
              >
                {childItem.type == "directory" && (
                  <DirectoryIcon className="table-filename-icon" />
                )}
                {childItem.type == "note" && (
                  <NoteIcon className="table-filename-icon" />
                )}
                <span className="table-filename-text">{childItem.name}</span>
              </td>
              <td className="table-select">
                <label className="custom-checkbox">
                  <input
                    type="checkbox"
                    checked={selectedItems.includes(
                      getFilePath(childItem).join("/")
                    )}
                    onChange={() => handleSelectItem(childItem)}
                  />
                  <span></span>
                </label>
              </td>
              <td className="table-rename">
                <Button
                  buttonType={BUTTON_TYPE_CLASSES.inverted}
                  onClick={() => handleRenameItem(childItem, index)}
                >
                  Edit
                </Button>
              </td>
              <td className="table-delete">
                <Button
                  buttonType={BUTTON_TYPE_CLASSES.danger}
                  onClick={() => handleDeleteItem(childItem)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DirectoryView;
